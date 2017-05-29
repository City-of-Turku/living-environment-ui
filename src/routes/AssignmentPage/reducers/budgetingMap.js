import { assignmentActionType, budgetingMapActionType } from '../constants/actionTypes';
import * as TaskType from '../../../constants/taskTypes/index';

const initialState = { tasks: {} };

const loadState = (assignmet) => {
  const tasks = {};
  assignmet.sections.forEach((section) => {
    section.tasks.forEach((task) => {
      if (task.task_type === TaskType.BudgetingTask
        && task.data.budgeting_type === TaskType.BudgetingMapTask) {
        tasks[task.id] = { task, targetUserData: [] };
      }
    });
  });
  return tasks;
};

const getTargetIndex = (currentTask, userTargetId) => {
  const targetIndex = currentTask.targetUserData.findIndex(target => target.id === userTargetId);
  return targetIndex;
};

const budgetingMapReducer = (state = initialState, action) => {
  switch (action.type) {

  case assignmentActionType.FETCH_ASSIGNMENT_FULFILLED:
    return { tasks: loadState(action.payload) };

  case budgetingMapActionType.ADD_UNINITIALIZED_TARGET: {
    const taskId = action.payload.taskId;
    const currentTask = state.tasks[taskId];
    return {
      tasks: {
        ...state.tasks,
        [taskId]: {
          ...currentTask,
          // [x, x, ..., x] -> [x, x, ..., x, new]
          targetUserData: [...currentTask.targetUserData, action.payload.target],
        }
      },
    };
  }

  case budgetingMapActionType.ADD_TARGET: {
    const taskId = action.payload.taskId;
    const target = action.payload.target;
    const sectionId = action.payload.sectionId;
    const currentTask = state.tasks[taskId];
    const targetIndex = currentTask.targetUserData.length - 1;
    return {
      tasks: {
        ...state.tasks,
        [taskId]: {
          ...currentTask,
          // [x, x, ..., xi] -> [x, x, ..., xi, new]
          sectionId,
          targetUserData: [...currentTask.targetUserData.slice(0, targetIndex),
            { ...currentTask.targetUserData[targetIndex], selectedTarget: target, valid: true }],
        },
      },
    };
  }

  case budgetingMapActionType.CLEAN_INVALID_TARGET: {
    const taskId = action.payload.taskId;
    const currentTask = state.tasks[taskId];
    return {
      tasks: {
        ...state.tasks,
        [taskId]: {
          ...currentTask,
          // [x, y, x, ..., x, y, ...] -> [x, x, ...,x]
          targetUserData: [...currentTask.targetUserData.filter(target => target.valid)],
        }
      },
    };
  }

  case budgetingMapActionType.DELETE_TARGET: {
    const taskId = action.payload.taskId;
    const currentTask = state.tasks[taskId];
    const targetId = action.payload.targetId;
    const targetIndex = getTargetIndex(currentTask, targetId);
    return {
      tasks: {
        ...state.tasks,
        [taskId]: {
          ...currentTask,
          // [x, x, ..., x, y, x, ...] -> [x, x, ...,x]
          targetUserData: [...currentTask.targetUserData.slice(0, targetIndex),
            ...currentTask.targetUserData.slice(targetIndex + 1)],
        }
      },
    };
  }

  case budgetingMapActionType.UPDATE_TARGET: {
    const taskId = action.payload.taskId;
    const selectedTarget = action.payload.userTarget;
    const targetId = action.payload.targetId;
    const currentTask = state.tasks[taskId];
    const targetIndex = getTargetIndex(currentTask, targetId);
    return {
      tasks: {
        ...state.tasks,
        [taskId]: {
          ...currentTask,
          // [x, x, ..., x, y, x, ...] -> [x, x, ..., x, Y, x, ...]
          targetUserData: [...currentTask.targetUserData.slice(0, targetIndex),
            { ...currentTask.targetUserData[targetIndex], selectedTarget, valid: true },
            ...currentTask.targetUserData.slice(targetIndex + 1)],
        },
      },
    };
  }

  default:
    return state;
  }
};

export default budgetingMapReducer;
