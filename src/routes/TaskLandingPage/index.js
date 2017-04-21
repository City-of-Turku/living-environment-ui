import TaskLandingPage from './components/TaskLandingPage';

import { fetchAssignment } from "./actions/assignment";
import assignmentReducer from './reducers/assignment';
import { injectAsyncReducer } from '../../store';

const TaskLandingPageRoute = store => ({
  getComponent(nextState, cb) {
    const assignmentSlug = nextState.params.assignmentSlug;
    injectAsyncReducer({ assignmentReducer });
    store.dispatch(fetchAssignment(assignmentSlug));
    cb(null, TaskLandingPage);
  }
});

export default TaskLandingPageRoute;
