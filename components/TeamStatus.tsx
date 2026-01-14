'use client'

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
    payment_status?: string // Assuming we might add this later, or derive it
    members: Member[]
}

interface TeamStatusProps {
    team: Team
    isLeader: boolean
    onEdit: () => void
}

export default function TeamStatus({ team, isLeader, onEdit }: TeamStatusProps) {
    return (
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
                        <span className="bg-yellow-500/10 text-yellow-500 px-4 py-1.5 rounded-full border border-yellow-500/20 text-xs font-bold uppercase tracking-widest animate-pulse">
                            Verification Pending
                        </span>
                    </div>
                </div>

                {isLeader && (
                    <button
                        onClick={onEdit}
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
                                <tr key={member.id} className="group/row bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300">
                                    <td className="py-4 px-4 rounded-l-xl border-y border-l border-white/5 group-hover/row:border-red-500/20">
                                        <div className="font-bold text-white">{member.name}</div>
                                        <div className="text-[10px] text-gray-500 mt-0.5">{member.email}</div>
                                    </td>
                                    <td className="py-4 px-4 border-y border-white/5 group-hover/row:border-red-500/20 text-center">
                                        {member.is_leader ? (
                                            <span className="px-2 py-1 rounded bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-tighter border border-red-500/20 italic">Leader</span>
                                        ) : (
                                            <span className="px-2 py-1 rounded bg-white/5 text-gray-500 text-[10px] font-black uppercase tracking-tighter border border-white/10">Member</span>
                                        )}
                                    </td>
                                    <td className="py-4 px-4 border-y border-white/5 group-hover/row:border-red-500/20">
                                        <div className="text-xs text-gray-400">{member.phone}</div>
                                    </td>
                                    <td className="py-4 px-4 border-y border-white/5 group-hover/row:border-red-500/20">
                                        <div className="text-xs text-gray-400 truncate max-w-[150px]">{member.college}</div>
                                    </td>
                                    <td className="py-4 px-4 rounded-r-xl border-y border-r border-white/5 group-hover/row:border-red-500/20 text-center">
                                        <div className="flex flex-col gap-1 items-center">
                                            <span className={`text-[10px] font-bold ${member.food_preference === 'Veg' ? 'text-green-500/60' : 'text-red-500/60'}`}>{member.food_preference}</span>
                                            {member.accommodation && <span className="text-[8px] bg-blue-500/10 text-blue-400 px-1 rounded border border-blue-500/20 uppercase">Stay</span>}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
