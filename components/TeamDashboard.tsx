'use client'

import React, { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Orbitron, JetBrains_Mono } from 'next/font/google'
import { cn } from '@/utils/cn'
import { motion } from 'framer-motion'
import RegistrationForm from './RegistrationForm'
import { addMemberToTeam } from '@/app/dashboard/actions'

// Font Configurations
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

    // LOGOUT LOGIC
    const handleLogout = async () => {
        setIsLoggingOut(true)
        const supabase = createClient()
        await supabase.auth.signOut()
        window.location.href = '/' // Force redirect to home/login
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

    // IF EDITING, SHOW FORM (Reusing the Full Screen Form we made earlier)
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

    // MAIN DASHBOARD UI
    return (
        <div className={cn("w-full min-h-screen relative pt-32 pb-24 px-6 md:px-12", orbitron.variable, mono.variable)}>
            
            {/* --- TOP HUD --- */}
            <div className="absolute top-0 left-0 w-full flex justify-between items-start p-6 md:p-12 z-20 pointer-events-none">
                {/* Left: Operator Info */}
                <div className="flex flex-col gap-1 pointer-events-auto">
                    <span className={cn(mono.className, "text-[10px] text-red-600 font-bold uppercase tracking-widest")}>
                        System Operator
                    </span>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className={cn(mono.className, "text-xs text-white uppercase tracking-wider")}>
                            {user.email}
                        </span>
                    </div>
                </div>

                {/* Right: Terminate Session */}
                <button 
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className={cn(mono.className, "pointer-events-auto group flex items-center gap-2 px-4 py-2 border border-red-900/50 hover:border-red-600 bg-red-950/10 hover:bg-red-900/20 transition-all")}
                >
                    <span className="w-1.5 h-1.5 bg-red-600 group-hover:animate-ping"></span>
                    <span className="text-[10px] font-bold text-red-500 group-hover:text-red-400 uppercase tracking-widest">
                        {isLoggingOut ? 'TERMINATING...' : 'TERMINATE SESSION'}
                    </span>
                </button>
            </div>

            {/* --- HERO SECTION: TEAM IDENTITY --- */}
            <div className="relative mb-24 mt-12">
                <div className="border-l-4 border-red-600 pl-8 md:pl-12 py-4">
                    <p className={cn(mono.className, "text-xs md:text-sm text-neutral-500 uppercase tracking-[0.3em] mb-2")}>
                        Active Unit // ID: {team.id.slice(0, 8)}
                    </p>
                    <h1 className={cn(orbitron.className, "text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter break-words")}>
                        {team.name}
                    </h1>
                </div>

                {/* Status Bar */}
                <div className="flex flex-wrap items-center gap-6 mt-8 pl-8 md:pl-12">
                     <div className="px-4 py-2 bg-white/5 border border-white/10">
                        <span className={cn(mono.className, "text-xs text-neutral-400 uppercase tracking-widest")}>Track: </span>
                        <span className={cn(mono.className, "text-xs text-white font-bold uppercase tracking-widest ml-2")}>{team.track}</span>
                    </div>
                    
                    <div className="px-4 py-2 bg-white/5 border border-white/10">
                         <span className={cn(mono.className, "text-xs text-neutral-400 uppercase tracking-widest")}>Size: </span>
                         <span className={cn(mono.className, "text-xs text-white font-bold uppercase tracking-widest ml-2")}>{team.members.length}/{team.size}</span>
                    </div>

                    <div className={cn("px-4 py-2 border", 
                        team.payment_status === 'verified' ? "bg-green-900/20 border-green-600/50" : 
                        team.payment_status === 'rejected' ? "bg-red-900/20 border-red-600/50" : 
                        "bg-yellow-900/20 border-yellow-600/50"
                    )}>
                        <span className={cn(mono.className, "text-xs font-bold uppercase tracking-widest",
                            team.payment_status === 'verified' ? "text-green-500" :
                            team.payment_status === 'rejected' ? "text-red-500" :
                            "text-yellow-500"
                        )}>
                            Payment: {team.payment_status || 'PENDING CHECK'}
                        </span>
                    </div>
                </div>
            </div>

            {/* --- ROSTER GRID (No Cards, Just Data Lines) --- */}
            <div className="relative z-10">
                <div className="flex items-end justify-between mb-8 border-b border-white/20 pb-4">
                    <h2 className={cn(orbitron.className, "text-2xl md:text-3xl text-white font-black uppercase tracking-widest")}>
                        Roster Manifest
                    </h2>
                    
                    {/* Dashboard Actions */}
                    <div className="flex gap-4">
                        {isLeader && team.members.length < team.size && (
                            <button
                                onClick={() => setIsAddMemberOpen(true)}
                                className={cn(mono.className, "px-4 py-2 bg-white text-black hover:bg-neutral-300 text-xs font-bold uppercase tracking-widest transition-all")}
                            >
                                + Add Agent
                            </button>
                        )}
                        {isLeader && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className={cn(mono.className, "px-4 py-2 border border-white text-white hover:bg-white/10 text-xs font-bold uppercase tracking-widest transition-all")}
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>

                {/* The Grid Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 pb-4 px-2 text-[10px] text-neutral-500 font-mono uppercase tracking-widest border-b border-white/5">
                    <div className="col-span-3">Operative Name</div>
                    <div className="col-span-2">Rank</div>
                    <div className="col-span-3">Signal ID</div>
                    <div className="col-span-2">Sector</div>
                    <div className="col-span-2 text-right">Logistics</div>
                </div>

                {/* The Rows */}
                <div className="flex flex-col">
                    {team.members.map((member) => (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={member.id}
                            className="group relative md:grid md:grid-cols-12 md:gap-4 flex flex-col gap-2 py-6 border-b border-white/10 hover:bg-white/[0.02] transition-colors px-2"
                        >
                            {/* Mobile Label showing only on small screens */}
                            <div className="md:col-span-3 flex flex-col justify-center">
                                <span className={cn(mono.className, "text-lg md:text-sm text-white font-bold uppercase tracking-wider")}>
                                    {member.name}
                                </span>
                                <span className={cn(mono.className, "text-[10px] text-neutral-600 md:hidden")}>
                                    {member.email}
                                </span>
                            </div>

                            <div className="md:col-span-2 flex items-center">
                                <span className={cn(mono.className, "text-[10px] font-bold uppercase tracking-widest px-2 py-1 border", 
                                    member.is_leader ? "text-red-500 border-red-900 bg-red-900/10" : "text-neutral-400 border-neutral-800"
                                )}>
                                    {member.is_leader ? 'SQUAD LEADER' : 'OPERATIVE'}
                                </span>
                            </div>

                            <div className="md:col-span-3 flex items-center">
                                <span className={cn(mono.className, "text-xs text-neutral-400 font-mono")}>
                                    {member.phone}
                                </span>
                            </div>

                            <div className="md:col-span-2 flex items-center">
                                <span className={cn(mono.className, "text-xs text-neutral-400 uppercase truncate")}>
                                    {member.college}
                                </span>
                            </div>

                            <div className="md:col-span-2 flex flex-col items-end justify-center gap-1">
                                <span className={cn(mono.className, "text-[10px] font-bold uppercase", 
                                    member.food_preference === 'Non-Veg' ? "text-red-400" : "text-green-400"
                                )}>
                                    {member.food_preference}
                                </span>
                                {member.accommodation && (
                                    <span className={cn(mono.className, "text-[10px] text-blue-400 uppercase")}>
                                        STAY REQ
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* --- ADD MEMBER MODAL (Terminal Style) --- */}
            {isAddMemberOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
                    <div className="w-full max-w-lg bg-black border border-white/20 p-8 relative">
                        <h2 className={cn(orbitron.className, "text-2xl text-white font-black uppercase mb-6")}>
                            Recruit Agent
                        </h2>
                        
                        {addMemberError && (
                             <div className={cn(mono.className, "mb-4 p-3 bg-red-900/20 border border-red-600 text-red-500 text-xs")}>
                                ERROR: {addMemberError}
                            </div>
                        )}

                        <form action={handleAddMember} className="space-y-4">
                            <div className="space-y-1">
                                <label className={cn(mono.className, "text-[10px] text-neutral-500 uppercase")}>Full Name</label>
                                <input name="name" required className={cn(mono.className, "w-full bg-white/5 border border-white/10 p-3 text-white text-sm focus:border-red-600 outline-none rounded-none")} />
                            </div>
                            <div className="space-y-1">
                                <label className={cn(mono.className, "text-[10px] text-neutral-500 uppercase")}>Email</label>
                                <input name="email" type="email" required className={cn(mono.className, "w-full bg-white/5 border border-white/10 p-3 text-white text-sm focus:border-red-600 outline-none rounded-none")} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className={cn(mono.className, "text-[10px] text-neutral-500 uppercase")}>Phone</label>
                                    <input name="phone" required className={cn(mono.className, "w-full bg-white/5 border border-white/10 p-3 text-white text-sm focus:border-red-600 outline-none rounded-none")} />
                                </div>
                                <div className="space-y-1">
                                    <label className={cn(mono.className, "text-[10px] text-neutral-500 uppercase")}>Branch</label>
                                    <input name="branch" className={cn(mono.className, "w-full bg-white/5 border border-white/10 p-3 text-white text-sm focus:border-red-600 outline-none rounded-none")} />
                                </div>
                            </div>
                            
                            <div className="space-y-1">
                                <label className={cn(mono.className, "text-[10px] text-neutral-500 uppercase")}>College</label>
                                <input name="college" required className={cn(mono.className, "w-full bg-white/5 border border-white/10 p-3 text-white text-sm focus:border-red-600 outline-none rounded-none")} />
                            </div>
                            <div className="space-y-1">
                                <label className={cn(mono.className, "text-[10px] text-neutral-500 uppercase")}>Roll No</label>
                                <input name="rollNo" className={cn(mono.className, "w-full bg-white/5 border border-white/10 p-3 text-white text-sm focus:border-red-600 outline-none rounded-none")} />
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <select name="food" className={cn(mono.className, "w-full bg-white/5 border border-white/10 p-3 text-white text-sm focus:border-red-600 outline-none rounded-none")}>
                                    <option value="Veg" className="bg-black">Veg</option>
                                    <option value="Non-Veg" className="bg-black">Non-Veg</option>
                                </select>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" name="accommodation" value="true" className="w-4 h-4 border border-white/20 bg-transparent checked:bg-red-600 rounded-none" />
                                    <label className={cn(mono.className, "text-xs text-white")}>Accommodation</label>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => setIsAddMemberOpen(false)} className={cn(mono.className, "flex-1 border border-white/20 py-3 text-white text-xs hover:bg-white/10 font-bold")}>CANCEL</button>
                                <button type="submit" disabled={isAdding} className={cn(mono.className, "flex-1 bg-red-600 py-3 text-white text-xs font-bold hover:bg-red-700")}>
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

