import { emailSender } from '@wasp/email/index.js'

const emailToSend = {
  to: '',
  subject: 'Your Wasp SaaS-a-Thon Project has been approved!',
  text: 'Hey There! Your Wasp SaaS-a-Thon Project has been approved and should now be visible!',
  html: `<p>Hey There!</p>
    <p>Your Wasp SaaS-a-Thon Project has been approved and should now be visible!</p>
    <p>Thanks so much for participating in the Wasp SaaS-a-Thon!</p>
    <p>Good Luck!</p>
    <p>-Vince & The Wasp Team</p>
    `,
};

//  you could use this function to send newsletters, expiration notices, etc.
export const checkSubmissionsAndSend = async (_args, context) => {
  console.log('Starting CRON JOB: \n\nSending notices...');

  // at the moment, we are just approving projects manually in the database
  const approvedProjects = await context.entities.Submission.findMany({
    where: {
      approved: true,
      noticeSent: false,
    },
  });

  console.log('Sending notices to approvedProjects: ', approvedProjects.length);

  if (approvedProjects.length === 0) {
    console.log('No approvedProjects to send notices to.');
    return;
  }
  await Promise.allSettled(
    approvedProjects.map(async (project) => {
      if (project.email) {
        try {
          emailToSend.to = project.email;
          await emailSender.send(emailToSend);
          await context.entities.Submission.update({
            where: {
              email: project.email,
            },
            data: {
              noticeSent: true,
            },
          });
        } catch (error) {
          console.error('Error sending notice to user: ', project.email, error);
        }
      }
    })
  );
};
