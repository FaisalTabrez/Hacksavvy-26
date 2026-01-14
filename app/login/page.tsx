import { loginWithGoogle } from './actions'
import PremiumBackground from '@/components/PremiumBackground'

export default function LoginPage() {
    return (
        <PremiumBackground>
            <div className="flex min-h-screen flex-col items-center justify-center p-4">
                {/* Main Interactive Container */}
                <div className="relative w-full max-w-xl">
                    
                    {/* Decorative Elements - Cyber Lines */}
                    <div className="absolute -top-12 -left-12 h-24 w-24 border-l-2 border-t-2 border-red-600/30 opacity-50 transition-all duration-700 hover:border-red-500 hover:opacity-100"></div>
                    <div className="absolute -bottom-12 -right-12 h-24 w-24 border-r-2 border-b-2 border-red-600/30 opacity-50 transition-all duration-700 hover:border-red-500 hover:opacity-100"></div>

                    {/* Glass Card */}
                    <div className="relative overflow-hidden rounded-2xl border border-red-500/50 bg-black/60 shadow-[0_0_100px_rgba(220,38,38,0.4)] backdrop-blur-xl">
                        
                        {/* Top Gradient Bar */}
                        <div className="absolute top-0 h-1 w-full bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-80"></div>

                        <div className="p-10 pt-12 text-center">
                            {/* Brand Header */}
                            <div className="mb-2 inline-flex items-center justify-center rounded-full bg-red-500/10 px-4 py-1.5 backdrop-blur-sm">
                                <span className="mr-4 relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                </span>
                                <span className="text-xs font-bold uppercase tracking-widest text-red-400">System Ready</span>
                            </div>

                            <h1 className="mb-2 mt-6 text-5xl font-black tracking-tighter text-white sm:text-6xl">
                                HACK<span className="text-red-600">SAVVY</span>
                            </h1>
                            <p className="mb-10 text-lg font-bold text-gray-400">
                                Initialize Sequence <span className="font-mono text-red-500">2.0.2.6</span>
                            </p>

                            {/* Login Action */}
                            <form action={loginWithGoogle}>
                                <button
                                    type="submit"
                                    className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-white text-black px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] hover:bg-gray-100 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
                                >
                                    <svg className="h-5 w-5" viewBox="0 0 24 24">
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
                                    <span>Continue with Google</span>
                                    
                                    {/* Shine effect */}
                                    <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
                                </button>
                            </form>

                            {/* Terms */}
                            <p className="mt-8 text-xs text-gray-600">
                                By accessing the system, you agree to our{' '}
                                <a href="#" className="text-gray-400 hover:text-red-500 hover:underline">protocols</a>.
                            </p>
                        </div>
                        
                        {/* Card Footer Decoration */}
                        <div className="flex h-2 w-full">
                            <div className="h-full w-1/3 bg-red-600/20"></div>
                            <div className="h-full w-1/3 bg-red-600/40"></div>
                            <div className="h-full w-1/3 bg-red-600/60"></div>
                        </div>
                    </div>

                    {/* Bottom Info */}
                    <div className="mt-12 flex justify-between px-2 text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
                        <span>MGIT, HYD</span>
                        <span>FEB 12-13</span>
                    </div>

                </div>
            </div>
        </PremiumBackground>
    )
}
