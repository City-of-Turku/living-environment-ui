import Layout from '../components/Layout';
import AssignmentPage from './AssignmentPage';

import store from '../store';

const createRoutes = () => ({
  path: 'assignment/:assignmentSlug',
  component: Layout,
  indexRoute: AssignmentPage(store),
  childRoutes: [
  ]
});

export default createRoutes;
