export let listTodos = [];

export function addTodo(objTodo) {
  listTodos.push(objTodo);
  saveToStorage();
}

export function saveToStorage() {
  localStorage.setItem('todos', JSON.stringify(listTodos));
}

export function isComplete(id) {
  for (const todo of listTodos) {
    if (todo.id === id) {
      todo.complete = !todo.complete;
      saveToStorage();
      break;
    }
  }
}

export function deleteById(id) {
  // console.log(listTodos);
  listTodos = listTodos.filter((todo) => todo.id !== id);
  saveToStorage();
}

(function readToStorage() {
  listTodos = localStorage.getItem('todos')
    ? JSON.parse(localStorage.getItem('todos'))
    : [];
})();
