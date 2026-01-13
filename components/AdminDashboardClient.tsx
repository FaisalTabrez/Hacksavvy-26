'use client'

import { useState } from 'react'
import { verifyTeamPayment, rejectTeamPayment, getConfirmedParticipants } from '@/app/admin/actions'

interface Member {
    id: string
    name: string
    email: string
    phone: string
    is_leader: boolean
}

interface Team {
    id: string
    name: string
    upi_reference: string
    payment_screenshot_url: string
    members: Member[]
}

interface AdminDashboardClientProps {
    teams: Team[]
}

export default function AdminDashboardClient({ teams: initialTeams }: AdminDashboardClientProps) {
    const [teams, setTeams] = useState(initialTeams)
    const [processingId, setProcessingId] = useState<string | null>(null)
    const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null)

    const handleVerify = async (team: Team) => {
        if (!confirm(`Are you sure you want to verify payment for ${team.name}?`)) return

        setProcessingId(team.id)
        const leader = team.members.find(m => m.is_leader)

        if (!leader) {
            alert('Team has no leader!')
            setProcessingId(null)
            return
        }

        const result = await verifyTeamPayment(team.id, team.name, leader.email, leader.name)

        if (result.success) {
            setTeams(teams.filter(t => t.id !== team.id))
        } else {
            alert('Failed to verify: ' + result.error)
        }
        setProcessingId(null)
    }

    const handleReject = async (teamId: string) => {
        if (!confirm('Are you sure you want to reject this payment?')) return

        setProcessingId(teamId)
        const result = await rejectTeamPayment(teamId)

        if (result.success) {
            setTeams(teams.filter(t => t.id !== teamId))
        } else {
            alert('Failed to reject: ' + result.error)
        }
        setProcessingId(null)
    }

    const handleExport = async () => {
        const confirmedTeams = await getConfirmedParticipants()
        if (!confirmedTeams || confirmedTeams.length === 0) {
            alert('No confirmed participants found.')
            return
        }

        const csvRows = [
            ['Team Name', 'Leader Name', 'Leader Phone', 'Member Name', 'Food Pref', 'Accommodation']
        ]

        confirmedTeams.forEach((team: any) => {
            const leader = team.members.find((m: any) => m.is_leader)
            team.members.forEach((member: any) => {
                csvRows.push([
                    team.name,
                    leader?.name || 'N/A',
                    leader?.phone || 'N/A',
                    member.name,
                    member.food,
                    member.accommodation ? 'Yes' : 'No'
                ])
            })
        })

        const csvContent = csvRows.map(e => e.join(",")).join("\n")
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.setAttribute("href", url)
        link.setAttribute("download", "hacksavvy-participants.csv")
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const getPublicUrl = (path: string) => {
        return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/payments/${path}`
    }

    return (
        <div className="max-w-7xl mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Admin Dashboard - Pending Payments</h1>
                <button
                    onClick={handleExport}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    Export Data
                </button>
            </div>

            {teams.length === 0 ? (
                <div className="text-gray-400 text-center py-12 bg-gray-800 rounded-lg">
                    No pending payments found.
                </div>
            ) : (
                <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-700 text-gray-300 text-sm uppercase">
                                    <th className="py-4 px-6">Team Name</th>
                                    <th className="py-4 px-6">Leader</th>
                                    <th className="py-4 px-6">Phone</th>
                                    <th className="py-4 px-6">Ref ID</th>
                                    <th className="py-4 px-6">Screenshot</th>
                                    <th className="py-4 px-6">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-300 divide-y divide-gray-700">
                                {teams.map((team) => {
                                    const leader = team.members.find(m => m.is_leader)
                                    return (
                                        <tr key={team.id} className="hover:bg-gray-700/50">
                                            <td className="py-4 px-6 font-medium text-white">{team.name}</td>
                                            <td className="py-4 px-6">
                                                {leader ? (
                                                    <div>
                                                        <div className="font-medium text-white">{leader.name}</div>
                                                        <div className="text-xs text-gray-500">{leader.email}</div>
                                                    </div>
                                                ) : 'N/A'}
                                            </td>
                                            <td className="py-4 px-6">{leader?.phone || 'N/A'}</td>
                                            <td className="py-4 px-6 font-mono text-sm">{team.upi_reference}</td>
                                            <td className="py-4 px-6">
                                                <button
                                                    onClick={() => setSelectedScreenshot(getPublicUrl(team.payment_screenshot_url))}
                                                    className="text-blue-400 hover:text-blue-300 text-sm underline"
                                                >
                                                    View
                                                </button>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleVerify(team)}
                                                        disabled={processingId === team.id}
                                                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
                                                    >
                                                        {processingId === team.id ? '...' : 'Verify'}
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(team.id)}
                                                        disabled={processingId === team.id}
                                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Screenshot Modal */}
            {selectedScreenshot && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setSelectedScreenshot(null)}>
                    <div className="relative max-w-4xl max-h-[90vh] w-full">
                        <img src={selectedScreenshot} alt="Payment Screenshot" className="w-full h-full object-contain rounded-lg" />
                        <button
                            className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                            onClick={() => setSelectedScreenshot(null)}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
