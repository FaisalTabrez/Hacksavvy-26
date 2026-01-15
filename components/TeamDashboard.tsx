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
        <div className={cn("w-full min-h-screen bg-black relative px-4 md:px-12 py-8 overflow-x-hidden", orbitron.variable, mono.variable)}>
            
            {/* --- Terminate Session Button --- */}
            <button 
                onClick={handleLogout}
                disabled={isLoggingOut}
                className={cn(mono.className, "absolute top-6 right-6 z-50 group flex items-center gap-2 md:gap-3 px-4 py-2 md:px-6 md:py-3 border border-red-900/30 hover:border-red-600 bg-red-950/10 hover:bg-red-900/20 transition-all rounded-none")}
            >
                <span className="w-1.5 h-1.5 bg-red-600 group-hover:animate-pulse"></span>
                <span className="text-[10px] md:text-xs font-bold text-red-500 group-hover:text-red-400 uppercase tracking-widest whitespace-nowrap">
                    {isLoggingOut ? 'EXITING...' : 'LOGOUT'}
                </span>
            </button>

            {/* --- 1. HEADER --- */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-6 mb-12 gap-6 pt-16 md:pt-24">
                <div className="flex flex-col gap-2">
                    <span className={cn(mono.className, "text-[10px] text-red-600 font-bold uppercase tracking-widest")}>
                        System Operator
                    </span>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping absolute"></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full relative"></div>
                        </div>
                        <span className={cn(mono.className, "text-xs md:text-sm text-white uppercase tracking-wider font-bold truncate max-w-[250px] md:max-w-none")}>
                            {user.email}
                        </span>
                    </div>
                </div>
            </header>

            {/* --- 2. HERO SECTION --- */}
            <section className="mb-16 md:mb-20 relative">
                <div className="absolute -top-20 left-0 w-full md:w-96 h-96 bg-red-600/10 blur-[80px] md:blur-[100px] pointer-events-none"></div>

                <div className="flex flex-col gap-4 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="h-px w-8 md:w-12 bg-red-600"></div>
                        <p className={cn(mono.className, "text-[10px] md:text-sm text-red-500 uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold")}>
                            Active Unit
                        </p>
                    </div>

                    <h1 className={cn(orbitron.className, "text-4xl sm:text-6xl md:text-8xl font-black text-white uppercase tracking-tighter break-words drop-shadow-[0_0_25px_rgba(220,38,38,0.3)] leading-[0.9]")}>
                        {team.name}
                    </h1>

                    <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4 md:gap-6 mt-6 md:mt-8">
                        <div className="border-l-2 border-white/20 pl-3 md:pl-4">
                            <span className={cn(mono.className, "block text-[9px] md:text-[10px] text-neutral-500 uppercase tracking-widest")}>Track</span>
                            <span className={cn(mono.className, "block text-xs md:text-sm text-white font-bold uppercase tracking-widest")}>{team.track}</span>
                        </div>

                        <div className="border-l-2 border-white/20 pl-3 md:pl-4">
                             <span className={cn(mono.className, "block text-[9px] md:text-[10px] text-neutral-500 uppercase tracking-widest")}>Strength</span>
                             <span className={cn(mono.className, "block text-xs md:text-sm text-white font-bold uppercase tracking-widest")}>{team.members.length} / {team.size}</span>
                        </div>

                        <div className={cn("border-l-2 pl-3 md:pl-4", 
                             team.payment_status === 'verified' ? "border-green-500" : 
                             team.payment_status === 'rejected' ? "border-red-500" : "border-yellow-500"
                        )}>
                            <span className={cn(mono.className, "block text-[9px] md:text-[10px] text-neutral-500 uppercase tracking-widest")}>Status</span>
                            <span className={cn(mono.className, "block text-xs md:text-sm font-bold uppercase tracking-widest",
                                team.payment_status === 'verified' ? "text-green-500" : 
                                team.payment_status === 'rejected' ? "text-red-500" : "text-yellow-500"
                            )}>
                                {team.payment_status || 'PENDING'}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 3. ROSTER MANIFEST (RED BORDER TABLE) --- */}
            <section className="relative z-10 max-w-7xl">
                
                <div className="flex flex-row items-center justify-between mb-12 gap-6">
                    <div>
                         <h2 className={cn(orbitron.className, "text-xl md:text-2xl text-white font-black uppercase tracking-widest")}>
                            Roster Manifest
                        </h2>
                        <div className="h-1 w-16 md:w-24 bg-red-600 mt-2"></div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                        {isLeader && team.members.length < team.size && (
                            <button
                                onClick={() => setIsAddMemberOpen(true)}
                                className={cn(mono.className, "flex-none px-4 py-2 border border-red-600 text-red-500 hover:bg-red-600 hover:text-white text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all rounded-none text-center")}
                            >
                                + Add Agent
                            </button>
                        )}
                        {isLeader && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className={cn(mono.className, "flex-none px-4 py-2 border border-white/20 text-neutral-400 hover:border-white hover:text-white text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all rounded-none text-center")}
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>

                {/* --- TABLE: ENCASED IN RED BORDER --- */}
                {/* Changed border to red-600/30 for better visibility */}
                <div className="border border-red-600/30 rounded-none overflow-hidden bg-black">
                    
                    {/* Header Row: Dark Red BG + Red Borders */}
                    <div className="hidden md:grid grid-cols-12 bg-red-900/20 border-b border-red-600/50 text-[10px] text-red-500 font-mono uppercase tracking-[0.2em] font-bold">
                        <div className="col-span-3 py-4 px-6 border-r border-red-900/50">Operative Name</div>
                        <div className="col-span-2 py-4 px-6 border-r border-red-900/50">Rank</div>
                        <div className="col-span-3 py-4 px-6 border-r border-red-900/50">Phone No:</div>
                        <div className="col-span-2 py-4 px-6 border-r border-red-900/50">Institute</div>
                        <div className="col-span-2 py-4 px-6 text-right">Logistics</div>
                    </div>

                    {/* Table Body */}
                    <div className="flex flex-col">
                        {team.members.map((member) => (
                            <motion.div 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                key={member.id}
                                // Row Border: Red-900/30
                                className={cn("group relative flex flex-col md:grid md:grid-cols-12 md:gap-4 gap-3 py-6 px-6 border-b border-red-900/30 last:border-b-0 hover:bg-red-900/5 transition-colors",
                                    member.is_leader ? "bg-red-950/10" : ""
                                )}
                            >
                                {/* Name */}
                                <div className="md:col-span-3 p-4 md:px-6 md:py-5 md:border-r md:border-red-900/50 flex flex-col justify-center">
                                    <span className={cn(mono.className, "text-sm text-white font-bold uppercase tracking-wider")}>
                                        {member.name}
                                    </span>
                                    <span className={cn(mono.className, "text-[10px] text-neutral-600 md:hidden mt-1")}>
                                        {member.email}
                                    </span>
                                </div>

                                {/* Rank */}
                                <div className="md:col-span-2 p-4 md:px-6 md:py-5 md:border-r md:border-red-900/50 flex items-center">
                                    <span className={cn(mono.className, "text-[9px] font-bold uppercase tracking-widest px-2 py-1 inline-block", 
                                        member.is_leader ? "text-red-500 bg-red-500/10 border border-red-500/20" : "text-neutral-500 border border-neutral-800"
                                    )}>
                                        {member.is_leader ? 'SQUAD LEADER' : 'OPERATIVE'}
                                    </span>
                                </div>

                                {/* Phone */}
                                <div className="md:col-span-3 p-4 md:px-6 md:py-5 md:border-r md:border-red-900/50 flex items-center gap-2 md:gap-0">
                                    <span className="md:hidden text-[10px] text-neutral-600 uppercase">Phone:</span>
                                    <span className={cn(mono.className, "text-xs text-neutral-400 font-mono tracking-widest")}>
                                        {member.phone}
                                    </span>
                                </div>

                                {/* Institute */}
                                <div className="md:col-span-2 p-4 md:px-6 md:py-5 md:border-r md:border-red-900/50 flex items-center gap-2 md:gap-0">
                                    <span className="md:hidden text-[10px] text-neutral-600 uppercase">Institute:</span>
                                    <span className={cn(mono.className, "text-xs text-neutral-300 uppercase truncate tracking-wider max-w-[200px]")}>
                                        {member.college}
                                    </span>
                                </div>

                                {/* Logistics */}
                                {/* Mobile: Top border red. Desktop: No top border */}
                                <div className="md:col-span-2 p-4 md:px-6 md:py-5 flex flex-row md:flex-col items-center md:items-end md:justify-center gap-3 md:gap-1 border-t border-red-900/50 md:border-t-0">
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
                </div>
            </section>

            {/* --- ADD MEMBER MODAL --- */}
            {isAddMemberOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
                    <div className="w-full max-w-lg border-2 border-red-900/50 bg-black p-6 md:p-8 relative shadow-[0_0_50px_rgba(220,38,38,0.2)] rounded-none max-h-[90vh] overflow-y-auto">
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-600"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-600"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-600"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-600"></div>

                        <h2 className={cn(orbitron.className, "text-2xl md:text-3xl text-white font-black uppercase mb-6 tracking-tighter")}>
                            Recruit Agent
                        </h2>
                        
                        {addMemberError && (
                             <div className={cn(mono.className, "mb-6 p-4 bg-red-950/30 border border-red-600 text-red-500 text-xs font-bold rounded-none")}>
                                ERROR: {addMemberError}
                            </div>
                        )}

                        <form action={handleAddMember} className="space-y-5">
                            <div className="space-y-2">
                                <label className={cn(mono.className, "text-[10px] text-red-600 font-bold uppercase tracking-widest")}>Full Name</label>
                                <input name="name" required className={cn(mono.className, "w-full bg-transparent border-b border-white/20 py-2 text-white text-sm focus:border-red-600 outline-none rounded-none transition-colors uppercase placeholder:text-neutral-800")} placeholder="ENTER NAME" />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className={cn(mono.className, "text-[10px] text-red-600 font-bold uppercase tracking-widest")}>Email</label>
                                    <input name="email" type="email" required className={cn(mono.className, "w-full bg-transparent border-b border-white/20 py-2 text-white text-sm focus:border-red-600 outline-none rounded-none transition-colors uppercase placeholder:text-neutral-800")} placeholder="ENTER EMAIL" />
                                </div>
                                <div className="space-y-2">
                                    <label className={cn(mono.className, "text-[10px] text-red-600 font-bold uppercase tracking-widest")}>Phone</label>
                                    <input name="phone" required className={cn(mono.className, "w-full bg-transparent border-b border-white/20 py-2 text-white text-sm focus:border-red-600 outline-none rounded-none transition-colors uppercase")} placeholder="+91..." />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className={cn(mono.className, "text-[10px] text-red-600 font-bold uppercase tracking-widest")}>Institute</label>
                                <input name="college" required className={cn(mono.className, "w-full bg-transparent border-b border-white/20 py-2 text-white text-sm focus:border-red-600 outline-none rounded-none transition-colors uppercase")} placeholder="INSTITUTE NAME" />
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className={cn(mono.className, "text-[10px] text-red-600 font-bold uppercase tracking-widest")}>Branch</label>
                                    <input name="branch" className={cn(mono.className, "w-full bg-transparent border-b border-white/20 py-2 text-white text-sm focus:border-red-600 outline-none rounded-none transition-colors uppercase")} placeholder="DEPT" />
                                </div>
                                <div className="space-y-2">
                                    <label className={cn(mono.className, "text-[10px] text-red-600 font-bold uppercase tracking-widest")}>Roll No</label>
                                    <input name="rollNo" className={cn(mono.className, "w-full bg-transparent border-b border-white/20 py-2 text-white text-sm focus:border-red-600 outline-none rounded-none transition-colors uppercase")} placeholder="ID" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-5 pt-4">
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

                            <div className="flex gap-4 pt-8">
                                <button type="button" onClick={() => setIsAddMemberOpen(false)} className={cn(mono.className, "flex-1 border border-white/20 py-3 text-white text-xs hover:bg-white/10 font-bold uppercase tracking-widest rounded-none")}>Abort</button>
                                <button type="submit" disabled={isAdding} className={cn(mono.className, "flex-1 bg-red-600 py-3 text-white text-xs font-bold hover:bg-red-700 uppercase tracking-widest shadow-[0_0_20px_rgba(220,38,38,0.4)] rounded-none")}>
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