'use client'

import PremiumBackground from './PremiumBackground'
import EmptyState from './EmptyState'
import TeamDashboard from './TeamDashboard'

interface DashboardClientProps {
    team: any
    isLeader: boolean
    user: any
}

export default function DashboardClient({ team, isLeader, user }: DashboardClientProps) {

    if (!team) {
        return (
            <PremiumBackground>
                <EmptyState user={user} />
            </PremiumBackground>
        )
    }

    return (
        <PremiumBackground>
            <TeamDashboard team={team} user={user} isLeader={isLeader} />
        </PremiumBackground>
    )
}
