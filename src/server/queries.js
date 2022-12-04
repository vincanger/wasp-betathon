export const getProjects = async (args, context) => {

  return context.entities.Submission.findMany({
    where: {
      approved: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const getParticipants = async (args, context) => {
  return context.entities.Registration.count();
}
