import { loginWithGoogle } from './actions'
import PremiumBackground from '@/components/PremiumBackground'
import { Orbitron, JetBrains_Mono } from 'next/font/google'
import { cn } from '@/utils/cn'

// Font Configurations
const orbitron = Orbitron({ 
  subsets: ["latin"], 
  weight: ['400', '900'], 
  variable: '--font-orbitron'
});

const mono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-mono' 
});

export default function LoginPage() {
    return (
        <PremiumBackground>
            <div className={cn("flex min-h-screen flex-col items-center justify-center p-4", orbitron.variable, mono.variable)}>
                
                {/* Main Card Container - Expanded to max-w-6xl for cinematic feel */}
                <div className="relative w-full max-w-6xl min-h-[700px] flex flex-col items-center justify-center">
                    
                    {/* Decorative Corner Lines - Pushed further out for breathing room */}
                    <div className="absolute -top-16 -left-16 h-32 w-32 border-l-[3px] border-t-[3px] border-red-600/20 transition-all duration-700 hover:border-red-500 hover:scale-110"></div>
                    <div className="absolute -bottom-16 -right-16 h-32 w-32 border-r-[3px] border-b-[3px] border-red-600/20 transition-all duration-700 hover:border-red-500 hover:scale-110"></div>

                    {/* The Glass Card */}
                    <div className="relative w-full overflow-hidden rounded-[2.5rem] border border-white/5 bg-black/60 shadow-[0_0_100px_-30px_rgba(220,38,38,0.4)] backdrop-blur-3xl flex flex-col items-center">
                        
                        {/* Subtle Grid overlay inside card */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

                        {/* Top Gradient Edge */}
                        <div className="absolute top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>

                        {/* Content Wrapper */}
                        <div className="flex flex-col items-center justify-center py-32 px-6 md:px-12 text-center z-10 w-full">
                            
                            {/* 1. Status Line */}
                            <div className={cn(mono.className, 'text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-red-500/90 mb-6 flex items-center justify-center gap-4')}>
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                </span>
                                System Ready // 2.0.2.6
                            </div>

                            {/* 2. Main Title - MASSIVE Scale & Decluttered */}
                            <h1 className={cn(orbitron.className, 'relative z-20 mb-8 text-7xl md:text-9xl lg:text-[11rem] leading-[0.85] font-black uppercase tracking-tighter text-white drop-shadow-2xl')}>
                                <span className="bg-gradient-to-b from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent">
                                    HACK
                                </span>
                                <br />
                                <span className="bg-gradient-to-b from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent">
                                    SAVVY
                                </span>
                            </h1>
                            
                            {/* 3. Clean Terminal Subtext (Removed Box) */}
                            <div className="max-w-lg mx-auto mt-6 mb-20 space-y-2">
                                <p className={cn(mono.className, 'text-sm md:text-base text-neutral-400 font-medium tracking-wide')}>
                                    [ SECURE CONNECTION ESTABLISHED ]
                                </p>
                                <p className={cn(mono.className, 'text-xs md:text-sm text-neutral-600 tracking-wider')}>
                                    IDENTITY VERIFICATION REQUIRED FOR SECTOR 7 ACCESS
                                </p>
                            </div>

                            {/* 4. Login Action */}
                            <form action={loginWithGoogle}>
                                <button
                                    type="submit"
                                    className="group relative flex items-center justify-center gap-4 overflow-hidden rounded-full border border-white/10 bg-white/5 px-12 py-5 transition-all duration-500 hover:bg-white/10 hover:border-red-500/50 hover:shadow-[0_0_50px_-10px_rgba(220,38,38,0.3)] active:scale-95"
                                >
                                    <svg className="h-6 w-6 text-white/90 transition-transform group-hover:scale-110 group-hover:text-white" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 15.907 0 12.48 0 5.867 0 .533 5.347.533 12S5.867 24 12.48 24c3.44 0 6.04-1.133 7.373-3.36 1.333-2.227 1.253-5.04 1.253-5.04l-8.627-2.68z"/>
                                    </svg>
                                    
                                    <span className={cn(mono.className, "text-sm font-bold uppercase tracking-[0.2em] text-white/90 group-hover:text-white")}>
                                        Initialize Login
                                    </span>
                                </button>
                            </form>
                        </div>
                        
                        {/* Footer Status Bar */}
                        <div className="absolute bottom-0 w-full flex items-center justify-between px-8 py-4 border-t border-white/5 bg-black/40">
                             <p className={cn(mono.className, "text-[10px] text-neutral-600 uppercase tracking-widest")}>
                                Restricted Area
                            </p>
                            <div className="flex gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-red-900/40"></div>
                                <div className="h-1.5 w-1.5 rounded-full bg-red-900/40"></div>
                                <div className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    {/* Exterior Meta Data - Pushed further down */}
                    <div className={cn(mono.className, "absolute -bottom-24 w-full flex justify-between px-4 text-xs font-bold uppercase tracking-[0.3em] text-neutral-600/50 mix-blend-difference")}>
                        <span>MGIT // HYD</span>
                        <span>FEB 12-13 // 2026</span>
                    </div>

                </div>
            </div>
        </PremiumBackground>
    )
}