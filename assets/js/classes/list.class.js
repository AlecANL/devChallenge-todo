export class List {
  constructor() {
    // this.list = [];
    this.readToStorage();
  }

  addTodo(objTodo) {
    this.list.push(objTodo);
    this.saveToStorage();
  }

  deleteTodo(id) {
    this.list = this.list.filter((todo) => todo.id !== id);
    this.saveToStorage();
  }

  isComplete(id) {
    for (const todo of this.list) {
      if (todo.id === id) {
        todo.complete = !todo.complete;
        this.saveToStorage();
        break;
      }
    }
  }
  saveToStorage() {
    localStorage.setItem('todos', JSON.stringify(this.list));
  }
  readToStorage() {
    this.list = localStorage.getItem('todos')
      ? JSON.parse(localStorage.getItem('todos'))
      : [];
  }
}
