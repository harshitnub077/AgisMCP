'use server'

import { type PostgrestError } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const ServerSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    url: z.string().url('Invalid URL'),
})

export async function addServer(prevState: unknown, formData: FormData) {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return { message: 'Unauthorized' }
    }

    const validatedFields = ServerSchema.safeParse({
        name: formData.get('name'),
        url: formData.get('url'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Validation Error',
        }
    }

    const { name, url } = validatedFields.data

    // Ping Check
    let status = 'offline'
    try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)

        // Attempt a JSON-RPC ping or simple HEAD request
        // Typically MCP over HTTP uses POST for JSON-RPC messages
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ jsonrpc: '2.0', method: 'ping', id: 1 }),
            signal: controller.signal
        })
        clearTimeout(timeoutId)

        if (response.ok) {
            status = 'active'
        }
    } catch (error) {
        console.error('Ping failed:', error)
        status = 'error'
    }


    const { error } = (await supabase.from('mcp_servers').insert({
        user_id: user.id,
        name,
        endpoint_url: url,
        status,
        protocol_type: 'http', // Default for now
        last_ping_at: new Date().toISOString(),
    })) as { error: PostgrestError | null }

    if (error) {
        return { message: 'Database Error: ' + error.message }
    }

    revalidatePath('/dashboard')
    return { message: 'Success' }
}

export async function deleteServer(id: string) {
    const supabase = await createClient()
    const { error } = (await supabase.from('mcp_servers').delete().eq('id', id)) as { error: PostgrestError | null }

    if (error) {
        throw new Error(error.message)
    }
    revalidatePath('/dashboard')
}
