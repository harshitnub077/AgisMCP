import AuthForm from '@/components/auth-form'

export default function LoginPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight">AegisMCP</h1>
                    <p className="mt-2 text-sm text-gray-400">
                        The Centralized Agentic Infrastructure Hub
                    </p>
                </div>
                <div className="bg-gray-900/50 p-8 rounded-lg border border-gray-800 shadow-xl">
                    <AuthForm />
                </div>
            </div>
        </div>
    )
}
