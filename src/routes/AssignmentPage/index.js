import AssignmentPage from './containers/AssignmentPage';

import { fetchAssignment } from "./actions/assignment";
import assignmentReducer from './reducers/assignment';
import { injectAsyncReducer } from '../../store';

const AssignmentPageRoute = store => ({
  getComponent(nextState, cb) {
    const assignmentSlug = nextState.params.assignmentSlug;
    injectAsyncReducer({ assignmentReducer });
    store.dispatch(fetchAssignment(assignmentSlug));
    cb(null, AssignmentPage);
  }
});

export default AssignmentPageRoute;
