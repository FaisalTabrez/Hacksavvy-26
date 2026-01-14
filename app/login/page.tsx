import { loginWithGoogle } from './actions'
import PremiumBackground from '@/components/PremiumBackground'
import { Orbitron, JetBrains_Mono } from 'next/font/google'
import { cn } from '@/utils/cn'

// Font Configurations
const orbitron = Orbitron({ 
  subsets: ["latin"], 
  weight: ['400', '700', '900'], 
  variable: '--font-orbitron'
});

const mono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-mono' 
});

export default function LoginPage() {
    return (
        <PremiumBackground>
            <div className={cn("relative flex h-screen w-full flex-col items-center justify-center overflow-hidden", orbitron.variable, mono.variable)}>
                
                {/* --- HUD: TOP LEFT --- */}
                <div className="absolute top-6 left-6 md:top-12 md:left-12 z-20">
                    <div className={cn(mono.className, "flex flex-col gap-1")}>
                        <span className="text-[10px] text-red-500 uppercase tracking-[0.3em] font-bold">Protocol</span>
                        <span className="text-sm text-white font-medium tracking-widest">MGIT_HACKS</span>
                    </div>
                </div>

                {/* --- HUD: TOP RIGHT --- */}
                <div className="absolute top-6 right-6 md:top-12 md:right-12 z-20 text-right">
                    <div className={cn(mono.className, "flex flex-col gap-1")}>
                        <span className="text-[10px] text-red-500 uppercase tracking-[0.3em] font-bold">System Status</span>
                        <div className="flex items-center justify-end gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-sm text-white font-medium tracking-widest">ONLINE</span>
                        </div>
                    </div>
                </div>

                {/* --- CENTER STAGE --- */}
                {/* Increased gap to 14 to give the massive text room to breathe */}
                <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 gap-14">
                    
                    {/* 1. The Pre-Title */}
                    <div className="flex flex-col items-center gap-2">
                        <p className={cn(mono.className, "text-[10px] md:text-xs text-red-500 font-bold uppercase tracking-[0.4em] animate-pulse")}>
                            [ Secure Connection Established ]
                        </p>
                        <p className={cn(mono.className, "text-xs md:text-sm text-neutral-400 uppercase tracking-[0.6em]")}>
                            Identity Verification Required
                        </p>
                    </div>

                    {/* 2. The MASSIVE Title (SUPERCHARGED) */}
                    <div className="relative group text-center">
                        {/* Stronger Glow effect */}
                        <div className="absolute inset-0 bg-red-600/20 blur-[100px] rounded-full pointer-events-none opacity-50 group-hover:opacity-80 transition-opacity duration-700"></div>
                        
                        {/* 
                           CHANGES:
                           - text-[13vw]: Fills 13% of viewport width on mobile (Huge)
                           - md:text-[11vw]: Scales up on tablets
                           - lg:text-[12rem]: Caps at a massive static size on large screens
                           - tracking-tighter: Pulls letters closer for impact
                           - drop-shadow-2xl: Makes it pop off the background
                        */}
                        <h1 className={cn(orbitron.className, "relative z-10 text-[13vw] md:text-[11vw] lg:text-[12rem] leading-none font-black tracking-tighter text-white drop-shadow-2xl select-none")}>
                            HACKSAVVY
                        </h1>
                    </div>

                    {/* 3. The Date Scroller */}
                    <div className={cn(mono.className, "flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs md:text-sm text-neutral-300 font-medium tracking-widest uppercase")}>
                        <span>Feb 12-13</span>
                        <span className="text-red-600/50">//</span>
                        <span>2026</span>
                        <span className="text-red-600/50">//</span>
                        <span>Hyderabad</span>
                        <span className="text-red-600/50">//</span>
                        <span>Sector 7</span>
                    </div>

                    {/* 4. The Action */}
                    <form action={loginWithGoogle} className="mt-4">
                        <button
                            type="submit"
                            className="group relative flex items-center gap-4 rounded-full border border-white/20 bg-white/5 px-10 py-5 backdrop-blur-md transition-all duration-300 hover:bg-white hover:border-white hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-colors group-hover:bg-black group-hover:text-white">
                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 15.907 0 12.48 0 5.867 0 .533 5.347.533 12S5.867 24 12.48 24c3.44 0 6.04-1.133 7.373-3.36 1.333-2.227 1.253-5.04 1.253-5.04l-8.627-2.68z"/>
                                </svg>
                            </div>
                            
                            <span className={cn(mono.className, "text-sm font-bold uppercase tracking-widest text-white group-hover:text-black")}>
                                Initialize Access
                            </span>
                        </button>
                    </form>
                </div>

                {/* --- HUD: BOTTOM LEFT --- */}
                <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 z-20">
                    <div className="h-px w-24 bg-gradient-to-r from-red-500 to-transparent mb-2"></div>
                    <p className={cn(mono.className, "text-[10px] text-neutral-500 uppercase tracking-widest")}>
                        Coordinates: 17.3850° N, 78.4867° E
                    </p>
                </div>

                {/* --- HUD: BOTTOM RIGHT --- */}
                <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 z-20 text-right">
                    <div className="h-px w-24 bg-gradient-to-l from-red-500 to-transparent mb-2 ml-auto"></div>
                    <p className={cn(mono.className, "text-[10px] text-neutral-500 uppercase tracking-widest")}>
                        Ver: 2.0.2.6 // Stable
                    </p>
                </div>

            </div>
        </PremiumBackground>
    )
}