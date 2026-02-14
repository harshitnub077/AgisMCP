import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/database.types'

export const createClient = () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Fallback for build time to prevent crashes if env vars are missing
    if (!url || !key) {
        return createBrowserClient<Database>(
            'https://placeholder.supabase.co',
            'placeholder-key'
        )
    }

    return createBrowserClient<Database>(
        url,
        key
    )
}
