'use client'

import { useEffect, useState } from 'react'

export default function DebugPage() {
    const [envStatus, setEnvStatus] = useState<any>({})

    useEffect(() => {
        setEnvStatus({
            NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Sets' : '❌ Missing',
            NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Sets (Hidden)' : '❌ Missing',
            NODE_ENV: process.env.NODE_ENV
        })
    }, [])

    return (
        <div className="p-8 bg-black text-white min-h-screen font-mono">
            <h1 className="text-2xl font-bold mb-4">Environment Debugger</h1>
            <pre className="p-4 bg-gray-900 rounded border border-gray-700">
                {JSON.stringify(envStatus, null, 2)}
            </pre>
            <p className="mt-4 text-gray-400">
                If you see "❌ Missing", you need to add these variables to Vercel Settings and <strong>Redeploy</strong>.
            </p>
        </div>
    )
}
