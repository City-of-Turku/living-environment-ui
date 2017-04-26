import Layout from '../components/Layout';
import TaskLandingPage from './TaskLandingPage';

import store from '../store';

export const createRoutes = () => ({
  path: 'assignment/:assignmentSlug',
  component: Layout,
  indexRoute: TaskLandingPage(store),
  childRoutes: [
  ]
});

export default createRoutes;
