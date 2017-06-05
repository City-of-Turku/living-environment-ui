import client from './client';

const openTextTaskIdReqExp = /open_text_task_(\d+)/;
const budgetingTextTaskIdsReqExp = /budgeting_text_task_(\d+)_(\d+)/;

const getFriendOfParkDescription = (schools, schoolId, schoolClassId) => {
  const schoolInfo = (schools || []).find(schoolIter => schoolIter.id === schoolId);
  if (schoolInfo) {
    const schoolClassInfo = (schoolInfo.classes || []).find(schoolClassIter => schoolClassIter.id === schoolClassId);
    if (schoolClassInfo) {
      return `${schoolInfo.name}/${schoolClassInfo.name}`;
    }
  }
  return '';
};

const convertAssignmentFormDataToAPIPayload = (values, schools) => {
  const budgetingTextTargets = Object.entries(values).reduce((accum, [key, amount]) => {
    const match = key.match(budgetingTextTaskIdsReqExp);
    if (match) {
      const task = parseInt(match[1], 10);
      const target = parseInt(match[2], 10);
      accum.push({ task, target, amount: parseFloat(amount) });
    }
    return accum;
  }, []);
  const budgetingMapTargets = values.budgeting_targets.map(mapTarget => ({
    ...mapTarget,
    task: parseInt(mapTarget.task, 10),
  }));
  return {
    school: values.school,
    school_class: values.schoolClass,
    open_text_tasks: Object.entries(values).reduce((accum, [key, answer]) => {
      const match = key.match(openTextTaskIdReqExp);
      if (match) {
        const task = parseInt(match[1], 10);
        accum.push({ task, answer });
      }
      return accum;
    }, []),
    budgeting_targets: [...budgetingTextTargets, ...budgetingMapTargets],
    voluntary_tasks: values.friendsOfPark.map(friend => ({
      ...friend.details,
      description: getFriendOfParkDescription(schools, parseInt(values.school, 10), parseInt(values.schoolClass, 10)),
      task: friend.taskId,
      lat: friend.lat,
      long: friend.lng,
    })),
  };
};


const assignmentService = {
  fetchAssignment: assignmentSlug => client.get('assignments/:assignmentSlug', { assignmentSlug }),
  postAssignment: (assignmentSlug, values, schools) =>
    client.post('answers/:assignmentSlug/', { assignmentSlug }, convertAssignmentFormDataToAPIPayload(values, schools)),
};

export default assignmentService;
