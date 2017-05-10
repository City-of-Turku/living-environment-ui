const parseQueryString = (url) => {
  const urlParts = (url || '').split('?');
  if (urlParts.length > 1) {
    const queryParts = urlParts[1].split('&');
    return queryParts.reduce((acc, pair) => {
      const pairParts = pair.split('=');
      const key = decodeURIComponent(pairParts[0]);
      const value = decodeURIComponent(pairParts.length > 1 ? pairParts[1] : '');
      acc[key] = value;
      return acc;
    }, {});
  }
  return null;
};

export default parseQueryString;
