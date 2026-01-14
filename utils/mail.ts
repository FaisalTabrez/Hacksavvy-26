import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});

interface EmailPayload {
    to: string;
    subject: string;
    html: string;
}

export async function sendEmail({ to, subject, html }: EmailPayload) {
    if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
        console.error('SMTP_EMAIL or SMTP_PASSWORD is not set');
        return { error: 'Email service not configured' };
    }

    try {
        const info = await transporter.sendMail({
            from: `"HackSavvy" <${process.env.SMTP_EMAIL}>`,
            to,
            subject,
            html,
        });

        console.log('Message sent: %s', info.messageId);
        return { success: true, data: info };
    } catch (error: any) {
        console.error('Error sending email:', error);
        return { error: error.message || 'Failed to send email' };
    }
}

export function compileWelcomeEmail(teamName: string, members: any[]) {
    const membersList = members
        .map(
            (m: any) =>
                `<li>${m.name} (${m.email}) - ${m.is_leader ? 'Leader' : 'Member'}</li>`
        )
        .join('');

    return `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h1 style="color: #f82249;">Registration Received</h1>
        <p>Hello,</p>
        <p>Your team <strong>${teamName}</strong> has been registered successfully for HackSavvy-26.</p>
        <p><strong>Payment Status: Verification Pending</strong></p>
        <p>We will notify you once your payment is verified.</p>
        <h3>Team Members:</h3>
        <ul>${membersList}</ul>
        <hr />
        <p style="font-size: 0.9em; color: #777;">This is an automated message from HackSavvy.</p>
      </div>
    `;
}

export function compileConfirmationEmail(teamName: string, leaderName: string) {
    return `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h1 style="color: #4CAF50;">Payment Verified!</h1>
        <p>Hello ${leaderName},</p>
        <p>Your payment for team <strong>${teamName}</strong> has been verified.</p>
        <p>We look forward to seeing you at the event!</p>
        <hr />
        <p style="font-size: 0.9em; color: #777;">This is an automated message from HackSavvy.</p>
      </div>
    `;
}
