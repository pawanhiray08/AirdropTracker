import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET() {
  try {
    const data = await resend.emails.send({
      from: 'Airdrop Tracker <notifications@yourdomain.com>',
      to: ['your-email@example.com'], // Replace with your email
      subject: 'Test Email',
      html: '<p>This is a test email from Airdrop Tracker</p>'
    })

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Failed to send email:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
