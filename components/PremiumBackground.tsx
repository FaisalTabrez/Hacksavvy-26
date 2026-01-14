'use client'

import React from 'react'

interface PremiumBackgroundProps {
    children: React.ReactNode
}

export default function PremiumBackground({ children }: PremiumBackgroundProps) {
    return (
        <div className="relative min-h-screen overflow-hidden bg-black text-white selection:bg-red-500/30 selection:text-red-200">
            {/* Base Background - Deep Void */}
            <div className="fixed inset-0 bg-[#030005]"></div>

            {/* Liquid Animation Container */}
            <div className="fixed inset-0 opacity-60">
                {/* Moving Red Blobs */}
                <div className="absolute top-[-10%] left-[-10%] h-[50vh] w-[50vh] animate-blob rounded-full bg-red-900/40 blur-[100px] mix-blend-screen filter"></div>
                <div className="absolute top-[20%] right-[-10%] h-[60vh] w-[60vh] animate-blob animation-delay-2000 rounded-full bg-[#3d0000] blur-[100px] mix-blend-screen filter"></div>
                <div className="absolute bottom-[-20%] left-[20%] h-[70vh] w-[70vh] animate-blob animation-delay-4000 rounded-full bg-red-900/30 blur-[100px] mix-blend-screen filter"></div>
                
                {/* Intense Core */}
                <div className="absolute top-1/2 left-1/2 h-[40vh] w-[40vh] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-red-600/10 blur-[120px]"></div>
            </div>

            {/* Void Noise/Texture (Optional, simulated with pattern) */}
            <div className="fixed inset-0 opacity-[0.03] bg-[url('/noise.png')] mix-blend-overlay pointer-events-none"></div>

            {/* Grid Overlay - subtle tech feel */}
            <div className="fixed inset-0 bg-[linear-gradient(rgba(50,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(50,0,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none mask-gradient"></div>

            {/* Content */}
            <div className="relative z-10 w-full min-h-screen">
                {children}
            </div>

            <style jsx global>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 10s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                .mask-gradient {
                    mask-image: radial-gradient(circle at center, transparent, black);
                    -webkit-mask-image: radial-gradient(circle at center, transparent 10%, black 90%);
                }
            `}</style>
        </div>
    )
}
