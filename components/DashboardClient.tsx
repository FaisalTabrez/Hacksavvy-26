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

    // If NO team, show the Full Screen Void Interface
    if (!team) {
        return (
            <PremiumBackground>
                <EmptyState user={user} />
            </PremiumBackground>
        )
    }

    // If HAS team, show the Dashboard (We will redesign this next)
    return (
        <PremiumBackground>
            <div className="min-h-screen w-full"> 
                <TeamDashboard team={team} user={user} isLeader={isLeader} />
            </div>
        </PremiumBackground>
    )
}
