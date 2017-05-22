import uuidV4 from 'uuid/v4';

import { budgetingMapActionType } from '../constants/actionTypes';

export const budgetingMapClicked = (lat, lng, taskId) => ({
  type: budgetingMapActionType.ADD_UNINITIALIZED_TARGET,
  payload: {
    taskId,
    target: { id: uuidV4(), lat, lng, amount: 0, selectedTarget: null, valid: false }
  },
});

export const addTarget = (taskId, target) => ({
  type: budgetingMapActionType.ADD_TARGET,
  payload: {
    taskId,
    target,
  },
});

export const deleteTarget = (taskId, targetId, userTarget) => ({
  type: budgetingMapActionType.DELETE_TARGET,
  payload: {
    taskId,
    targetId,
    userTarget,
  },
});

export const updateTarget = (taskId, targetId, userTarget) => ({
  type: budgetingMapActionType.UPDATE_TARGET,
  payload: {
    taskId,
    targetId,
    userTarget,
  },
});

export const cleanInvalidTarget = taskId => ({
  type: budgetingMapActionType.CLEAN_INVALID_TARGET,
  payload: {
    taskId,
  },
});
