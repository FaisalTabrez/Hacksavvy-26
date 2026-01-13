export default function AuthErrorPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
            <div className="w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-lg text-center">
                <h2 className="mb-4 text-2xl font-bold text-red-500">Authentication Error</h2>
                <p className="mb-6 text-gray-300">
                    There was an error signing you in. Please try again.
                </p>
                <a
                    href="/login"
                    className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
                >
                    Back to Login
                </a>
            </div>
        </div>
    )
}
