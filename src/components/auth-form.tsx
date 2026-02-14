'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from '@/lib/supabase/client'

export default function AuthForm() {
    const supabase = createClient()

    const isConfigured =
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith('http') &&
        process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your-project-url'

    // Debugging: Force render the form to see if it works
    // if (!isConfigured) { ... }

    return (
        <Auth
            supabaseClient={supabase}
            view="magic_link"
            appearance={{ theme: ThemeSupa }}
            theme="dark"
            showLinks={false}
            providers={['github']}
            redirectTo={typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : undefined}
        />
    )
}
