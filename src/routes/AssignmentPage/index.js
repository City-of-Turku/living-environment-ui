import AssignmentPage from './containers/AssignmentPage';

import { fetchAssignment } from "./actions/assignment";
import assignmentReducer from './reducers/assignment';
import budgetingMapReducer from './reducers/budgetingMap';
import { injectAsyncReducer } from '../../store';

const AssignmentPageRoute = store => ({
  getComponent(nextState, cb) {
    const assignmentSlug = nextState.params.assignmentSlug;
    injectAsyncReducer({ assignment: assignmentReducer, budgetingMap: budgetingMapReducer });
    store.dispatch(fetchAssignment(assignmentSlug));
    cb(null, AssignmentPage);
  }
});

export default AssignmentPageRoute;
