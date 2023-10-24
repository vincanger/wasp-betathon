import { emailSender } from '@wasp/email/index.js';
import { isPrismaError, prismaErrorToHttpError } from '@wasp/utils.js';
import HttpError from '@wasp/core/HttpError.js';

export const submitProject = async (project, context) => {
  try {
    await context.entities.Registration.findFirstOrThrow({
      where: {
        email: project.email,
      },
    });

    return await context.entities.Submission.create({
      data: project,
    });
  } catch (e) {
    if (isPrismaError(e)) {
      if (e.code === 'P2002') {
        throw new HttpError(422, 'A project with this name or email already exists!');
      } else {
        throw prismaErrorToHttpError(e);
      }
    } else {
      throw e;
    }
  }
};

export const registerProject = async (registration, context) => {
  console.log('registration: ', registration )
  try {
    const registered = await context.entities.Registration.create({
      data: {
        email: registration.email,
        name: registration.name,
      }
    });

    emailSender.send({
      to: registered.email,
      subject: 'Wasp SaaS-a-Thon',
      text: `Hi ${registered.name}! Thanks for registering for the Wasp SaaS-a-Thon. We are excited to see what you build!`,
      html: `<p>Hi ${registered.name}!</p><p>Thanks for registering for the Wasp SaaS-a-Thon! We are excited to see what you build!</p>
    <p>Remember, the hackathon officially starts on Sunday, October 22nd, and ends on Saturday, October 28th at 11:59 p.m.</p>
    <p>And don't forget to read the <a href='https://wasp-lang.notion.site/Wasp-SaaS-a-Thon-bd53e032d22f460d8578343f909f3bc4?pvs=4'> rules and instructions</a>. It's got a lot of helpful info there to help you build your app quickly & easily. </p>
    <p>If you have any questions, reach out to us in our discord server: https://discord.gg/Y9XcgEPTTM</p>
    <p>Happy Hacking!</p>
    <p>-Vince & The Wasp Team</p>`,
    });

    return registered;
  } catch (e) {
    if (isPrismaError(e)) {
      if (e.code === 'P2002') {
      throw new HttpError(422, 'Email already registered!')
      } else {
        throw prismaErrorToHttpError(e);
      }
    } else {
      throw e;
    }
  }
};
