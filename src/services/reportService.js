import client from './client';

const reportService = {
  fetchReport: assignmentSlug => client.get('report/:assignmentSlug', { assignmentSlug }),
};

export default reportService;
