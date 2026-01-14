'use client'

import { useState } from 'react'
import Link from 'next/link'
import TeamStatus from './TeamStatus'
import RegistrationForm from './RegistrationForm'
import PremiumBackground from './PremiumBackground'

interface DashboardClientProps {
    team: any
    isLeader: boolean
    user: any
}

export default function DashboardClient({ team, isLeader, user }: DashboardClientProps) {
    const [isEditing, setIsEditing] = useState(false)

    if (!team) {
        return (
            <PremiumBackground>
                <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
                    <div className="relative group overflow-hidden rounded-3xl bg-black/40 p-10 shadow-2xl backdrop-blur-md border border-white/5 max-w-lg w-full text-center transition-all duration-500 hover:border-red-500/20 hover:shadow-[0_0_40px_rgba(220,38,38,0.15)]">
                        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-red-600 to-transparent shadow-[0_0_10px_#dc2626]"></div>

                        <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
                            Welcome, <br />
                            <span className="bg-gradient-to-r from-red-500 via-red-300 to-red-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(220,38,38,0.3)]">
                                {user.user_metadata?.full_name || 'Hacker'}
                            </span>!
                        </h2>
                        
                        <p className="text-gray-400 mb-10 leading-relaxed font-light text-lg">
                            You are currently floating in the void. Register your team to materialize into <span className="text-red-400 font-medium">HackSavvy-26</span>.
                        </p>
                        
                        <Link
                            href="/register"
                            className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-white/5 py-5 text-lg font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 border border-white/10 hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-900/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <span className="relative z-10 tracking-widest uppercase text-sm">Initiate Registration</span>
                        </Link>
                    </div>
                </div>
            </PremiumBackground>
        )
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
            <PremiumBackground>
                <div className="max-w-4xl mx-auto py-12 px-4">
                    <div className="flex flex-col items-center mb-12">
                        <h2 className="text-5xl font-black text-white mb-4 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">Edit Protocol</h2>
                        <div className="h-1 w-32 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
                    </div>
                    <div className="backdrop-blur-sm rounded-3xl overflow-hidden">
                        <RegistrationForm
                            initialData={initialData}
                            isEditing={true}
                            teamId={team.id}
                            onCancel={() => setIsEditing(false)}
                        />
                    </div>
                </div>
            </PremiumBackground>
        )
    }

    return (
        <PremiumBackground>
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="mb-12 flex flex-col md:flex-row justify-between items-center bg-black/40 border border-white/10 p-8 rounded-3xl backdrop-blur-md shadow-2xl relative overflow-hidden group">
                     <div className="absolute inset-0 bg-gradient-to-r from-red-900/5 via-transparent to-red-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                     <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-500 via-red-800 to-transparent opacity-50"></div>
                     
                    <div className="relative z-10 mb-6 md:mb-0 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-2 uppercase tracking-tight">Mission Control</h1>
                        <p className="text-gray-400 font-light flex items-center gap-2 justify-center md:justify-start">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Logged in as <span className="text-white font-medium border-b border-red-500/30">{user.email}</span>
                        </p>
                    </div>
                    
                    <form action="/auth/signout" method="post" className="relative z-10">
                        <button className="group relative px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:text-white transition-all font-bold text-xs uppercase tracking-widest overflow-hidden">
                            <div className="absolute inset-0 bg-red-600 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
                            <span className="relative z-10">Terminate Session</span>
                        </button>
                    </form>
                </div>

                <div className="backdrop-blur-sm rounded-3xl">
                     <TeamStatus team={team} isLeader={isLeader} onEdit={() => setIsEditing(true)} />
                </div>
            </div>
        </PremiumBackground>
    )
}
