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
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-700 flex justify-between items-center flex-wrap gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-1">{team.name}</h2>
                    <div className="flex gap-3 text-sm">
                        <span className="bg-blue-900/50 text-blue-200 px-3 py-1 rounded-full border border-blue-500/30">
                            {team.track}
                        </span>
                        <span className="bg-yellow-900/50 text-yellow-200 px-3 py-1 rounded-full border border-yellow-500/30">
                            Payment Pending
                        </span>
                    </div>
                </div>

                {isLeader && (
                    <button
                        onClick={onEdit}
                        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium"
                    >
                        Edit Details
                    </button>
                )}
            </div>

            <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-300 mb-4">Team Members</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-700 text-gray-400 text-sm">
                                <th className="py-3 px-4">Name</th>
                                <th className="py-3 px-4">Role</th>
                                <th className="py-3 px-4">Email</th>
                                <th className="py-3 px-4">Phone</th>
                                <th className="py-3 px-4">College</th>
                                <th className="py-3 px-4">Food</th>
                                <th className="py-3 px-4">Accomm.</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-300 text-sm">
                            {team.members.map((member) => (
                                <tr key={member.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                                    <td className="py-3 px-4 font-medium text-white">{member.name}</td>
                                    <td className="py-3 px-4">
                                        {member.is_leader ? (
                                            <span className="text-blue-400 font-semibold">Leader</span>
                                        ) : (
                                            'Member'
                                        )}
                                    </td>
                                    <td className="py-3 px-4">{member.email}</td>
                                    <td className="py-3 px-4">{member.phone}</td>
                                    <td className="py-3 px-4">{member.college}</td>
                                    <td className="py-3 px-4">{member.food_preference}</td>
                                    <td className="py-3 px-4">
                                        {member.accommodation ? (
                                            <span className="text-green-400">Yes</span>
                                        ) : (
                                            <span className="text-gray-500">No</span>
                                        )}
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
