const selector = {
  collectionHas: (a, b) => {
    for (let i = 0, len = a.length; i < len; i += 1) {
      if (a[i] === b) {
        return true;
      }
    }
    return false;
  },
  findParentBySelector: (elm, sel) => {
    const all = document.querySelectorAll(sel);
    let cur = elm.parentNode;
    while (cur && !selector.collectionHas(all, cur)) {
      cur = cur.parentNode;
    }
    return cur;
  }
};

export default selector;
