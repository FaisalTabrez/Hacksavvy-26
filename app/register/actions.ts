'use server'

import { createClient } from '@/utils/supabase/server'
import { registrationSchema } from './schema'
import { redirect } from 'next/navigation'
import { sendEmail } from '@/app/actions/email'
import { randomUUID } from 'crypto'

export async function registerTeam(formData: FormData) {
    const supabase = await createClient()

    // 1. Validate Form Data
    const rawData: any = {
        teamName: formData.get('teamName'),
        track: formData.get('track'),
        teamSize: formData.get('teamSize'),
        upiReference: formData.get('upiReference'),
        paymentScreenshot: formData.getAll('paymentScreenshot'), // getAll for file input
        members: [],
    }

    // Parse members from formData
    const members: any[] = []
    const teamSize = parseInt(rawData.teamSize as string)
    for (let i = 0; i < teamSize; i++) {
        members.push({
            name: formData.get(`members.${i}.name`),
            email: formData.get(`members.${i}.email`),
            phone: formData.get(`members.${i}.phone`),
            college: formData.get(`members.${i}.college`),
            rollNo: formData.get(`members.${i}.rollNo`) || undefined,
            branch: formData.get(`members.${i}.branch`) || undefined,
            accommodation: formData.get(`members.${i}.accommodation`) === 'true',
            food: formData.get(`members.${i}.food`),
        })
    }
    rawData.members = members

    // Validate with Zod
    const validatedFields = registrationSchema.safeParse(rawData)

    if (!validatedFields.success) {
        return {
            error: 'Validation failed',
            issues: validatedFields.error.issues,
        }
    }

    const { data } = validatedFields

    // 2. Get User
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'You must be logged in to register.' }
    }

    // Check for duplicate emails
    const emailsToCheck = data.members.map((m: any) => m.email)
    if (emailsToCheck.length > 0) {
        const { data: existingMembers } = await supabase
            .from('members')
            .select('email')
            .in('email', emailsToCheck)

        if (existingMembers && existingMembers.length > 0) {
            return { error: `User ${existingMembers[0].email} is already part of another team.` }
        }
    }

    // 3. Upload Payment Screenshot
    const teamId = randomUUID()
    const file = data.paymentScreenshot[0] as File
    const fileExt = file.name.split('.').pop()
    const fileName = `${teamId}_${Date.now()}.${fileExt}`
    
    const { error: uploadError, data: uploadData } = await supabase.storage
        .from('payments')
        .upload(fileName, file)

    if (uploadError) {
        return { error: 'Failed to upload payment screenshot.' }
    }

    const screenshotUrl = uploadData.path

    // 4. Insert Team
    const { data: teamData, error: teamError } = await supabase
        .from('teams')
        .insert({
            id: teamId,
            name: data.teamName,
            track: data.track,
            size: parseInt(data.teamSize),
            upi_reference: data.upiReference,
            payment_screenshot_url: screenshotUrl,
            user_id: user.id,
        })
        .select()
        .single()

    if (teamError) {
        return { error: 'Failed to create team.' }
    }

    // 5. Insert Members
    const membersToInsert = data.members.map((member, index) => ({
        team_id: teamData.id,
        name: member.name,
        email: member.email,
        phone: member.phone,
        college: member.college,
        // ---------------------------------------------------------
        // MAKE SURE THESE KEYS MATCH YOUR DATABASE COLUMNS EXACTLY
        // ---------------------------------------------------------
        roll_no: member.rollNo,          // Database must have 'roll_no'
        branch: member.branch,           // Database must have 'branch'
        accommodation: member.accommodation,
        food_preference: member.food,    // Database must have 'food_preference'
        is_leader: index === 0,
    }))

    const { error: membersError } = await supabase
        .from('members')
        .insert(membersToInsert)

    if (membersError) {
        console.error("Members Insert Error:", membersError)
        
        // Try to delete the team to clean up
        const { error: deleteError } = await supabase.from('teams').delete().eq('id', teamData.id)
        if (deleteError) console.error("Cleanup Error:", deleteError)

        // RETURN THE ACTUAL DATABASE ERROR SO WE CAN SEE IT
        return { error: `DB Error: ${membersError.message} (Check column names!)` }
    }

    redirect('/dashboard?registered=true')
}
