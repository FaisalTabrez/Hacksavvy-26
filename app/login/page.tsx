import { loginWithGoogle } from './actions'
import PremiumBackground from '@/components/PremiumBackground'

export default function LoginPage() {
    return (
        <PremiumBackground>
            <div className="flex min-h-screen flex-col items-center justify-center p-4">
                {/* Main Interactive Container - WIDER CARD (approx 16:9 aspect equivalent layout) */}
                <div className="relative w-full max-w-5xl aspect-[16/9] flex flex-col items-center justify-center">
                    
                    {/* Decorative Elements - Cyber Lines */}
                    <div className="absolute -top-16 -left-16 h-32 w-32 border-l-4 border-t-4 border-red-600/30 opacity-50 transition-all duration-700 hover:border-red-500 hover:opacity-100"></div>
                    <div className="absolute -bottom-16 -right-16 h-32 w-32 border-r-4 border-b-4 border-red-600/30 opacity-50 transition-all duration-700 hover:border-red-500 hover:opacity-100"></div>

                    {/* Glass Card */}
                    <div className="relative h-full w-full overflow-hidden rounded-3xl border border-red-500/50 bg-black/60 shadow-[0_0_120px_rgba(220,38,38,0.5)] backdrop-blur-xl flex flex-col">
                        
                        {/* Top Gradient Bar */}
                        <div className="absolute top-0 h-2 w-full bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-80"></div>

                        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center relative z-10">
                            {/* Brand Header */}
                            <div className="mb-8 inline-flex items-center justify-center space-x-4">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                </span>
                                <span className="text-sm font-bold uppercase tracking-[0.3em] text-red-500 font-[family-name:var(--font-orbitron)]">
                                    System Ready // 2.0.2.6
                                </span>
                            </div>

                            {/* Main Title */}
                            <h1 className="mb-2 text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white font-[family-name:var(--font-orbitron)]">
                                HACK<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">SAVVY</span>
                            </h1>
                            
                            {/* Subtitle */}
                            <p className="mb-12 text-lg md:text-xl font-medium tracking-wide text-gray-400 font-[family-name:var(--font-orbitron)] uppercase">
                                Initiate Login Sequence
                            </p>

                            {/* Login Action */}
                            <form action={loginWithGoogle}>
                                <button
                                    type="submit"
                                    className="group relative flex items-center justify-center gap-4 overflow-hidden rounded-none border border-red-500 bg-red-500/10 px-10 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-red-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-500/30"
                                >
                                    <div className="absolute inset-0 w-1 bg-white/20 transition-all duration-300 group-hover:w-full"></div>
                                    <svg className="relative z-10 h-5 w-5" viewBox="0 0 24 24">
                                        <path
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            fill="#4285F4"
                                            className="group-hover:fill-white"
                                        />
                                        <path
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            fill="#34A853"
                                            className="group-hover:fill-white"
                                        />
                                        <path
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                            fill="#FBBC05"
                                            className="group-hover:fill-white"
                                        />
                                        <path
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            fill="#EA4335"
                                            className="group-hover:fill-white"
                                        />
                                    </svg>
                                    <span className="relative z-10 font-[family-name:var(--font-orbitron)]">Continue with Google</span>
                                </button>
                            </form>

                            {/* Terms */}
                            <p className="mt-8 text-xs text-gray-500 font-medium tracking-wide">
                                ESTABLISHED CONNECTION REQUIRED. <br /> SEE <a href="#" className="text-gray-400 hover:text-red-500 underline decoration-red-500/50 underline-offset-4 transition-colors">PROTOCOLS</a>.
                            </p>
                        </div>
                        
                        {/* Card Footer Decoration */}
                        <div className="flex h-3 w-full">
                            <div className="h-full w-1/3 bg-red-600/30"></div>
                            <div className="h-full w-1/3 bg-red-600/50"></div>
                            <div className="h-full w-1/3 bg-red-600/80"></div>
                        </div>
                    </div>

                    {/* Bottom Info */}
                    <div className="absolute -bottom-16 w-full flex justify-between px-4 text-sm font-bold uppercase tracking-[0.3em] text-red-500/60 mix-blend-plus-lighter">
                        <span>MGIT, HYD</span>
                        <span>FEB 12-13</span>
                    </div>

                </div>
            </div>
        </PremiumBackground>
    )
}

