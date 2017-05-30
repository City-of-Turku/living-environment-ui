import RoutePattern from 'route-pattern';

const generateReportPageMenuItems = (assignmentId, menuItems) => {
  const reportMenuItem = {
    id: `assignment-${assignmentId}`,
    label: 'Raportti',
    url: `report/${assignmentId}`,
    icon: 'fa-home',
  };
  menuItems.push(reportMenuItem);
};

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

const matchesRoute = (pathname, pattern) => RoutePattern.fromString(pattern).matches(pathname);

const createMenuItems = (assignment, budget) => {
  const menuItems = [];
  const pathname = location.pathname;
  const reportPatternUrl = '/report/:assignmentSlug';
  if (matchesRoute(pathname, reportPatternUrl)) {
    const reportPattern = RoutePattern.fromString(reportPatternUrl);
    const { namedParams: { assignmentSlug } } = reportPattern.match(pathname);
    generateReportPageMenuItems(assignmentSlug, menuItems);
  } else if (matchesRoute(pathname, '/:assignmentSlug')) {
    generateAssignmentPageMenuItems(assignment, budget, menuItems);
  }
  return menuItems;
};

export default createMenuItems;
