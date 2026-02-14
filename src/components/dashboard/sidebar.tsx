'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Network, Settings, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const navItems = [
    { name: 'Fleet Command', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Memory Graph', href: '/dashboard/graph', icon: Network },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export function Sidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const supabase = createClient()

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push('/login')
    }

    return (
        <div className="flex h-screen w-64 flex-col border-r border-gray-800 bg-black text-white">
            <div className="flex h-16 items-center justify-center border-b border-gray-800">
                <h1 className="text-xl font-bold tracking-wider">AEGIS<span className="text-blue-500">MCP</span></h1>
            </div>
            <nav className="flex-1 space-y-1 p-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={twMerge(
                                clsx(
                                    'flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                    isActive
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                )
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            <span>{item.name}</span>
                        </Link>
                    )
                })}
            </nav>
            <div className="border-t border-gray-800 p-4">
                <button
                    onClick={handleSignOut}
                    className="flex w-full items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium text-gray-400 hover:bg-red-900/20 hover:text-red-500 transition-colors"
                >
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                </button>
            </div>
        </div>
    )
}
