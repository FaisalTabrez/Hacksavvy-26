'use client'

import { useState } from 'react'
import { verifyTeamPayment, rejectTeamPayment, getConfirmedParticipants } from '@/app/admin/actions'
import PremiumBackground from './PremiumBackground'

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
        <PremiumBackground>
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6">
                <div className="flex justify-between items-center mb-12 bg-white/[0.02] border border-white/5 p-8 rounded-2xl backdrop-blur-md relative overflow-hidden group">
                    <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
                    <div>
                        <h1 className="text-4xl font-extrabold text-white tracking-tight uppercase">Admin <span className="text-red-500">HQ</span></h1>
                        <p className="text-gray-500 font-bold text-xs uppercase tracking-widest mt-2 flex items-center gap-2">
                            <span className="flex w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                            {teams.length} Team verifications pending
                        </p>
                    </div>
                    <button
                        onClick={handleExport}
                        className="relative group overflow-hidden px-6 py-3 rounded-xl bg-white text-gray-900 font-black text-sm uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        Export Roster
                    </button>
                </div>

                {teams.length === 0 ? (
                    <div className="text-gray-500 text-center py-20 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-sm">
                        <div className="text-6xl mb-4 opacity-20">📂</div>
                        <p className="font-bold uppercase tracking-[0.2em] text-sm">All clear! No pending payments.</p>
                    </div>
                ) : (
                    <div className="bg-gray-900/40 rounded-3xl border border-white/5 shadow-2xl overflow-hidden backdrop-blur-xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-separate border-spacing-y-0">
                                <thead>
                                    <tr className="bg-white/[0.03] text-gray-500 text-[10px] uppercase font-black tracking-[0.2em]">
                                        <th className="py-6 px-8">Team Entity</th>
                                        <th className="py-6 px-8 text-center border-x border-white/5">Identity</th>
                                        <th className="py-6 px-8">Reference</th>
                                        <th className="py-6 px-8 text-center border-x border-white/5">Evidence</th>
                                        <th className="py-6 px-8 text-right">Protocol</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-300 divide-y divide-white/5 bg-white/[0.01]">
                                    {teams.map((team) => {
                                        const leader = team.members.find(m => m.is_leader)
                                        return (
                                            <tr key={team.id} className="hover:bg-white/[0.04] transition-all duration-300 group/row">
                                                <td className="py-6 px-8">
                                                    <div className="font-black text-white text-lg uppercase tracking-tight">{team.name}</div>
                                                    <div className="text-xs text-gray-500 mt-1 font-mono uppercase">ID: {team.id.slice(0, 8)}</div>
                                                </td>
                                                <td className="py-6 px-8 border-x border-white/5 text-center">
                                                    {leader ? (
                                                        <div className="flex flex-col items-center">
                                                            <div className="font-bold text-gray-200">{leader.name}</div>
                                                            <div className="text-[10px] text-red-500/60 font-black uppercase tracking-tighter mt-1 italic">{leader.phone}</div>
                                                        </div>
                                                    ) : 'MISSING LEADER'}
                                                </td>
                                                <td className="py-6 px-8">
                                                    <div className="font-mono text-sm group-hover/row:text-white transition-colors tracking-widest">{team.upi_reference}</div>
                                                </td>
                                                <td className="py-6 px-8 border-x border-white/5 text-center">
                                                    <button
                                                        onClick={() => setSelectedScreenshot(getPublicUrl(team.payment_screenshot_url))}
                                                        className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-bold uppercase text-gray-400 hover:text-white hover:bg-white/10 transition-all tracking-wider"
                                                    >
                                                        Review
                                                    </button>
                                                </td>
                                                <td className="py-6 px-8 text-right">
                                                    <div className="flex gap-3 justify-end">
                                                        <button
                                                            onClick={() => handleVerify(team)}
                                                            disabled={processingId === team.id}
                                                            className="px-6 py-2 rounded-xl bg-green-500 text-green-950 font-black text-[10px] uppercase tracking-wider hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                                                        >
                                                            {processingId === team.id ? '...' : 'Verify'}
                                                        </button>
                                                        <button
                                                            onClick={() => handleReject(team.id)}
                                                            disabled={processingId === team.id}
                                                            className="px-6 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 font-black text-[10px] uppercase tracking-wider hover:bg-red-500/20 transition-all disabled:opacity-50"
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
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-8 sm:p-12 animate-in fade-in duration-300" onClick={() => setSelectedScreenshot(null)}>
                        <div className="relative max-w-5xl max-h-full w-full flex items-center justify-center p-4" onClick={e => e.stopPropagation()}>
                            <div className="absolute -inset-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl blur-3xl opacity-20"></div>
                            <img src={selectedScreenshot} alt="Payment Receipt" className="relative z-10 max-h-[85vh] w-auto h-auto object-contain rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10" />
                            <button
                                className="absolute -top-4 -right-4 z-20 bg-white text-gray-900 w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 active:scale-90 transition-all shadow-2xl font-black"
                                onClick={() => setSelectedScreenshot(null)}
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </PremiumBackground>
    )
}
