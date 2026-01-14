import { loginWithGoogle } from './actions'
import PremiumBackground from '@/components/PremiumBackground'
import { Orbitron, JetBrains_Mono } from 'next/font/google'
import { cn } from '@/utils/cn'

// Font Configurations
const orbitron = Orbitron({ 
  subsets: ["latin"], 
  weight: ['500', '900'], 
  variable: '--font-orbitron'
});

const mono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-mono' 
});

export default function LoginPage() {
    return (
        <PremiumBackground>
            <div className={cn("flex min-h-screen items-center justify-center p-4 md:p-8", orbitron.variable, mono.variable)}>
                
                {/* Main Card Container - Restrained Width, Tall Aspect Ratio */}
                <div className="relative w-full max-w-[480px]">
                    
                    {/* The Glass Card */}
                    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#050505]/90 shadow-2xl backdrop-blur-xl">
                        
                        {/* Top Accent Line (Red) */}
                        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-80"></div>

                        <div className="flex flex-col items-center px-8 py-16 text-center">
                            
                            {/* 1. Status Pill (High Contrast) */}
                            <div className={cn(mono.className, 'mb-12 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-bold tracking-widest text-neutral-300')}>
                                <span className="relative flex h-1.5 w-1.5">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                                </span>
                                SYSTEM ONLINE // 2.0.2.6
                            </div>

                            {/* 2. Main Title - "The Hero" (Stacked & Tight) */}
                            <div className="relative mb-12 flex flex-col items-center leading-[0.8]">
                                <h1 className={cn(orbitron.className, 'text-7xl font-black tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]')}>
                                    HACK
                                </h1>
                                <h1 className={cn(orbitron.className, 'text-7xl font-black tracking-tighter text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]')}>
                                    SAVVY
                                </h1>
                                
                                {/* Background Glow behind text */}
                                <div className="absolute top-1/2 left-1/2 -z-10 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/20 blur-[50px]"></div>
                            </div>
                            
                            {/* 3. Subtext (Minimal) */}
                            <div className="mb-12 max-w-[260px] space-y-2 text-center">
                                <p className={cn(mono.className, 'text-xs font-medium text-neutral-400')}>
                                    [ SECURE GATEWAY DETECTED ]
                                </p>
                                <p className={cn(mono.className, 'text-[10px] text-neutral-600')}>
                                    Authorized personnel only. Identify via protocol below.
                                </p>
                            </div>

                            {/* 4. Login Action (Full Width Button) */}
                            <form action={loginWithGoogle} className="w-full">
                                <button
                                    type="submit"
                                    className="group relative w-full overflow-hidden rounded-lg bg-white py-4 transition-all hover:bg-neutral-200 active:scale-[0.98]"
                                >
                                    <div className="relative z-10 flex items-center justify-center gap-3">
                                        {/* Simple Black Google G */}
                                        <svg className="h-5 w-5 text-black" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 15.907 0 12.48 0 5.867 0 .533 5.347.533 12S5.867 24 12.48 24c3.44 0 6.04-1.133 7.373-3.36 1.333-2.227 1.253-5.04 1.253-5.04l-8.627-2.68z"/>
                                        </svg>
                                        <span className={cn(mono.className, "text-sm font-bold tracking-wider text-black")}>
                                            ACCESS WITH GOOGLE
                                        </span>
                                    </div>
                                    
                                    {/* Button Hover Glow Effect */}
                                    <div className="absolute inset-0 -z-10 translate-y-full bg-gradient-to-t from-neutral-200 to-transparent opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"></div>
                                </button>
                            </form>
                        </div>
                        
                        {/* Footer Bar */}
                        <div className="flex w-full justify-between border-t border-white/5 bg-black/40 px-6 py-3">
                            <span className={cn(mono.className, "text-[9px] uppercase tracking-widest text-neutral-600")}>
                                ID: MGIT-2026
                            </span>
                            <span className={cn(mono.className, "text-[9px] uppercase tracking-widest text-neutral-600")}>
                                SECTOR 7
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </PremiumBackground>
    )
}