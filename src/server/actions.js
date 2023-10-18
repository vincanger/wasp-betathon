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
  try {
    const registered = await context.entities.Registration.create({
      data: registration,
    });

    emailSender.send({
      to: registered.email,
      subject: 'Wasp SaaS-a-Thon',
      text: `Hi ${registered.name}! Thanks for registering for the Wasp SaaS-a-Thon. We are excited to see what you build!`,
      html: `<p>Hi ${registered.name}!</p><p>Thanks for registering for the Wasp SaaS-a-Thon! We are excited to see what you build!</p>
    <p>Remember, the hackathon officially starts on Sunday, October 22nd, and ends on Saturday, October 28th at 11:59 p.m.</p>
    <p>If you have any questions, reach out to us in our discord server: https://discord.gg/NvACCTMH</p>
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
