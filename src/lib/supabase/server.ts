import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/types/database.types'

export const createClient = async () => {
    const cookieStore = await cookies()

    let url = process.env.NEXT_PUBLIC_SUPABASE_URL
    let key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Fallback for missing env vars
    if (!url || !url.startsWith('http')) {
        url = 'https://placeholder.supabase.co'
        key = 'placeholder-key'
    }

    return createServerClient<Database>(
        url,
        key || '',
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    )
}
