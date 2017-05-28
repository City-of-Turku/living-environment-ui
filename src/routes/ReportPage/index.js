import { injectAsyncReducer } from '../../store/index';
import report from './reducers/report';
import { fetchReport } from './actions/report';

const ReportPageRoute = store => ({
  path: 'report/:assignmentSlug',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const assignmentSlug = nextState.params.assignmentSlug;
      injectAsyncReducer({ report });
      store.dispatch(fetchReport(assignmentSlug));
      const ReportPage = require('./containers/ReportPage').default;
      cb(null, ReportPage);
    }, 'ReportPage');
  },
});

export default ReportPageRoute;
