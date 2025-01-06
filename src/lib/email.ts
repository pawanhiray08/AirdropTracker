import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendDeadlineNotification({
  email,
  airdrops,
}: {
  email: string
  airdrops: {
    title: string
    deadline: string
    url: string
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
          <a href="${airdrop.url}">View Airdrop</a>
        </li>
      `
        )
        .join('')}
    </ul>
  `

  try {
    await resend.emails.send({
      from: 'Airdrop Tracker <notifications@yourdomain.com>',
      to: email,
      subject: 'Upcoming Airdrop Deadlines',
      html,
    })
  } catch (error) {
    console.error('Failed to send email:', error)
    throw error
  }
}
