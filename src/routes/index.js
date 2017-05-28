import Layout from '../containers/Layout';

import AssignmentPageRoute from './AssignmentPage';
import ReportPageRoute from './ReportPage';
import store from '../store';

const createRoutes = () => ({
  path: '/',
  getComponent(nextState, cb) {
    require.ensure([], () => {
      cb(null, Layout);
    }, 'Layout');
  },
  indexRoute: AssignmentPageRoute(store),
  childRoutes: [
    AssignmentPageRoute(store),
    ReportPageRoute(store),
  ],
});

export default createRoutes;
