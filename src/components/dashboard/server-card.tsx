'use client'

import { useTransition } from 'react'
import { Trash2 } from 'lucide-react'
import { deleteServer } from '@/app/actions/servers'

interface Server {
    id: string
    name: string
    endpoint_url: string
    status: string
    last_ping_at: string | null
}

export function ServerCard({ server }: { server: Server }) {
    const [isPending, startTransition] = useTransition()

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this server?')) {
            startTransition(async () => {
                await deleteServer(server.id)
            })
        }
    }

    let statusColor = "border-gray-800"
    let statusBg = "bg-gray-900/50"
    let statusTextColor = "text-gray-400"

    if (server.status === 'active') {
        statusColor = "border-green-500/20"
        statusBg = "bg-green-500/5"
        statusTextColor = "text-green-400"
    } else if (server.status === 'offline' || server.status === 'error') {
        statusColor = "border-red-500/20"
        statusBg = "bg-red-500/5"
        statusTextColor = "text-red-400"
    }

    return (
        <div className={`group relative flex flex-col justify-between rounded-xl border ${statusColor} ${statusBg} p-6 shadow-sm transition-all hover:bg-gray-900 hover:shadow-md`}>
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${server.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
                        <h3 className="font-semibold tracking-tight text-white">{server.name}</h3>
                    </div>
                    <p className="text-xs font-mono text-gray-500 break-all">{server.endpoint_url}</p>
                </div>
                <button
                    onClick={handleDelete}
                    disabled={isPending}
                    className="opacity-0 group-hover:opacity-100 rounded-md p-2 text-gray-500 hover:bg-red-500/10 hover:text-red-500 disabled:opacity-50 transition-all"
                    title="Delete Server"
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-gray-800/50 pt-4 text-xs">
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 font-medium ${statusTextColor} ${statusBg} border ${statusColor}`}>
                    {server.status.toUpperCase()}
                </span>
                <span className="text-gray-600">
                    Checked: {server.last_ping_at ? new Date(server.last_ping_at).toLocaleTimeString() : 'Never'}
                </span>
            </div>
        </div>
    )
}
