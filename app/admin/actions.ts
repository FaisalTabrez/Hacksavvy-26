'use server'

import { createClient } from '@/utils/supabase/server'
import { sendEmail } from '@/app/actions/email'
import { revalidatePath } from 'next/cache'

export async function getPendingTeams() {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('teams')
        .select('*, members(*)')
        .eq('payment_status', 'pending')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching pending teams:', error)
        return []
    }
    return data
}

export async function getConfirmedParticipants() {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('teams')
        .select('*, members(*)')
        .eq('payment_status', 'verified')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching confirmed participants:', error)
        return []
    }
    return data
}

export async function verifyTeamPayment(teamId: string, teamName: string, leaderEmail: string, leaderName: string) {
    const supabase = await createClient()
    const { error } = await supabase
        .from('teams')
        .update({ payment_status: 'verified' })
        .eq('id', teamId)

    if (error) return { error: error.message }

    // Send confirmation email
    await sendEmail({
        to: leaderEmail,
        subject: 'HackSavvy Registration Confirmed',
        type: 'Confirmation',
        data: { teamName, leaderName }
    })

    revalidatePath('/admin/dashboard')
    return { success: true }
}

export async function rejectTeamPayment(teamId: string) {
    const supabase = await createClient()
    const { error } = await supabase
        .from('teams')
        .update({ payment_status: 'rejected' })
        .eq('id', teamId)

    if (error) return { error: error.message }

    revalidatePath('/admin/dashboard')
    return { success: true }
}
