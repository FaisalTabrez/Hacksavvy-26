'use client'

import Link from 'next/link'

export default function EmptyState({ user }: { user: any }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
            <div className="relative group overflow-hidden rounded-3xl bg-black/40 p-10 shadow-2xl backdrop-blur-md border border-white/5 max-w-lg w-full text-center transition-all duration-500 hover:border-red-500/20 hover:shadow-[0_0_40px_rgba(220,38,38,0.15)]">
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-red-600 to-transparent shadow-[0_0_10px_#dc2626]"></div>

                <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
                    Welcome, <br />
                    <span className="bg-gradient-to-r from-red-500 via-red-300 to-red-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(220,38,38,0.3)]">
                        {user.user_metadata?.full_name || 'Hacker'}
                    </span>!
                </h2>
                
                <p className="text-gray-400 mb-10 leading-relaxed font-light text-lg">
                    You are currently floating in the void. Register your team to materialize into <span className="text-red-400 font-medium">HackSavvy-26</span>.
                </p>
                
                <Link
                    href="/register"
                    className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-white/5 py-5 text-lg font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 border border-white/10 hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-900/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="relative z-10 tracking-widest uppercase text-sm">Create a Team</span>
                </Link>
            </div>
        </div>
    )
}
