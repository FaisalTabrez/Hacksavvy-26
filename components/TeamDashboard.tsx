'use client'

import React, { useState } from 'react'
import RegistrationForm from './RegistrationForm'

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
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="mb-12 relative overflow-hidden rounded-3xl border border-white/10 bg-black/60 shadow-2xl backdrop-blur-xl">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent shadow-[0_0_15px_#dc2626] opacity-70"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-red-900/10 via-transparent to-transparent opacity-50"></div>
                
                <div className="relative z-10 px-8 py-10 flex flex-col md:flex-row justify-between items-center gap-8">
                    {/* Title & User Info */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h1 className="text-5xl md:text-6xl font-black text-white mb-3 uppercase tracking-tighter drop-shadow-[0_0_20px_rgba(220,38,38,0.5)] font-[family-name:var(--font-orbitron)]">
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

            {/* Team Status Card */}
            <div className="relative group overflow-hidden rounded-3xl bg-black/60 shadow-2xl backdrop-blur-xl border border-white/10 transition-all duration-300 hover:border-red-500/30 hover:shadow-[0_0_50px_rgba(220,38,38,0.1)]">
                {/* Top accent line */}
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-red-600 to-transparent shadow-[0_0_10px_#dc2626]"></div>

                <div className="p-8 border-b border-white/10 flex justify-between items-center flex-wrap gap-6 bg-gradient-to-r from-red-900/10 to-transparent">
                    <div>
                        <h2 className="text-3xl font-extrabold text-white mb-3 tracking-tight">{team.name}</h2>
                        <div className="flex flex-wrap gap-3">
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

                    {isLeader && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all text-xs font-bold uppercase tracking-wider border border-white/10 hover:border-white/20"
                        >
                            Edit Team Profile
                        </button>
                    )}
                </div>

                <div className="p-8 bg-black/20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-4 w-1 bg-red-500 rounded-full"></div>
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Roster</h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-separate border-spacing-y-3">
                            <thead>
                                <tr className="text-gray-500 text-[10px] uppercase font-black tracking-[0.2em]">
                                    <th className="pb-2 px-4">Hacker</th>
                                    <th className="pb-2 px-4 text-center">Identity</th>
                                    <th className="pb-2 px-4">Contact Gateway</th>
                                    <th className="pb-2 px-4">Academy</th>
                                    <th className="pb-2 px-4 text-center">Logistics</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {team.members.map((member) => (
                                    <tr key={member.id} className="bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                                        <td className="py-4 px-4 rounded-l-xl border-y border-l border-white/5">
                                            <div className="font-bold text-white mb-0.5">{member.name}</div>
                                            <div className="text-xs text-gray-500">{member.email}</div>
                                        </td>
                                        <td className="py-4 px-4 border-y border-white/5 text-center">
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
                                        <td className="py-4 px-4 rounded-r-xl border-y border-r border-white/5 text-center">
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
        </div>
    )
}
