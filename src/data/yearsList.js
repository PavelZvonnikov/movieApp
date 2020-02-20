const yearsList = [];

for (let i = 1950; i < 2026; i++) {
  const obj = {};
  obj.label = `${i}`;
  obj.value = `${i}`;
  yearsList.push(obj);
}

export { yearsList };
