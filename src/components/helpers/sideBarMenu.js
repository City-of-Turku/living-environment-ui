import { match } from 'react-router';

const isPathInRoutes = (routes, path) => routes.some(route => route.path === path);

const generateAssignmentPageMenuItems = (assignment, menuItems) => {
  const assignmentId = assignment.id;
  const assignmentMenuItem = {
    id: assignmentId,
    label: assignment.name,
    url: `/assignment/${assignment.slug}`,
    icon: 'fa-home',
    subitems: [{
      label: assignment.header,
      id: `${assignmentId}-assignment`,
    }, {
      label: 'Minun tietoni',
      id: `${assignmentId}-assignment-my-information`,
    },
    ],
  };
  const sections = assignment.sections;
  sections.forEach((section) => {
    assignmentMenuItem.subitems.push({
      label: section.title,
      id: `${section.id}-section`,
    });
    menuItems.push(assignmentMenuItem);
  });
};

const createMenuItems = (assignment, router) => new Promise((resolve, reject) => {
  const routes = router.routes;
  match({ routes, location }, (error, redirect, renderProps) => {
    if (error) {
      /* eslint-disable no-console */
      console.error(`Can't generate the menu content for the given path ${location.pathname}`);
      /* eslint-enable no-console */
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
