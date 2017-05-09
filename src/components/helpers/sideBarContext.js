import { match } from 'react-router';

const isPathInRoutes = (routes, path) => routes.some(route => route.path === path);

const generateAssignmentPageMenuItems = (assignment, result) => {
  const assignmentId = assignment.id;
  const assignmentMenuItem = {
    id: assignmentId,
    label: assignment.name,
    url: `/assignment/${assignment.slug}`,
    icon: 'fa-home',
    subitems: [{
      label: 'Landing Page',
      id: `${assignmentId}-assignment`,
    }, {
      label: 'Player Information',
      id: `${assignmentId}-assignment-player-information`,
    },
    ],
  };
  const sections = assignment.sections;
  sections.forEach((section) => {
    section.tasks.forEach(task => assignmentMenuItem.subitems.push({
      label: task.name,
      id: `${assignmentId}-${task.id}-task`,
    }));
    result.push(assignmentMenuItem);
  });
};

const createMenuItems = (assignment, router) => new Promise((resolve, reject) => {
  const routes = router.routes;
  match({ routes, location }, (error, redirect, renderProps) => {
    if (error) {
      // eslint-disable-line no-console
      console.error(`Can't generate the menu content for the given path ${location.pathname}`);
      return reject(error);
    }
    const menuItems = [];
    if (isPathInRoutes(renderProps.routes, 'assignment/:assignmentSlug')) {
      generateAssignmentPageMenuItems(assignment, menuItems);
    }
    return resolve(menuItems);
  });
});

export default createMenuItems;
