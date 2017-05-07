import client from './client';

const assignmentService = {
  fetchAssignment: assignmentSlug => client.get('assignments/:assignmentSlug', { assignmentSlug }),
  postAssignment: () => { }, // values
};

export default assignmentService;
