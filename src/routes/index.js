import Layout from '../containers/Layout';
import AssignmentPage from './AssignmentPage';

import store from '../store';

const createRoutes = () => ({
  path: '/:assignmentSlug',
  component: Layout,
  indexRoute: AssignmentPage(store),
  childRoutes: [
  ]
});

export default createRoutes;
