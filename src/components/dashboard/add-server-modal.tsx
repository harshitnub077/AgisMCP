'use client'

import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Plus, X } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import { addServer } from '@/app/actions/servers'

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <button
            type="submit"
            disabled={pending}
            className="inline-flex h-9 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transition-colors"
        >
            {pending ? 'Adding...' : 'Add Server'}
        </button>
    )
}

export function AddServerModal() {
    const [open, setOpen] = useState(false)
    const [state, setState] = useState<{ message?: string; errors?: Record<string, string[]> } | null>(null)

    const handleSubmit = async (formData: FormData) => {
        const result = await addServer(null, formData)
        if (result.message === 'Success') {
            setOpen(false)
            setState(null)
        } else {
            setState(result)
        }
    }

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <button className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-200 transition-colors">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Server
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 backdrop-blur-sm" />
                <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-gray-800 bg-gray-950 p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg text-white">
                    <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                        <Dialog.Title className="text-lg font-semibold leading-none tracking-tight">
                            Register New MCP Server
                        </Dialog.Title>
                        <Dialog.Description className="text-sm text-gray-400">
                            Enter the endpoint URL of your remote MCP server.
                        </Dialog.Description>
                    </div>
                    <form action={handleSubmit} className="grid gap-4 py-4">
                        {state?.message && state.message !== 'Success' && (
                            <div className="text-red-500 text-sm bg-red-900/20 p-2 rounded border border-red-900">
                                {state.message}
                            </div>
                        )}
                        <div className="grid gap-2">
                            <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                className="flex h-10 w-full rounded-md border border-gray-800 bg-gray-900 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Production DB Agent"
                            />
                            {state?.errors?.name && <span className="text-red-500 text-xs">{state.errors.name}</span>}
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="url" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Endpoint URL
                            </label>
                            <input
                                id="url"
                                name="url"
                                className="flex h-10 w-full rounded-md border border-gray-800 bg-gray-900 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="https://api.example.com/mcp"
                            />
                            {state?.errors?.url && <span className="text-red-500 text-xs">{state.errors.url}</span>}
                        </div>
                        <div className="flex justify-end gap-3 mt-4">
                            <Dialog.Close asChild>
                                <button type="button" className="rounded-md px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">
                                    Cancel
                                </button>
                            </Dialog.Close>
                            <SubmitButton />
                        </div>
                    </form>
                    <Dialog.Close asChild>
                        <button
                            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                        >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
