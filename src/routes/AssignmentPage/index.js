import AssignmentPage from './containers/AssignmentPage';

import { fetchAssignment } from "./actions/assignment";
import assignmentReducer from './reducers/assignment';
import budgetingMapReducer from './reducers/budgetingMap';
import assignmentFormReducer from './reducers/assignmentForm';
import friendsOfParkMapReducer from './reducers/friendsOfParkMap';
import { injectAsyncReducer } from '../../store';

const AssignmentPageRoute = store => ({
  path: '/:assignmentSlug',
  getComponent(nextState, cb) {
    const assignmentSlug = nextState.params.assignmentSlug;
    injectAsyncReducer({
      assignment: assignmentReducer,
      assignmentForm: assignmentFormReducer,
      budgetingMap: budgetingMapReducer,
      friendsOfParkMap: friendsOfParkMapReducer,
    });
    store.dispatch(fetchAssignment(assignmentSlug));
    cb(null, AssignmentPage);
  }
});

export default AssignmentPageRoute;
