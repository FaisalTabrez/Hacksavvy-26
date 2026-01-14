import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { getTeamForUser } from './actions'
import DashboardClient from '@/components/DashboardClient'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return redirect('/login')
    }

    const { team, isLeader } = await getTeamForUser(user.id, user.email || '')

    return (
        <div className="min-h-screen bg-black text-white">
            <DashboardClient team={team} isLeader={isLeader} user={user} />
        </div>
    )
}
