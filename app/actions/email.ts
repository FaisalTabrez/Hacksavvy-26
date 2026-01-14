'use server'

import { sendEmail as sendEmailUtil, compileWelcomeEmail, compileConfirmationEmail } from '@/utils/mail'

interface EmailPayload {
    to: string
    subject: string
    type: 'Registration' | 'Confirmation'
    data: any
}

export async function sendEmail({ to, subject, type, data }: EmailPayload) {
    let html = ''

    if (type === 'Registration') {
        html = compileWelcomeEmail(data.teamName, data.members)
    } else if (type === 'Confirmation') {
        html = compileConfirmationEmail(data.teamName, data.leaderName)
    }

    return await sendEmailUtil({
        to,
        subject,
        html,
    })
}
