export const submitProject = async (project, context) => {

  const newProject = context.entities.Submission.create({
    data: project,
  });

  return newProject;
};

export const registerProject = async (registration, context) => {
  const registered = context.entities.Registration.create({
    data: registration,
  });

  return registered;
};