import { loginWithGoogle } from './actions'
import PremiumBackground from '@/components/PremiumBackground'
import { Orbitron, JetBrains_Mono } from 'next/font/google'
import { cn } from '@/utils/cn'

// Font Configurations
const orbitron = Orbitron({ 
  subsets: ["latin"], 
  weight: ['400', '900'], // Loading specific weights for contrast
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
                
                {/* Main Card Container */}
                <div className="relative w-full max-w-4xl min-h-[600px] flex flex-col items-center justify-center">
                    
                    {/* Decorative Corner Lines (Cyberpunk Accents) */}
                    <div className="absolute -top-10 -left-10 h-24 w-24 border-l-2 border-t-2 border-red-600/30 transition-all duration-700 hover:border-red-500 hover:scale-110"></div>
                    <div className="absolute -bottom-10 -right-10 h-24 w-24 border-r-2 border-b-2 border-red-600/30 transition-all duration-700 hover:border-red-500 hover:scale-110"></div>

                    {/* The Glass Card */}
                    <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-black/80 shadow-[0_0_80px_-20px_rgba(220,38,38,0.5)] backdrop-blur-2xl flex flex-col items-center">
                        
                        {/* Top Gradient Edge */}
                        <div className="absolute top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-70"></div>

                        {/* Content Wrapper */}
                        <div className="flex flex-col items-center justify-center py-24 px-6 md:px-12 text-center z-10">
                            
                            {/* 1. Status Line (Wide & Technical) */}
                            <div className={cn(mono.className, 'text-[10px] uppercase tracking-[0.3em] text-red-500 mb-8 flex items-center justify-center gap-3')}>
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                </span>
                                System Ready // 2.0.2.6
                            </div>

                            {/* 2. Main Title (Massive & Tight) */}
                            <h1 className={cn(orbitron.className, 'mb-10 text-6xl md:text-8xl font-black uppercase tracking-tighter text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]')}>
                                <span className="bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-transparent">
                                    HACKSAVVY
                                </span>
                            </h1>
                            
                            {/* 3. Command Instruction (Terminal Style) */}
                            <div className="border-l-2 border-red-600/80 pl-6 py-2 mt-4 mb-16 text-left max-w-sm mx-auto bg-gradient-to-r from-red-900/10 to-transparent">
                                <p className={cn(mono.className, 'text-xs text-neutral-400 leading-relaxed font-medium')}>
                                    SECURE CONNECTION ESTABLISHED.<br/>
                                    IDENTITY VERIFICATION REQUIRED FOR ACCESS.
                                </p>
                            </div>

                            {/* 4. Login Action (Monochromatic Ghost Button) */}
                            <form action={loginWithGoogle}>
                                <button
                                    type="submit"
                                    className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-none border border-white/20 bg-white/5 px-10 py-4 transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95"
                                >
                                    {/* Monochromatic Google Icon */}
                                    <svg className="h-5 w-5 text-white transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                                        <path
                                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 15.907 0 12.48 0 5.867 0 .533 5.347.533 12S5.867 24 12.48 24c3.44 0 6.04-1.133 7.373-3.36 1.333-2.227 1.253-5.04 1.253-5.04l-8.627-2.68z"
                                        />
                                    </svg>
                                    
                                    <span className={cn(mono.className, "text-xs font-bold uppercase tracking-widest text-white")}>
                                        Continue with Google
                                    </span>
                                    
                                    {/* Corner Accents for Button */}
                                    <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-white/50 opacity-0 transition-opacity group-hover:opacity-100"></div>
                                    <div className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-white/50 opacity-0 transition-opacity group-hover:opacity-100"></div>
                                </button>
                            </form>

                            {/* Footer Terms */}
                            <p className={cn(mono.className, "mt-12 text-[10px] text-neutral-600")}>
                                RESTRICTED AREA. AUTHORIZED PERSONNEL ONLY.
                            </p>
                        </div>
                        
                        {/* Red Status Bar at Bottom */}
                        <div className="absolute bottom-0 h-1 w-full bg-red-600/20">
                            <div className="h-full w-1/3 bg-red-600/60 blur-[2px]"></div>
                        </div>
                    </div>

                    {/* Exterior Meta Data */}
                    <div className={cn(mono.className, "absolute -bottom-20 w-full flex justify-between px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500")}>
                        <span>MGIT, HYD // SECTOR 7</span>
                        <span>FEB 12-13 // 2026</span>
                    </div>

                </div>
            </div>
        </PremiumBackground>
    )
}