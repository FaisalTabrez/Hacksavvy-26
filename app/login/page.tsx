import { loginWithGoogle } from './actions'
import PremiumBackground from '@/components/PremiumBackground'

export default function LoginPage() {
    return (
        <PremiumBackground>
            <div className="flex min-h-screen items-center justify-center px-6">
                <div className="relative z-10 w-full max-w-md">
                    {/* Logo/Branding */}
                    <div className="mb-10 text-center">
                        <h1 className="mb-2 bg-gradient-to-r from-red-500 via-red-200 to-red-500 bg-clip-text text-6xl font-black text-transparent tracking-tighter drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                            HACKSAVVY
                        </h1>
                        <div className="mx-auto h-1 w-32 bg-gradient-to-r from-transparent via-red-600 to-transparent shadow-[0_0_10px_#dc2626]"></div>
                    </div>

                    {/* Main card */}
                    <div className="group relative overflow-hidden rounded-3xl bg-black/40 p-8 shadow-2xl backdrop-blur-md border border-red-500/10 transition-all duration-500 hover:border-red-500/30 hover:bg-black/50 hover:shadow-[0_0_30px_rgba(220,38,38,0.1)]">
                        {/* Card border glow effect */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-600/5 via-transparent to-red-600/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                        
                        <div className="relative z-10">
                            <h2 className="mb-2 text-center text-3xl font-bold text-white tracking-wide">
                                Welcome Back
                            </h2>
                            <p className="mb-10 text-center text-gray-400 font-light">
                                Sign in to enter the <span className="text-red-500 font-medium">Void</span>
                            </p>

                            <form action={loginWithGoogle}>
                                <button
                                    type="submit"
                                    className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-white/5 px-6 py-4 text-base font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black border border-white/10"
                                >
                                    {/* Button gradient overlay on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-900/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                                    <svg className="relative z-10 h-6 w-6 opacity-90" viewBox="0 0 24 24">
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
                                    <span className="relative z-10 tracking-wide">Sign in with Google</span>
                                </button>
                            </form>

                            {/* Additional info */}
                            <div className="mt-8 text-center border-t border-white/5 pt-6">
                                <p className="text-xs uppercase tracking-widest text-gray-500">
                                    Participate in
                                </p>
                                <p className="mt-2 text-lg font-bold text-red-500 drop-shadow-[0_0_8px_rgba(220,38,38,0.6)]">
                                    HackSavvy-26
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer text */}
                    <p className="mt-8 text-center text-xs font-medium uppercase tracking-widest text-gray-700">
                        February 12-13, 2026 • MGIT, Hyderabad
                    </p>
                </div>
            </div>
        </PremiumBackground>
    )
}
