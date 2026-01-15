'use client'

import React, { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Orbitron, JetBrains_Mono } from 'next/font/google'
import { cn } from '@/utils/cn'
import { motion } from 'framer-motion'
import RegistrationForm from './RegistrationForm'
import { addMemberToTeam } from '@/app/dashboard/actions'

const orbitron = Orbitron({ subsets: ["latin"], weight: ['400', '700', '900'], variable: '--font-orbitron' });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: '--font-mono' });

interface Member {
    id: string
    name: string
    email: string
    phone: string
    college: string
    roll_no?: string
    branch?: string
    accommodation: boolean
    food_preference: string
    is_leader: boolean
}

interface Team {
    id: string
    name: string
    track: string
    size: number
    payment_status: string
    upi_reference: string
    members: Member[]
}

interface TeamDashboardProps {
    team: Team
    user: any
    isLeader: boolean
}

export default function TeamDashboard({ team, user, isLeader }: TeamDashboardProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)
    const [addMemberError, setAddMemberError] = useState('')
    const [isAdding, setIsAdding] = useState(false)
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const handleLogout = async () => {
        setIsLoggingOut(true)
        const supabase = createClient()
        await supabase.auth.signOut()
        window.location.href = '/'
    }

    async function handleAddMember(formData: FormData) {
        setIsAdding(true)
        setAddMemberError('')
        const res = await addMemberToTeam(formData, team.id)
        setIsAdding(false)
        if (res?.error) {
            setAddMemberError(res.error)
        } else {
            setIsAddMemberOpen(false)
            window.location.reload()
        }
    }

    if (isEditing) {
         const initialData = {
            teamName: team.name,
            track: team.track,
            teamSize: String(team.size),
            upiReference: team.upi_reference,
            members: team.members.map((m: any) => ({
                name: m.name,
                email: m.email,
                phone: m.phone,
                college: m.college,
                rollNo: m.roll_no || '',
                branch: m.branch || '',
                accommodation: m.accommodation || false,
                food: m.food_preference,
            })),
        }
        return (
            <div className="w-full min-h-screen bg-black">
                <RegistrationForm
                    initialData={initialData}
                    isEditing={true}
                    teamId={team.id}
                    onCancel={() => setIsEditing(false)}
                />
            </div>
        )
    }

    return (
        <div className={cn("w-full min-h-screen bg-black relative px-6 md:px-12 py-8", orbitron.variable, mono.variable)}>
            
            {/* --- 1. HEADER (Relative positioning to prevent overlap) --- */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-6 mb-12 gap-6">
                
                {/* Operator Info */}
                <div className="flex flex-col gap-2">
                    <span className={cn(mono.className, "text-[10px] text-red-600 font-bold uppercase tracking-widest")}>
                        System Operator
                    </span>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping absolute"></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full relative"></div>
                        </div>
                        <span className={cn(mono.className, "text-sm text-white uppercase tracking-wider font-bold")}>
                            {user.email}
                        </span>
                    </div>
                </div>

                {/* Terminate Session Button */}
                <button 
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className={cn(mono.className, "group flex items-center gap-3 px-6 py-3 border border-red-900/30 hover:border-red-600 bg-red-950/10 hover:bg-red-900/20 transition-all rounded-none")}
                >
                    <span className="w-1.5 h-1.5 bg-red-600 group-hover:animate-pulse"></span>
                    <span className="text-xs font-bold text-red-500 group-hover:text-red-400 uppercase tracking-widest">
                        {isLoggingOut ? 'TERMINATING...' : 'TERMINATE SESSION'}
                    </span>
                </button>
            </header>

            {/* --- 2. HERO SECTION (Team Info) --- */}
            <section className="mb-24 relative">
                {/* Ambient Red Glow */}
                <div className="absolute -top-20 left-0 w-96 h-96 bg-red-600/10 blur-[100px] pointer-events-none"></div>

                <div className="flex flex-col gap-4 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="h-px w-12 bg-red-600"></div>
                        <p className={cn(mono.className, "text-xs md:text-sm text-red-500 uppercase tracking-[0.3em] font-bold")}>
                            Active Unit // ID: {team.id.slice(0, 8)}
                        </p>
                    </div>

                    <h1 className={cn(orbitron.className, "text-5xl md:text-8xl font-black text-white uppercase tracking-tighter break-words drop-shadow-[0_0_25px_rgba(220,38,38,0.3)]")}>
                        {team.name}
                    </h1>

                    {/* Status Pills */}
                    <div className="flex flex-wrap items-center gap-6 mt-6">
                        {/* Track */}
                        <div className="border-l-2 border-white/20 pl-4">
                            <span className={cn(mono.className, "block text-[10px] text-neutral-500 uppercase tracking-widest")}>Track</span>
                            <span className={cn(mono.className, "block text-sm text-white font-bold uppercase tracking-widest")}>{team.track}</span>
                        </div>

                        {/* Size */}
                        <div className="border-l-2 border-white/20 pl-4">
                             <span className={cn(mono.className, "block text-[10px] text-neutral-500 uppercase tracking-widest")}>Strength</span>
                             <span className={cn(mono.className, "block text-sm text-white font-bold uppercase tracking-widest")}>{team.members.length} / {team.size}</span>
                        </div>

                        {/* Payment Status (Colored) */}
                        <div className={cn("border-l-2 pl-4", 
                             team.payment_status === 'verified' ? "border-green-500" : 
                             team.payment_status === 'rejected' ? "border-red-500" : "border-yellow-500"
                        )}>
                            <span className={cn(mono.className, "block text-[10px] text-neutral-500 uppercase tracking-widest")}>Status</span>
                            <span className={cn(mono.className, "block text-sm font-bold uppercase tracking-widest",
                                team.payment_status === 'verified' ? "text-green-500" : 
                                team.payment_status === 'rejected' ? "text-red-500" : "text-yellow-500"
                            )}>
                                {team.payment_status || 'PENDING'}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 3. ROSTER MANIFEST --- */}
            <section className="relative z-10 max-w-7xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-red-900/30 pb-4 gap-4">
                    <div>
                         <h2 className={cn(orbitron.className, "text-2xl md:text-4xl text-white font-black uppercase tracking-widest")}>
                            Roster Manifest
                        </h2>
                        <div className="h-1 w-24 bg-red-600 mt-2"></div>
                    </div>
                    
                    {/* Dashboard Actions */}
                    <div className="flex gap-4">
                        {isLeader && team.members.length < team.size && (
                            <button
                                onClick={() => setIsAddMemberOpen(true)}
                                className={cn(mono.className, "px-6 py-3 border border-red-600 text-red-500 hover:bg-red-600 hover:text-white text-xs font-bold uppercase tracking-widest transition-all")}
                            >
                                + Add Agent
                            </button>
                        )}
                        {isLeader && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className={cn(mono.className, "px-6 py-3 border border-white/20 text-neutral-400 hover:border-white hover:text-white text-xs font-bold uppercase tracking-widest transition-all")}
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>

                {/* The Grid Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 pb-4 px-4 text-[10px] text-red-500/70 font-mono uppercase tracking-[0.2em] font-bold">
                    <div className="col-span-3">Operative Name</div>
                    <div className="col-span-2">Rank</div>
                    <div className="col-span-3">Signal ID</div>
                    <div className="col-span-2">Sector</div>
                    <div className="col-span-2 text-right">Logistics</div>
                </div>

                {/* The Rows */}
                <div className="flex flex-col gap-2">
                    {team.members.map((member) => (
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            key={member.id}
                            className={cn("group relative md:grid md:grid-cols-12 md:gap-4 flex flex-col gap-2 py-6 px-4 border-l-2 transition-all hover:bg-white/[0.02]",
                                member.is_leader ? "border-red-600 bg-red-900/5" : "border-white/10"
                            )}
                        >
                            {/* Mobile Label showing only on small screens */}
                            <div className="md:col-span-3 flex flex-col justify-center">
                                <span className={cn(mono.className, "text-base text-white font-bold uppercase tracking-wider")}>
                                    {member.name}
                                </span>
                                <span className={cn(mono.className, "text-[10px] text-neutral-600 md:hidden")}>
                                    {member.email}
                                </span>
                            </div>

                            <div className="md:col-span-2 flex items-center">
                                <span className={cn(mono.className, "text-[9px] font-bold uppercase tracking-widest px-2 py-1", 
                                    member.is_leader ? "text-red-500 bg-red-500/10 border border-red-500/20" : "text-neutral-500 border border-neutral-800"
                                )}>
                                    {member.is_leader ? 'SQUAD LEADER' : 'OPERATIVE'}
                                </span>
                            </div>

                            <div className="md:col-span-3 flex items-center">
                                <span className={cn(mono.className, "text-xs text-neutral-400 font-mono tracking-widest")}>
                                    {member.phone}
                                </span>
                            </div>

                            <div className="md:col-span-2 flex items-center">
                                <span className={cn(mono.className, "text-xs text-neutral-300 uppercase truncate tracking-wider")}>
                                    {member.college}
                                </span>
                            </div>

                            <div className="md:col-span-2 flex flex-col items-end justify-center gap-1">
                                <span className={cn(mono.className, "text-[10px] font-bold uppercase tracking-wider", 
                                    member.food_preference === 'Non-Veg' ? "text-red-400" : "text-green-400"
                                )}>
                                    {member.food_preference}
                                </span>
                                {member.accommodation && (
                                    <span className={cn(mono.className, "text-[9px] text-blue-400 uppercase tracking-wider border border-blue-900/50 px-1")}>
                                        STAY REQ
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* --- ADD MEMBER MODAL --- */}
            {isAddMemberOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
                    <div className="w-full max-w-lg border-2 border-red-900/50 bg-black p-8 relative shadow-[0_0_50px_rgba(220,38,38,0.2)]">
                        {/* Decorative Corners */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-600"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-600"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-600"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-600"></div>

                        <h2 className={cn(orbitron.className, "text-3xl text-white font-black uppercase mb-8 tracking-tighter")}>
                            Recruit Agent
                        </h2>
                        
                        {addMemberError && (
                             <div className={cn(mono.className, "mb-6 p-4 bg-red-950/30 border border-red-600 text-red-500 text-xs font-bold")}>
                                ERROR: {addMemberError}
                            </div>
                        )}

                        <form action={handleAddMember} className="space-y-6">
                            <div className="space-y-2">
                                <label className={cn(mono.className, "text-[10px] text-red-600 font-bold uppercase tracking-widest")}>Full Name</label>
                                <input name="name" required className={cn(mono.className, "w-full bg-transparent border-b border-white/20 py-2 text-white text-sm focus:border-red-600 outline-none rounded-none transition-colors uppercase placeholder:text-neutral-800")} placeholder="ENTER NAME" />
                            </div>
                            <div className="space-y-2">
                                <label className={cn(mono.className, "text-[10px] text-red-600 font-bold uppercase tracking-widest")}>Email</label>
                                <input name="email" type="email" required className={cn(mono.className, "w-full bg-transparent border-b border-white/20 py-2 text-white text-sm focus:border-red-600 outline-none rounded-none transition-colors uppercase placeholder:text-neutral-800")} placeholder="ENTER EMAIL" />
                            </div>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className={cn(mono.className, "text-[10px] text-red-600 font-bold uppercase tracking-widest")}>Phone</label>
                                    <input name="phone" required className={cn(mono.className, "w-full bg-transparent border-b border-white/20 py-2 text-white text-sm focus:border-red-600 outline-none rounded-none transition-colors uppercase")} placeholder="+91..." />
                                </div>
                                <div className="space-y-2">
                                    <label className={cn(mono.className, "text-[10px] text-red-600 font-bold uppercase tracking-widest")}>Branch</label>
                                    <input name="branch" className={cn(mono.className, "w-full bg-transparent border-b border-white/20 py-2 text-white text-sm focus:border-red-600 outline-none rounded-none transition-colors uppercase")} placeholder="DEPT" />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className={cn(mono.className, "text-[10px] text-red-600 font-bold uppercase tracking-widest")}>College</label>
                                <input name="college" required className={cn(mono.className, "w-full bg-transparent border-b border-white/20 py-2 text-white text-sm focus:border-red-600 outline-none rounded-none transition-colors uppercase")} placeholder="INSTITUTE NAME" />
                            </div>
                            <div className="space-y-2">
                                <label className={cn(mono.className, "text-[10px] text-red-600 font-bold uppercase tracking-widest")}>Roll No</label>
                                <input name="rollNo" className={cn(mono.className, "w-full bg-transparent border-b border-white/20 py-2 text-white text-sm focus:border-red-600 outline-none rounded-none transition-colors uppercase")} placeholder="ID NUMBER" />
                            </div>

                            <div className="grid grid-cols-2 gap-8 pt-4">
                                <div className="space-y-2">
                                    <label className={cn(mono.className, "text-[10px] text-red-600 font-bold uppercase tracking-widest")}>Rations</label>
                                    <select name="food" className={cn(mono.className, "w-full bg-black border border-white/20 p-3 text-white text-sm focus:border-red-600 outline-none rounded-none uppercase cursor-pointer")}>
                                        <option value="Veg">Veg</option>
                                        <option value="Non-Veg">Non-Veg</option>
                                    </select>
                                </div>
                                <div className="flex items-end pb-3 gap-3">
                                    <input type="checkbox" name="accommodation" value="true" className="w-5 h-5 border border-white/20 bg-transparent checked:bg-red-600 rounded-none cursor-pointer" />
                                    <label className={cn(mono.className, "text-xs text-white font-bold uppercase tracking-widest")}>Accommodation</label>
                                </div>
                            </div>

                            <div className="flex gap-6 pt-8">
                                <button type="button" onClick={() => setIsAddMemberOpen(false)} className={cn(mono.className, "flex-1 border border-white/20 py-4 text-white text-xs hover:bg-white/10 font-bold uppercase tracking-widest")}>Abort</button>
                                <button type="submit" disabled={isAdding} className={cn(mono.className, "flex-1 bg-red-600 py-4 text-white text-xs font-bold hover:bg-red-700 uppercase tracking-widest shadow-[0_0_20px_rgba(220,38,38,0.4)]")}>
                                    {isAdding ? 'PROCESSING...' : 'CONFIRM RECRUIT'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

