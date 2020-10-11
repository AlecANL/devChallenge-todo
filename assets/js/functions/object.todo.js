export function createObj(name, id = new Date().getTime(), complete = false) {
  return {
    name,
    id,
    complete,
  };
}
