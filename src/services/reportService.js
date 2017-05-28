import client from './client';

const reportService = {
  fetchReport: assignmentSlug => client.get('answers/:assignmentSlug', { assignmentSlug }),
};

export default reportService;
