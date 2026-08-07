// src/sort.ts
function getDate(data) {
  const defaultDateType = data.defaultDateType;
  if (!defaultDateType) {
    return void 0;
  }
  const dates = data.dates;
  return dates?.[defaultDateType];
}
function byDateAndAlphabetical() {
  return (f1, f2) => {
    const f1Date = getDate(f1);
    const f2Date = getDate(f2);
    if (f1Date && f2Date) {
      return f2Date.getTime() - f1Date.getTime();
    } else if (f1Date && !f2Date) {
      return -1;
    } else if (!f1Date && f2Date) {
      return 1;
    }
    const f1Title = (f1.frontmatter?.title ?? "").toLowerCase();
    const f2Title = (f2.frontmatter?.title ?? "").toLowerCase();
    return f1Title.localeCompare(f2Title);
  };
}

export { byDateAndAlphabetical, getDate };
//# sourceMappingURL=sort.js.map
//# sourceMappingURL=sort.js.map
