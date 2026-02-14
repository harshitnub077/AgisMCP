import { createClient } from '@/lib/supabase/server'
import { MemoryGraph } from '@/components/dashboard/memory-graph'
import { redirect } from 'next/navigation'
import { Database } from '@/types/database.types'

export default async function GraphPage() {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: servers } = (await supabase
        .from('mcp_servers')
        .select('*')) as { data: Database['public']['Tables']['mcp_servers']['Row'][] | null }

    return (
        <div className="space-y-4 h-full flex flex-col">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Contextual Memory Graph</h2>
                <p className="text-gray-400 mt-1">
                    Visualizing the neural connections of your agentic fleet.
                </p>
            </div>
            <div className="flex-1">
                <MemoryGraph servers={servers || []} />
            </div>
        </div>
    )
}
