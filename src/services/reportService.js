import client from './client';

const reportService = {
  fetchReport: (assignmentSlug, school, schoolClass) => client.get(
    'report/:assignmentSlug', { assignmentSlug }, { school, school_class: schoolClass }),
};

export default reportService;
