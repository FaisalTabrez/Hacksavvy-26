'use client'

import { useState } from 'react'
import Link from 'next/link'
import TeamStatus from './TeamStatus'
import RegistrationForm from './RegistrationForm'

interface DashboardClientProps {
    team: any
    isLeader: boolean
    user: any
}

export default function DashboardClient({ team, isLeader, user }: DashboardClientProps) {
    const [isEditing, setIsEditing] = useState(false)

    if (!team) {
        return (
            <div className="flex flex-col items-center justify-center py-12 px-4">
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Welcome, {user.user_metadata?.full_name || 'Hacker'}!</h2>
                    <p className="text-gray-400 mb-8">
                        You are not part of any team yet. Register your team to participate in HackSavvy-26.
                    </p>
                    <Link
                        href="/register"
                        className="inline-block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.01]"
                    >
                        Register Team
                    </Link>
                </div>
            </div>
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
            <div className="max-w-4xl mx-auto py-8 px-4">
                <h2 className="text-3xl font-bold text-white mb-6">Edit Team Details</h2>
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
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                    <p className="text-gray-400">Welcome back, {user.email}</p>
                </div>
                <form action="/auth/signout" method="post">
                    <button className="text-sm text-red-400 hover:text-red-300 underline">
                        Sign Out
                    </button>
                </form>
            </div>

            <TeamStatus team={team} isLeader={isLeader} onEdit={() => setIsEditing(true)} />
        </div>
    )
}
