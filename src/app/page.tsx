import Link from 'next/link'
import { ArrowRight, ShieldCheck, Network, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-800 px-6 py-4">
        <div className="text-xl font-bold tracking-wider">AEGIS<span className="text-blue-500">MCP</span></div>
        <nav className="flex gap-4">
          <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Login
          </Link>
          <Link href="https://github.com" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            GitHub
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-1 flex-col items-center justify-center text-center px-4 py-20">
        <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400 mb-8">
          The Future of Agentic Infrastructure
        </div>
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl max-w-4xl bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
          Centralized Command for your AI Agents
        </h1>
        <p className="mt-6 text-lg text-gray-400 max-w-2xl">
          Securely manage, monitor, and visualize your Model Context Protocol servers in one unified dashboard. Stop wrestling with local configurations and start orchestrating intelligence.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="group flex items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-500 hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 hover:ring-offset-black"
          >
            Launch Console
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="https://modelcontextprotocol.io"
            target="_blank"
            className="flex items-center justify-center gap-2 rounded-full border border-gray-700 bg-gray-900 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-gray-800"
          >
            Read Docs
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-3 max-w-5xl">
          <div className="flex flex-col items-center p-6 border border-gray-800 rounded-2xl bg-gray-900/20">
            <div className="p-3 bg-blue-500/10 rounded-xl mb-4 text-blue-400">
              <Network className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Contextual Memory</h3>
            <p className="text-sm text-gray-400">Visualize the neural connections of your agentic fleet with interactive graph views.</p>
          </div>
          <div className="flex flex-col items-center p-6 border border-gray-800 rounded-2xl bg-gray-900/20">
            <div className="p-3 bg-green-500/10 rounded-xl mb-4 text-green-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Secure Gateway</h3>
            <p className="text-sm text-gray-400">Production-grade authentication and secure server registration for your enterprise agents.</p>
          </div>
          <div className="flex flex-col items-center p-6 border border-gray-800 rounded-2xl bg-gray-900/20">
            <div className="p-3 bg-purple-500/10 rounded-xl mb-4 text-purple-400">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Automated Verification</h3>
            <p className="text-sm text-gray-400">Built-in browser subagents validate your infrastructure health autonomously.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 text-center text-sm text-gray-500">
        <p>© 2026 AegisMCP Project. Built for &quot;The Build&quot; Hackathon.</p>
      </footer>
    </div>
  )
}
