import { createClient } from '@/lib/supabase/server'
import { Database } from '@/types/database.types'
import { ServerCard } from '@/components/dashboard/server-card'
import { AddServerModal } from '@/components/dashboard/add-server-modal'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: servers } = (await supabase
        .from('mcp_servers')
        .select('*')
        .order('created_at', { ascending: false })) as { data: Database['public']['Tables']['mcp_servers']['Row'][] | null }

    const totalServers = servers?.length || 0
    const activeServers = servers?.filter(s => s.status === 'active').length || 0
    const errorServers = servers?.filter(s => s.status === 'error').length || 0

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">Fleet Command</h2>
                    <p className="text-gray-400 mt-1">
                        Manage your remote Model Context Protocol servers.
                    </p>
                </div>
                <AddServerModal />
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
                    <div className="text-sm font-medium text-gray-400">Total Servers</div>
                    <div className="mt-2 text-3xl font-bold text-white">{totalServers}</div>
                </div>
                <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
                    <div className="text-sm font-medium text-green-400">Active Nodes</div>
                    <div className="mt-2 text-3xl font-bold text-white">{activeServers}</div>
                </div>
                <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
                    <div className="text-sm font-medium text-red-400">Critical Errors</div>
                    <div className="mt-2 text-3xl font-bold text-white">{errorServers}</div>
                </div>
            </div>

            {!servers || servers.length === 0 ? (
                <div className="flex h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-800 bg-gray-950/50 text-center">
                    <div className="rounded-full bg-gray-900 p-4 mb-4">
                        <svg className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </div>
                    <h3 className="mt-2 text-xl font-semibold text-white">No Servers Connected</h3>
                    <p className="mb-6 mt-2 text-sm text-gray-500 max-w-sm">
                        Connect your first remote MCP agent to start orchestrating workflows.
                    </p>
                    <AddServerModal />
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {servers.map((server) => (
                        <ServerCard key={server.id} server={server} />
                    ))}
                </div>
            )}
        </div>
    )
}
