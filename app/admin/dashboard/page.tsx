import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { getPendingTeams, getConfirmedParticipants } from '@/app/admin/actions'
import AdminDashboardClient from '@/components/AdminDashboardClient'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return redirect('/login')
    }

    const adminEmail = process.env.ADMIN_EMAIL
    if (!adminEmail || user.email !== adminEmail) {
        return redirect('/')
    }

    const pendingTeams = await getPendingTeams()
    const confirmedTeams = await getConfirmedParticipants()

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <AdminDashboardClient teams={pendingTeams} confirmedTeams={confirmedTeams} />
        </div>
    )
}
