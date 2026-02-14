'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'

export default function SettingsPage() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        async function getUser() {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
            setLoading(false)
        }
        getUser()
    }, [])

    if (loading) {
        return <div className="p-8 text-gray-400">Loading profile...</div>
    }

    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h2 className="text-3xl font-bold tracking-tight mb-4">Settings</h2>
                <p className="text-gray-400">Manage your account and application preferences.</p>
            </div>

            {/* Profile Section */}
            <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Profile Information</h3>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-400">Email</label>
                            <div className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-gray-200">
                                {user?.email}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400">User ID</label>
                            <div className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-gray-500 font-mono text-xs truncate">
                                {user?.id}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Application Info */}
            <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Application Info</h3>
                <div className="space-y-2 text-sm text-gray-400">
                    <p><strong>Version:</strong> 0.1.0 (Alpha)</p>
                    <p><strong>Environment:</strong> {process.env.NODE_ENV}</p>
                    <p><strong>Supabase Project:</strong> Connected</p>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="rounded-xl border border-red-900/30 bg-red-900/10 p-6">
                <h3 className="text-xl font-semibold text-red-500 mb-4">Danger Zone</h3>
                <p className="text-gray-400 text-sm mb-4">
                    Deleting your account will remove all registered servers and logs. This action cannot be undone.
                </p>
                <button
                    disabled
                    className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Feature coming soon"
                >
                    Delete Account
                </button>
            </div>
        </div>
    )
}
