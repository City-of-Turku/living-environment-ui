// import RoutePattern from 'route-pattern';

const generateReportPageMenuItems = (assignmentId, menuItems, reportName) => {
  const assignmentMenuItem = {
    id: `assignment-${assignmentId}`,
    label: reportName || '...',
    url: `/${assignmentId}`,
    icon: 'icon-triangle',
  };
  menuItems.push(assignmentMenuItem);
  const reportMenuItem = {
    id: `report-assignment-${assignmentId}`,
    label: 'Raportti',
    url: `/report/${assignmentId}`,
    icon: 'icon-rect',
  };
  menuItems.push(reportMenuItem);
};

const generateAssignmentPageMenuItems = (assignment, budget, menuItems) => {
  const assignmentId = assignment.id;
  const assignmentMenuItem = {
    id: `assignment-${assignmentId}`,
    label: assignment.name,
    url: `/${assignment.slug}`,
    icon: 'icon-triangle',
    subitems: [{
      label: assignment.header,
      id: `${assignmentId}-main-section`,
    }, {
      label: 'Minun tietoni',
      id: `${assignmentId}-information-section`,
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
  const reportMenuItem = {
    id: `report-assignment-${assignmentId}`,
    label: 'Raportti',
    url: `/report/${assignment.slug}`,
    icon: 'icon-rect',
  };
  menuItems.push(reportMenuItem);
};
/*
const matchesRoute = (pathname, pattern) => RoutePattern.fromString(pattern).matches(pathname);

const assignmentPatternUrl = '/:assignmentSlug';
const reportPatternUrl = '/report/:assignmentSlug';

const createMenuItems = (assignment, budget, reportName) => {
  const menuItems = [];
  const pathname = location.pathname;
  if (matchesRoute(pathname, reportPatternUrl)) {
    const reportPattern = RoutePattern.fromString(reportPatternUrl);
    const { namedParams: { assignmentSlug } } = reportPattern.match(pathname);
    generateReportPageMenuItems(assignmentSlug, menuItems, reportName);
  } else if (matchesRoute(pathname, assignmentPatternUrl)) {
    generateAssignmentPageMenuItems(assignment, budget, menuItems);
  }
  return menuItems;
};
*/

// Function to check if a pathname matches a pattern
const matchesRoute = (pathname, pattern) => {
  const regex = new RegExp(`^${pattern.replace(/:[^/?]+/g, '([^/]+)').replace(/\//g, '\\/')}\\/?$`);
  return regex.test(pathname);
};

// Function to extract parameter value from a route
const extractParamValue = (pathname, pattern) => {
  const regex = new RegExp(`^${pattern.replace(/:[^/?]+/g, '([^/]+)').replace(/\//g, '\\/')}$`);
  const match = pathname.match(regex);
  return match ? match[1] : null;
};

// Route patterns
const assignmentPatternUrl = '/:assignmentSlug';
const reportPatternUrl = '/report/:assignmentSlug';

// Function to create menu items based on the current route
const createMenuItems = (assignment, budget, reportName) => {
  const menuItems = [];
  const pathname = location.pathname;

  if (matchesRoute(pathname, reportPatternUrl)) {
    const assignmentSlug = extractParamValue(pathname, '/report/:assignmentSlug');
    generateReportPageMenuItems(assignmentSlug, menuItems, reportName);
  } else if (matchesRoute(pathname, assignmentPatternUrl)) {
    // const assignmentSlug = extractParamValue(pathname, '/:assignmentSlug');
    generateAssignmentPageMenuItems(assignment, budget, menuItems);
  }

  return menuItems;
};


export default createMenuItems;
