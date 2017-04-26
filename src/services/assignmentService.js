import client from './client';

const assignmentService = {
  fetchAssignment: assignmentSlug => client.get('assignments/:assignmentSlug/sections/', { assignmentSlug }),
};

export default assignmentService;
