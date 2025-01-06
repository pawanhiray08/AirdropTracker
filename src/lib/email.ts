import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://trackairdrop.vercel.app'

export async function sendDeadlineNotification({
  email,
  airdrops,
}: {
  email: string
  airdrops: {
    title: string
    deadline: string
    url: string
    id: string
  }[]
}) {
  const html = `
    <h2>Upcoming Airdrop Deadlines</h2>
    <p>You have the following airdrops with deadlines coming up:</p>
    <ul>
      ${airdrops
        .map(
          (airdrop) => `
        <li>
          <strong>${airdrop.title}</strong>
          <br />
          Deadline: ${new Date(airdrop.deadline).toLocaleString()}
          <br />
          <a href="${APP_URL}/airdrops/${airdrop.id}">View Airdrop</a>
        </li>
      `
        )
        .join('')}
    </ul>
    <p>
      <a href="${APP_URL}/airdrops">View All Airdrops</a>
    </p>
    <p>
      <small>You're receiving this email because you have upcoming airdrop deadlines on Airdrop Tracker.</small>
    </p>
  `

  try {
    await resend.emails.send({
      from: 'Airdrop Tracker <notifications@trackairdrop.vercel.app>',
      to: email,
      subject: 'Upcoming Airdrop Deadlines',
      html,
    })
  } catch (error) {
    console.error('Failed to send email:', error)
    throw error
  }
}
