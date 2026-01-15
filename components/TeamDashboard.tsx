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
        <div className={cn("w-full min-h-screen bg-black relative px-4 md:px-8 py-8 overflow-x-hidden font-mono selection:bg-red-900 selection:text-white", mono.variable)}>
            
            {/* Background Ambient Glow */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-red-900/10 blur-[120px] rounded-full opacity-50" />
            </div>

            {/* --- LOGOUT BUTTON (Fixed Top Right) --- */}
            <button 
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="absolute top-6 right-6 z-50 group flex items-center gap-3 px-5 py-2 border border-red-900/40 bg-black/50 hover:bg-red-950/30 hover:border-red-600 transition-all backdrop-blur-sm"
            >
                <div className="flex gap-1">
                    <span className="w-1 h-1 bg-red-600 rounded-full group-hover:bg-red-400"></span>
                    <span className="w-1 h-1 bg-red-600 rounded-full group-hover:bg-red-400 opacity-50"></span>
                </div>
                <span className="text-[10px] font-bold text-red-500 group-hover:text-red-400 uppercase tracking-widest">
                    {isLoggingOut ? 'EXITING...' : 'LOGOUT'}
                </span>
            </button>

            {/* --- MAIN CONTENT CONTAINER (Centered) --- */}
            <div className="relative z-10 max-w-7xl mx-auto w-full pt-12 md:pt-16">

                {/* 1. OPERATOR INFO (Left Aligned) */}
                <div className="flex flex-col gap-2 mb-16 md:mb-20">
                    <span className="text-[10px] text-red-600/80 font-bold uppercase tracking-[0.2em] border-l-2 border-red-600 pl-3">
                        System Operator
                    </span>
                    <div className="flex items-center gap-3 pl-3">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e] animate-pulse" />
                        <span className="text-sm text-white font-bold tracking-wider uppercase opacity-80">
                            {user.email}
                        </span>
                    </div>
                </div>

                {/* 2. TEAM IDENTITY HERO (Centered) */}
                <div className="flex flex-col items-center text-center mb-28 relative">
                    
                    {/* Decorative Center Line */}
                    <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-900/30 to-transparent -z-10 transform -translate-y-1/2"></div>

                    {/* Active Unit Badge */}
                    <div className="bg-black px-6 py-2 border border-red-900/40 mb-10 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                        <span className="text-[10px] md:text-xs text-red-500 font-bold uppercase tracking-[0.4em]">
                            Active Unit
                        </span>
                    </div>

                    {/* Team Name */}
                    <h1 className={cn(orbitron.className, "text-5xl md:text-7xl lg:text-9xl font-black text-white uppercase tracking-tighter mb-12 drop-shadow-[0_0_30px_rgba(220,38,38,0.15)] leading-[0.9]")}>
                        {team.name}
                    </h1>

                    {/* Stats Bar (Grid Layout) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 w-full max-w-4xl border-y border-white/10 divide-y md:divide-y-0 md:divide-x divide-white/10 bg-white/[0.02] backdrop-blur-sm">
                        
                        <div className="p-6 flex flex-col items-center gap-2 group hover:bg-white/[0.02] transition-colors">
                            <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold group-hover:text-red-500 transition-colors">Operational Track</span>
                            <span className="text-sm md:text-base text-white font-bold tracking-wider uppercase text-center">{team.track}</span>
                        </div>

                        <div className="p-6 flex flex-col items-center gap-2 group hover:bg-white/[0.02] transition-colors">
                            <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold group-hover:text-red-500 transition-colors">Squad Strength</span>
                            <span className="text-sm md:text-base text-white font-bold tracking-wider uppercase">{team.members.length} / {team.size}</span>
                        </div>

                        <div className="p-6 flex flex-col items-center gap-2 group hover:bg-white/[0.02] transition-colors">
                            <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold group-hover:text-red-500 transition-colors">Registration Status</span>
                            <span className={cn("text-sm md:text-base font-bold tracking-wider uppercase px-3 py-0.5 border border-transparent", 
                                team.payment_status === 'verified' ? "text-green-400 bg-green-900/20 border-green-900/50" : 
                                team.payment_status === 'rejected' ? "text-red-400 bg-red-900/20 border-red-900/50" : 
                                "text-yellow-400 bg-yellow-900/20 border-yellow-900/50"
                            )}>
                                {team.payment_status || 'PENDING'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* 3. ROSTER MANIFEST */}
                <div className="w-full">
                    {/* Header Row: Title Left, Buttons Right */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-4 border-b border-red-600/30 gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-2 h-8 bg-red-600"></div>
                            <div>
                                <h2 className={cn(orbitron.className, "text-2xl md:text-3xl text-white font-black uppercase tracking-widest")}>
                                    Roster Manifest
                                </h2>
                                <p className="text-[10px] text-neutral-500 uppercase tracking-[0.3em] mt-1">
                                    Personnel Database // Sector 7
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4 self-end md:self-auto">
                            {isLeader && team.members.length < team.size && (
                                <button
                                    onClick={() => setIsAddMemberOpen(true)}
                                    className="px-6 py-3 border border-red-600/50 bg-red-950/10 hover:bg-red-600 hover:text-white text-red-500 text-[10px] font-bold uppercase tracking-[0.2em] transition-all"
                                >
                                    + Add Agent
                                </button>
                            )}
                            {isLeader && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-6 py-3 border border-white/20 hover:border-white text-neutral-400 hover:text-white text-[10px] font-bold uppercase tracking-[0.2em] transition-all"
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>

                    {/* TABLE: Encased in Red Border */}
                    <div className="border border-red-900/40 bg-black/40 backdrop-blur-sm">
                        
                        {/* Table Header */}
                        <div className="hidden md:grid grid-cols-12 bg-red-950/20 border-b border-red-900/40 text-[10px] text-red-500/80 font-bold uppercase tracking-[0.2em]">
                            <div className="col-span-3 py-5 px-6 border-r border-red-900/30">Operative Name</div>
                            <div className="col-span-2 py-5 px-6 border-r border-red-900/30">Rank</div>
                            <div className="col-span-3 py-5 px-6 border-r border-red-900/30">Phone No:</div>
                            <div className="col-span-2 py-5 px-6 border-r border-red-900/30">Institute</div>
                            <div className="col-span-2 py-5 px-6 text-right">Logistics</div>
                        </div>

                        {/* Table Rows */}
                        <div className="divide-y divide-red-900/20">
                            {team.members.map((member) => (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    key={member.id}
                                    className={cn("group relative flex flex-col md:grid md:grid-cols-12 transition-colors hover:bg-white/[0.02]",
                                        member.is_leader ? "bg-red-900/[0.03]" : ""
                                    )}
                                >
                                    {/* Name */}
                                    <div className="md:col-span-3 p-5 md:px-6 md:py-6 md:border-r border-red-900/30 flex flex-col justify-center">
                                        <span className="text-sm text-white font-bold uppercase tracking-wider group-hover:text-red-100 transition-colors">
                                            {member.name}
                                        </span>
                                        <span className="text-[10px] text-neutral-600 mt-1 tracking-wider font-medium">
                                            {member.email}
                                        </span>
                                    </div>

                                    {/* Rank */}
                                    <div className="md:col-span-2 p-5 md:px-6 md:py-6 md:border-r border-red-900/30 flex items-center">
                                        {member.is_leader ? (
                                            <span className="text-[9px] font-black text-red-500 bg-red-500/10 border border-red-500/20 px-2 py-1 uppercase tracking-widest">
                                                Squad Leader
                                            </span>
                                        ) : (
                                            <span className="text-[9px] font-bold text-neutral-500 border border-neutral-800 px-2 py-1 uppercase tracking-widest">
                                                Operative
                                            </span>
                                        )}
                                    </div>

                                    {/* Phone */}
                                    <div className="md:col-span-3 p-5 md:px-6 md:py-6 md:border-r border-red-900/30 flex items-center gap-3 md:gap-0">
                                        <span className="md:hidden text-[10px] text-neutral-600 uppercase font-bold tracking-widest">Phone:</span>
                                        <span className="text-xs text-neutral-400 font-mono tracking-wider">
                                            {member.phone}
                                        </span>
                                    </div>

                                    {/* Institute */}
                                    <div className="md:col-span-2 p-5 md:px-6 md:py-6 md:border-r border-red-900/30 flex items-center gap-3 md:gap-0">
                                        <span className="md:hidden text-[10px] text-neutral-600 uppercase font-bold tracking-widest">Institute:</span>
                                        <span className="text-xs text-neutral-300 uppercase truncate tracking-wider max-w-[200px]">
                                            {member.college}
                                        </span>
                                    </div>

                                    {/* Logistics */}
                                    <div className="md:col-span-2 p-5 md:px-6 md:py-6 flex flex-row md:flex-col items-center md:items-end md:justify-center gap-4 border-t border-red-900/20 md:border-t-0">
                                        <span className={cn("text-[10px] font-black uppercase tracking-widest", 
                                            member.food_preference === 'Non-Veg' ? "text-red-400" : "text-green-400"
                                        )}>
                                            {member.food_preference}
                                        </span>
                                        {member.accommodation && (
                                            <span className="text-[9px] text-blue-400 bg-blue-900/10 border border-blue-500/30 px-2 py-0.5 uppercase tracking-widest font-bold">
                                                Stay Req
                                            </span>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- ADD MEMBER MODAL (Consistent styling) --- */}
                {isAddMemberOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
                        <div className="w-full max-w-lg bg-black border border-red-900/50 p-8 shadow-[0_0_50px_rgba(220,38,38,0.2)]">
                            <h2 className={cn(orbitron.className, "text-2xl text-white font-black uppercase mb-8")}>
                                Recruit Agent
                            </h2>
                            {addMemberError && (
                                <div className="mb-6 p-4 bg-red-950/30 border border-red-600 text-red-500 text-xs font-bold uppercase tracking-wide">
                                    [ERROR]: {addMemberError}
                                </div>
                            )}
                            <form action={handleAddMember} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] text-red-600 font-bold uppercase tracking-widest">Full Name</label>
                                    <input name="name" required className="w-full bg-transparent border-b border-white/20 py-2 text-white text-sm focus:border-red-600 outline-none uppercase placeholder:text-neutral-800" placeholder="ENTER NAME" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-red-600 font-bold uppercase tracking-widest">Email</label>
                                    <input name="email" type="email" required className="w-full bg-transparent border-b border-white/20 py-2 text-white text-sm focus:border-red-600 outline-none uppercase placeholder:text-neutral-800" placeholder="ENTER EMAIL" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-red-600 font-bold uppercase tracking-widest">Phone</label>
                                        <input name="phone" required className="w-full bg-transparent border-b border-white/20 py-2 text-white text-sm focus:border-red-600 outline-none uppercase" placeholder="+91..." />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-red-600 font-bold uppercase tracking-widest">Branch</label>
                                        <input name="branch" className="w-full bg-transparent border-b border-white/20 py-2 text-white text-sm focus:border-red-600 outline-none uppercase" placeholder="DEPT" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-red-600 font-bold uppercase tracking-widest">Institute</label>
                                    <input name="college" required className="w-full bg-transparent border-b border-white/20 py-2 text-white text-sm focus:border-red-600 outline-none uppercase" placeholder="INSTITUTE NAME" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-red-600 font-bold uppercase tracking-widest">Roll No</label>
                                    <input name="rollNo" className="w-full bg-transparent border-b border-white/20 py-2 text-white text-sm focus:border-red-600 outline-none uppercase" placeholder="ID" />
                                </div>
                                <div className="grid grid-cols-2 gap-6 pt-4">
                                    <select name="food" className="w-full bg-black border border-white/20 p-3 text-white text-sm focus:border-red-600 outline-none uppercase cursor-pointer">
                                        <option value="Veg">Veg</option>
                                        <option value="Non-Veg">Non-Veg</option>
                                    </select>
                                    <div className="flex items-center gap-3">
                                        <input type="checkbox" name="accommodation" value="true" className="w-5 h-5 border border-white/20 bg-transparent checked:bg-red-600 cursor-pointer" />
                                        <label className="text-xs text-white font-bold uppercase tracking-widest">Accommodation</label>
                                    </div>
                                </div>
                                <div className="flex gap-4 pt-6">
                                    <button type="button" onClick={() => setIsAddMemberOpen(false)} className="flex-1 border border-white/20 py-3 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10">Abort</button>
                                    <button type="submit" disabled={isAdding} className="flex-1 bg-red-600 py-3 text-white text-xs font-bold uppercase tracking-widest hover:bg-red-700 shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                                        {isAdding ? 'Processing...' : 'Confirm'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}