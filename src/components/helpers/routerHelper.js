const resolveToLocation = (to, router) =>
  (typeof to === 'function' ? to(router.location) : to);

export default resolveToLocation;
