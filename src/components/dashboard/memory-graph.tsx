'use client'

import ReactFlow, {
    Node,
    Edge,
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    MarkerType,
} from 'reactflow'
import 'reactflow/dist/style.css'

// Custom Node to display Server info
function ServerNode({ data }: { data: { label: string; status: string; url: string } }) {
    const isOnline = data.status === 'active'
    return (
        <div className={`px-4 py-2 shadow-md rounded-md bg-gray-900 border-2 ${isOnline ? 'border-green-500' : 'border-gray-700'}`}>
            <div className="flex items-center">
                <div className={`rounded-full w-2 h-2 mr-2 ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
                <div className="font-bold text-white text-sm">{data.label}</div>
            </div>
            <div className="text-gray-400 text-xs mt-1 max-w-[150px] truncate">{data.url}</div>
        </div>
    )
}

const nodeTypes = {
    mcpServer: ServerNode,
}

interface MemoryGraphProps {
    servers: {
        id: string
        name: string
        endpoint_url: string
        status: string
    }[]
}

export function MemoryGraph({ servers }: MemoryGraphProps) {
    // Center Hub Node
    const initialNodes: Node[] = [
        {
            id: 'hub',
            type: 'input',
            data: { label: 'Aegis Hub' },
            position: { x: 0, y: 0 },
            style: { background: '#2563eb', color: 'white', border: 'none', width: 100, borderRadius: '50%', height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' },
        },
        ...servers.map((server, index) => {
            // Simple radial layout
            const angle = (index / servers.length) * 2 * Math.PI
            const radius = 250
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius
            return {
                id: server.id,
                type: 'mcpServer',
                data: { label: server.name, status: server.status, url: server.endpoint_url },
                position: { x, y },
            }
        }),
    ]

    const initialEdges: Edge[] = servers.map((server) => ({
        id: `e-hub-${server.id}`,
        source: 'hub',
        target: server.id,
        animated: server.status === 'active',
        style: { stroke: server.status === 'active' ? '#22c55e' : '#64748b' },
        markerEnd: {
            type: MarkerType.ArrowClosed,
            color: server.status === 'active' ? '#22c55e' : '#64748b',
        },
    }))

    const [nodes, , onNodesChange] = useNodesState(initialNodes)
    const [edges, , onEdgesChange] = useEdgesState(initialEdges)

    return (
        <div style={{ height: 'calc(100vh - 150px)' }} className="rounded-lg border border-gray-800 bg-gray-950/50">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                fitView
            >
                <Background color="#333" gap={16} />
                <Controls />
                <MiniMap nodeColor={() => '#2563eb'} maskColor="rgba(0, 0, 0, 0.7)" className="bg-gray-900 border-gray-800" />
            </ReactFlow>
        </div>
    )
}
