import { injectAsyncReducer } from '../../store/index';
import report from './reducers/report';
import { fetchReport } from './actions/report';
import { fetchAssignment } from "../AssignmentPage/actions/assignment";

const ReportPageRoute = store => ({
  path: 'report/:assignmentSlug',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const assignmentSlug = nextState.params.assignmentSlug;
      injectAsyncReducer({ report });
      store.dispatch(fetchReport(assignmentSlug));
      store.dispatch(fetchAssignment(assignmentSlug));
      const ReportPage = require('./containers/ReportPage').default;
      cb(null, ReportPage);
    }, 'ReportPage');
  },
});

export default ReportPageRoute;
