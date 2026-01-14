'use client'

import React, { useState } from 'react'
import { Orbitron, JetBrains_Mono } from 'next/font/google'
import { cn } from '@/utils/cn'
import RegistrationForm from './RegistrationForm' 

// Font Configurations (Keep consistent with Login)
const orbitron = Orbitron({ 
  subsets: ['latin'], 
  weight: ['400', '700', '900'], 
  variable: '--font-orbitron'
});

const mono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono' 
});

interface EmptyStateProps {
    user: any
}

export default function EmptyState({ user }: EmptyStateProps) {
    const [isCreating, setIsCreating] = useState(false)

    // Helper to get first name for the massive display
    const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'OPERATOR';

    return (
        <div className={cn('relative flex h-screen w-full flex-col items-center justify-center overflow-hidden', orbitron.variable, mono.variable)}>
            
            {/* --- HUD: TOP LEFT --- */}
            <div className='absolute top-6 left-6 md:top-12 md:left-12 z-20'>
                <div className={cn(mono.className, 'flex flex-col gap-1')}>
                    <span className='text-[10px] text-red-500 uppercase tracking-[0.3em] font-bold'>Identity</span>
                    <span className='text-sm text-white font-medium tracking-widest uppercase'>{user?.email}</span>
                </div>
            </div>

            {/* --- HUD: TOP RIGHT --- */}
            <div className='absolute top-6 right-6 md:top-12 md:right-12 z-20 text-right'>
                <div className={cn(mono.className, 'flex flex-col gap-1')}>
                    <span className='text-[10px] text-red-500 uppercase tracking-[0.3em] font-bold'>Current Status</span>
                    <div className='flex items-center justify-end gap-2'>
                        <span className='relative flex h-2 w-2'>
                            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75'></span>
                            <span className='relative inline-flex rounded-full h-2 w-2 bg-yellow-500'></span>
                        </span>
                        <span className='text-sm text-white font-medium tracking-widest'>UNASSIGNED</span>
                    </div>
                </div>
            </div>

            {/* --- CENTER STAGE --- */}
            <div className='relative z-10 flex flex-col items-center justify-center w-full px-4 gap-12'>
                
                {/* 1. Greeting / Subtext */}
                <div className='flex flex-col items-center gap-3'>
                    <p className={cn(mono.className, 'text-[10px] md:text-xs text-neutral-400 uppercase tracking-[0.4em]')}>
                        [ Authentication Verified ]
                    </p>
                    <p className={cn(mono.className, 'text-xs md:text-sm text-white uppercase tracking-[0.2em]')}>
                        Welcome to the Void,
                    </p>
                </div>

                {/* 2. The User Name (Massive Hero) */}
                <div className='relative group text-center'>
                    <div className='absolute inset-0 bg-red-600/10 blur-[100px] rounded-full pointer-events-none opacity-50'></div>
                    <h1 className={cn(orbitron.className, 'relative z-10 text-[15vw] md:text-[12vw] lg:text-[10rem] leading-[0.8] font-black tracking-tighter text-white drop-shadow-2xl select-none uppercase')}>
                        {firstName}
                    </h1>
                </div>

                {/* 3. The Instruction */}
                <div className='max-w-md text-center'>
                    <p className={cn(mono.className, 'text-xs md:text-sm text-red-500 font-bold tracking-widest uppercase leading-relaxed')}>
                        // Warning: No Squad Detected
                    </p>
                    <p className={cn(mono.className, 'mt-2 text-[10px] md:text-xs text-neutral-500 font-medium tracking-wider')}>
                        You are currently drifting. Initialize a new protocol (Create Team) to materialize into Sector 7.
                    </p>
                </div>

                {/* 4. The Action (Create Team) */}
                <button
                    onClick={() => setIsCreating(true)}
                    className='group relative flex items-center gap-4 rounded-full border border-white/20 bg-white/5 px-12 py-5 backdrop-blur-md transition-all duration-300 hover:bg-white hover:border-white hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]'
                >
                    <div className='flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-colors group-hover:bg-black group-hover:text-white'>
                        <svg className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
                        </svg>
                    </div>
                    
                    <span className={cn(mono.className, 'text-sm font-bold uppercase tracking-widest text-white group-hover:text-black')}>
                        Initialize Squad
                    </span>
                </button>
            </div>

            {/* --- HUD: BOTTOM --- */}
            <div className='absolute bottom-6 w-full flex justify-between px-6 md:px-12 z-20'>
                <div className='flex flex-col gap-1'>
                    <div className='h-px w-12 bg-red-600'></div>
                    <p className={cn(mono.className, 'text-[9px] text-neutral-600 uppercase tracking-widest')}>
                        Awaiting Input
                    </p>
                </div>
                <div className='flex flex-col gap-1 items-end text-right'>
                    <div className='h-px w-12 bg-red-600'></div>
                    <p className={cn(mono.className, 'text-[9px] text-neutral-600 uppercase tracking-widest')}>
                        SYS_ID: {user?.id?.slice(0, 8)}
                    </p>
                </div>
            </div>

            {/* Create Team Modal */}
            {isCreating && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 overflow-y-auto'>
                    <div className='w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem]'>
                         <RegistrationForm onCancel={() => setIsCreating(false)} />
                    </div>
                </div>
            )}
        </div>
    )
}
