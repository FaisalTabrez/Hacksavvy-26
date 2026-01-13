'use server'

import { Resend } from 'resend'

interface EmailPayload {
    to: string
    subject: string
    type: 'Registration' | 'Confirmation'
    data: any
}

export async function sendEmail({ to, subject, type, data }: EmailPayload) {
    if (!process.env.RESEND_API_KEY) {
        console.error('RESEND_API_KEY is not set')
        return { error: 'Email service not configured' }
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    let html = ''

    if (type === 'Registration') {
        const membersList = data.members.map((m: any) => `<li>${m.name} (${m.email}) - ${m.is_leader ? 'Leader' : 'Member'}</li>`).join('')
        html = `
      <h1>Registration Received</h1>
      <p>Hello ${data.leaderName},</p>
      <p>Your team <strong>${data.teamName}</strong> has been registered successfully.</p>
      <p><strong>Payment Status: Verification Pending</strong></p>
      <p>We will notify you once your payment is verified.</p>
      <h3>Team Members:</h3>
      <ul>${membersList}</ul>
    `
    } else if (type === 'Confirmation') {
        html = `
      <h1>Payment Verified!</h1>
      <p>Hello ${data.leaderName},</p>
      <p>Your payment for team <strong>${data.teamName}</strong> has been verified.</p>
      <p>We look forward to seeing you at the event!</p>
    `
    }

    try {
        const { data: emailData, error } = await resend.emails.send({
            from: 'HackSavvy <onboarding@resend.dev>', // Using default test domain, user should configure this
            to: [to],
            subject: subject,
            html: html,
        })

        if (error) {
            console.error('Resend error:', error)
            return { error: error.message }
        }

        return { success: true, data: emailData }
    } catch (error) {
        console.error('Email sending failed:', error)
        return { error: 'Failed to send email' }
    }
}
