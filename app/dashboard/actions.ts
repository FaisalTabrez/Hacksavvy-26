'use server'

import { createClient } from '@/utils/supabase/server'
import { registrationSchema } from '@/app/register/schema'
import { revalidatePath } from 'next/cache'

export async function getTeamForUser(userId: string, userEmail: string) {
    const supabase = await createClient()

    // 1. Check if user is a leader
    const { data: leaderTeam, error: leaderError } = await supabase
        .from('teams')
        .select('*, members(*)')
        .eq('user_id', userId)
        .single()

    if (leaderTeam) {
        return { team: leaderTeam, isLeader: true }
    }

    // 2. Check if user is a member
    const { data: memberRecord, error: memberError } = await supabase
        .from('members')
        .select('team_id')
        .eq('email', userEmail)
        .single()

    if (memberRecord) {
        const { data: memberTeam, error: teamError } = await supabase
            .from('teams')
            .select('*, members(*)')
            .eq('id', memberRecord.team_id)
            .single()

        if (memberTeam) {
            return { team: memberTeam, isLeader: false }
        }
    }

    return { team: null, isLeader: false }
}

export async function updateTeamDetails(formData: FormData, teamId: string) {
    const supabase = await createClient()

    // We only allow updating members for now, based on the requirements
    // "disable the 'Team Name' and 'Payment' fields (only allow editing member details)"

    // Extract members data
    const members = []
    // We need to know how many members to look for. 
    // In a real scenario, we might pass this or parse it more dynamically.
    // For now, let's assume we iterate until we don't find a name, or pass a count.
    // Actually, the form sends `members.0.name` etc.

    // A robust way is to parse everything similar to registerTeam
    // But since we are reusing the form, the structure is the same.

    // Let's re-use the schema validation but we might need to be careful about 
    // fields that are disabled/not sent.

    // However, for "Edit Details", usually we want to update the DB.
    // Since the requirement is specific about what to edit, let's focus on members.

    // For simplicity, let's grab all potential members (up to 5)
    for (let i = 0; i < 5; i++) {
        if (formData.has(`members.${i}.name`)) {
            members.push({
                name: formData.get(`members.${i}.name`),
                email: formData.get(`members.${i}.email`),
                phone: formData.get(`members.${i}.phone`),
                college: formData.get(`members.${i}.college`),
                rollNo: formData.get(`members.${i}.rollNo`) || null,
                branch: formData.get(`members.${i}.branch`) || null,
                accommodation: formData.get(`members.${i}.accommodation`) === 'true',
                food: formData.get(`members.${i}.food`),
            })
        }
    }

    // We need to update existing members or insert new ones?
    // The simplest approach for this "Edit" feature without complex diffing:
    // 1. Delete existing members for this team
    // 2. Insert new members
    // BUT we need to preserve IDs if possible, or just replace them.
    // Replacing is easier but changes IDs. Let's assume replacing is fine for this hackathon context.
    // actually, we should check if the user is the leader to allow editing.

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    // Verify ownership
    const { data: team } = await supabase.from('teams').select('user_id').eq('id', teamId).single()
    if (!team || team.user_id !== user.id) {
        return { error: 'Only the team leader can edit details.' }
    }

    // Delete old members
    const { error: deleteError } = await supabase
        .from('members')
        .delete()
        .eq('team_id', teamId)

    if (deleteError) return { error: 'Failed to update members (delete phase)' }

    // Update team details (Track and Size only, Name is read-only)
    const { error: teamUpdateError } = await supabase
        .from('teams')
        .update({
            track: formData.get('track'),
            size: parseInt(formData.get('teamSize') as string)
        })
        .eq('id', teamId)

    if (teamUpdateError) return { error: 'Failed to update team details' }

    // Insert new members
    const membersToInsert = members.map((member, index) => ({
        team_id: teamId,
        name: member.name,
        email: member.email,
        phone: member.phone,
        college: member.college,
        roll_no: member.rollNo,
        branch: member.branch,
        accommodation: member.accommodation,
        food_preference: member.food,
        is_leader: index === 0, // Assuming first one is still leader
    }))

    const { error: insertError } = await supabase
        .from('members')
        .insert(membersToInsert)

    if (insertError) return { error: 'Failed to update members (insert phase)' }

    revalidatePath('/dashboard')
    return { success: true }
}
