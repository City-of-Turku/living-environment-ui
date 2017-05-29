import RoutePattern from 'route-pattern';

const generateAssignmentPageMenuItems = (assignment, budget, menuItems) => {
  const assignmentId = assignment.id;
  const assignmentMenuItem = {
    id: `assignment-${assignmentId}`,
    label: assignment.name,
    url: `/${assignment.slug}`,
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
      label: `${section.title}`,
      badge: budget.sectionsSpentBudget[section.id],
      id: `${section.id}-section`,
    });
  });
  menuItems.push(assignmentMenuItem);
};

const createMenuItems = (assignment, budget) => {
  const menuItems = [];
  const pathname = location.pathname;
  const pattern = RoutePattern.fromString("/:assignmentSlug");
  if (pattern.matches(pathname)) {
    generateAssignmentPageMenuItems(assignment, budget, menuItems);
  }
  return menuItems;
};

export default createMenuItems;
