'use client'

import React, { useState } from 'react'
import RegistrationForm from './RegistrationForm'
import { addMemberToTeam } from '../app/dashboard/actions'

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

    async function handleAddMember(formData: FormData) {
        setIsAdding(true)
        setAddMemberError('')
        
        const res = await addMemberToTeam(formData, team.id)
        
        setIsAdding(false)
        if (res?.error) {
            setAddMemberError(res.error)
        } else {
            setIsAddMemberOpen(false)
        }
    }

    if (isEditing) {
         // Prepare initial data for the form
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
            <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-4xl flex flex-col items-center">
                    <div className="text-center mb-16 w-full max-w-2xl">
                        <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-white via-red-200 to-red-600 bg-clip-text text-transparent tracking-tighter drop-shadow-[0_0_20px_rgba(220,38,38,0.4)] mb-6 font-[family-name:var(--font-orbitron)] uppercase">
                            Edit Protocol
                        </h2>
                        <div className="mx-auto h-1.5 w-40 bg-gradient-to-r from-transparent via-red-600 to-transparent rounded-full shadow-[0_0_15px_#dc2626] mb-8"></div>
                    </div>
                    
                    <div className="w-full backdrop-blur-sm rounded-3xl overflow-hidden">
                        <RegistrationForm
                            initialData={initialData}
                            isEditing={true}
                            teamId={team.id}
                            onCancel={() => setIsEditing(false)}
                        />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative">
            {/* Header Section */}
            <div className="mb-12 relative overflow-hidden rounded-3xl border border-white/10 bg-black/60 shadow-2xl backdrop-blur-xl">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent shadow-[0_0_15px_#dc2626] opacity-70"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-red-900/10 via-transparent to-transparent opacity-50"></div>
                
                <div className="relative z-10 px-8 py-10 flex flex-col justify-center items-center gap-8 text-center">
                    {/* Title & User Info */}
                    <div className="flex flex-col items-center">
                        <h1 className="text-6xl md:text-8xl font-black text-white mb-3 uppercase tracking-tighter drop-shadow-[0_0_20px_rgba(220,38,38,0.5)] font-[family-name:var(--font-orbitron)]">
                            Mission Control
                        </h1>
                        <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
                            <div className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 shadow-[0_0_8px_#22c55e]"></span>
                            </div>
                            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                                Operator: <span className="text-white ml-1">{user.email}</span>
                            </span>
                        </div>
                    </div>
                    
                    {/* Actions */}
                    <form action="/auth/signout" method="post">
                        <button className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-red-600/10 px-6 py-3 border border-red-500/30 transition-all duration-300 hover:bg-red-600 hover:border-red-500 hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]">
                            <span className="relative z-10 text-xs font-black uppercase tracking-[0.2em] text-red-500 transition-colors group-hover:text-white">
                                Terminate Session
                            </span>
                        </button>
                    </form>
                </div>
            </div>

            {/* Verified Status - Community Links */}
            {team.payment_status === 'verified' && (
                <div className="mb-8 relative overflow-hidden rounded-3xl border border-green-500/30 bg-green-900/10 shadow-[0_0_30px_rgba(34,197,94,0.1)] backdrop-blur-xl p-8 group text-center">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent shadow-[0_0_15px_#22c55e] opacity-70"></div>
                    <div className="flex flex-col items-center justify-center gap-6">
                        <div className="flex flex-col items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center text-2xl animate-pulse">
                                🚀
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-white uppercase tracking-tight font-[family-name:var(--font-orbitron)]">
                                    Registration Verified
                                </h3>
                                <p className="text-green-200/70 text-sm font-bold tracking-wide mt-1">
                                    Welcome to HackSavvy. Join our comms channels immediately.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a 
                                href="#" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-black text-xs uppercase tracking-wider transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(88,101,242,0.4)] flex items-center gap-2"
                            >
                                <span>Discord</span>
                            </a>
                            <a 
                                href="#" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-xs uppercase tracking-wider transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] flex items-center gap-2"
                            >
                                <span>WhatsApp</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* Team Status Card */}
            <div className="relative group overflow-hidden rounded-3xl bg-black/60 shadow-2xl backdrop-blur-xl border border-white/10 transition-all duration-300 hover:border-red-500/30 hover:shadow-[0_0_50px_rgba(220,38,38,0.1)]">
                {/* Top accent line */}
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-red-600 to-transparent shadow-[0_0_10px_#dc2626]"></div>

                <div className="p-8 border-b border-white/10 flex flex-col justify-center items-center gap-6 bg-gradient-to-r from-red-900/10 to-transparent text-center">
                    <div className="flex flex-col items-center">
                        <h2 className="text-2xl font-extrabold text-white mb-3 tracking-tight">{team.name}</h2>
                        <div className="flex flex-wrap justify-center gap-3">
                            <span className="bg-red-500/10 text-red-500 px-4 py-1.5 rounded-full border border-red-500/20 text-xs font-bold uppercase tracking-widest">
                                {team.track}
                            </span>
                            <span className="bg-white/5 text-gray-400 px-4 py-1.5 rounded-full border border-white/10 text-xs font-bold uppercase tracking-widest">
                                {team.members.length} Members
                            </span>
                             <span className={`px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest animate-pulse ${
                                team.payment_status === 'verified' 
                                    ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                                    : team.payment_status === 'rejected'
                                        ? 'bg-red-500/10 text-red-500 border-red-500/20'
                                        : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                            }`}>
                                Payment: {team.payment_status || 'Pending'}
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-center gap-3">
                        {isLeader && team.members.length < 5 && (
                             <button
                                onClick={() => setIsAddMemberOpen(true)}
                                className="px-6 py-2.5 rounded-xl bg-red-600 text-white transition-all text-xs font-bold uppercase tracking-wider border border-red-500 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)]"
                            >
                                Add Member
                            </button>
                        )}
                        {isLeader && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all text-xs font-bold uppercase tracking-wider border border-white/10 hover:border-white/20"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>

                <div className="p-8 bg-black/20">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="h-4 w-1 bg-red-500 rounded-full"></div>
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Roster</h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-center border-separate border-spacing-y-3">
                            <thead>
                                <tr className="text-gray-500 text-[10px] uppercase font-black tracking-[0.2em]">
                                    <th className="pb-2 px-4 text-center">Hacker</th>
                                    <th className="pb-2 px-4 text-center">Identity</th>
                                    <th className="pb-2 px-4 text-center">Contact Gateway</th>
                                    <th className="pb-2 px-4 text-center">Academy</th>
                                    <th className="pb-2 px-4 text-center">Logistics</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {team.members.map((member) => (
                                    <tr key={member.id} className="bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                                        <td className="py-4 px-4 rounded-l-xl border-y border-l border-white/5">
                                            <div className="flex flex-col items-center">
                                                <div className="font-bold text-white mb-0.5">{member.name}</div>
                                                <div className="text-xs text-gray-500">{member.email}</div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 border-y border-white/5">
                                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${
                                                member.is_leader 
                                                    ? 'bg-red-500/10 text-red-500 border border-red-500/20' 
                                                    : 'bg-white/5 text-gray-400 border border-white/10'
                                            }`}>
                                                {member.is_leader ? 'LEADER' : 'MEMBER'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 border-y border-white/5 text-gray-300 font-mono text-xs">
                                            {member.phone}
                                        </td>
                                        <td className="py-4 px-4 border-y border-white/5 text-gray-300">
                                            {member.college}
                                        </td>
                                        <td className="py-4 px-4 rounded-r-xl border-y border-r border-white/5">
                                            <div className="flex flex-col gap-1 items-center">
                                                <span className={`text-[10px] uppercase font-bold ${member.food_preference === 'Non-Veg' ? 'text-red-400' : 'text-green-400'}`}>
                                                    {member.food_preference}
                                                </span>
                                                {member.accommodation && (
                                                    <span className="text-[10px] uppercase font-bold text-blue-400 bg-blue-400/10 px-1.5 py-0.5 rounded">
                                                        STAY
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add Member Modal */}
            {isAddMemberOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsAddMemberOpen(false)}></div>
                    <div className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                         <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent shadow-[0_0_15px_#dc2626]"></div>
                         
                         <div className="p-8">
                            <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tighter font-[family-name:var(--font-orbitron)]">
                                Recruit New Agent
                            </h2>
                            
                            {addMemberError && (
                                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-bold">
                                    {addMemberError}
                                </div>
                            )}

                            <form action={handleAddMember} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Identify</label>
                                        <input name="name" required placeholder="Full Name" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-colors" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Comms</label>
                                        <input name="email" type="email" required placeholder="Email Address" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-colors" />
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Signal</label>
                                        <input name="phone" required placeholder="Phone Number" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-colors" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Sector</label>
                                        <select name="branch" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-colors [&>option]:bg-zinc-900">
                                            <option value="">Select Branch</option>
                                            <option value="CSE">CSE</option>
                                            <option value="IT">IT</option>
                                            <option value="ECE">ECE</option>
                                            <option value="EEE">EEE</option>
                                            <option value="MECH">MECH</option>
                                            <option value="CIVIL">CIVIL</option>
                                            <option value="OTHER">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                     <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Affiliation</label>
                                        <input name="college" required placeholder="College / Institute" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-colors" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">ID Code</label>
                                        <input name="rollNo" placeholder="Roll Number" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-colors" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                     <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Rations</label>
                                        <select name="food" required className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-colors [&>option]:bg-zinc-900">
                                            <option value="Veg">Vegetarian</option>
                                            <option value="Non-Veg">Non-Vegetarian</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center gap-3 pt-6">
                                        <input type="checkbox" name="accommodation" value="true" id="accommodation" className="w-5 h-5 rounded border-white/10 bg-black/20 checked:bg-red-600 checked:border-red-600 focus:ring-red-500" />
                                        <label htmlFor="accommodation" className="text-sm text-gray-300 font-bold select-none cursor-pointer">Require Accommodation</label>
                                    </div>
                                </div>

                                <div className="pt-6 flex gap-3">
                                    <button 
                                        type="button" 
                                        onClick={() => setIsAddMemberOpen(false)}
                                        className="flex-1 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all text-xs font-bold uppercase tracking-wider border border-white/10"
                                    >
                                        Abort
                                    </button>
                                    <button 
                                        type="submit" 
                                        disabled={isAdding}
                                        className="flex-1 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white transition-all text-xs font-bold uppercase tracking-wider border border-red-500 shadow-[0_0_20px_rgba(220,38,38,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isAdding ? 'Processing...' : 'Recruit Agent'}
                                    </button>
                                </div>
                            </form>
                         </div>
                    </div>
                </div>
            )}
        </div>
    )
}

