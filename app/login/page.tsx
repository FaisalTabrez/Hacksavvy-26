'use client'

import { loginWithGoogle } from './actions'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

export default function LoginPage() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-neutral-950 flex items-center justify-center p-4">
            {/* Ambient Background Elements */}
            <div className="absolute inset-0 z-0">
                {/* Subtle Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                {/* Radial Gradient overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>
            </div>

            {/* Antigravity Floating Card Container */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                    opacity: 1,
                    y: [-10, 10],
                }}
                transition={{
                    opacity: { duration: 1 },
                    y: {
                        duration: 6,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }
                }}
                className="relative z-10 w-full max-w-xl"
            >
                {/* Red Neon Backlight Glow */}
                <div className="absolute -inset-6 z-[-1] rounded-[3rem] bg-red-600/40 blur-[130px]"></div>

                {/* The Glassmorphism Card */}
                <div className="relative overflow-hidden rounded-[2.5rem] border border-red-600/30 bg-black/40 backdrop-blur-2xl px-12 py-16 shadow-2xl">

                    {/* Top Accent Line */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>

                    {/* Logo/Header Section */}
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className="inline-block mb-6"
                        >
                            <div className="flex items-center justify-center space-x-3">
                                <span className="h-4 w-4 rounded-full bg-red-600 animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.8)]"></span>
                                <span className="text-sm font-black tracking-[0.4em] text-red-500 uppercase">Antigravity Proto</span>
                            </div>
                        </motion.div>

                        <h1 className="text-6xl font-black tracking-tighter text-white mb-4">
                            HACK<span className="text-red-600">SAVVY</span>
                        </h1>
                        <p className="text-neutral-300 font-bold tracking-tight text-lg">
                            Accessing Secure Environment
                        </p>
                    </div>

                    {/* OAuth Form */}
                    <form action={loginWithGoogle} className="space-y-6">
                        <button
                            type="submit"
                            className="group relative flex w-full items-center justify-center gap-4 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 px-8 py-5 text-base font-black uppercase tracking-widest text-white transition-all duration-300 hover:border-red-600/50 hover:bg-red-600/10 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]"
                        >
                            {/* SVG Icon */}
                            <svg className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            <span>Sign in with Google</span>

                            {/* Inner Glow on Hover */}
                            <div className="absolute inset-0 z-[-1] bg-gradient-to-r from-red-600/0 via-red-600/5 to-red-600/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                        </button>
                    </form>

                    {/* Footer decoration */}
                    <div className="mt-12 pt-10 border-t border-neutral-800/50">
                        <div className="flex justify-between items-center text-[11px] uppercase tracking-[0.3em] text-neutral-500 font-black">
                            <span>System Status: Optimal</span>
                            <span className="text-red-900">Encrypted</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Reflection/Shadow Effect (Optional but cool) */}
                <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-64 h-6 bg-red-600/20 blur-2xl rounded-full scale-x-150"></div>
            </motion.div>
        </div>
    )
}

