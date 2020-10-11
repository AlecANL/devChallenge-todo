export class Todo {
  constructor(todo) {
    this.id = new Date().getTime();
    this.name = todo;
    this.complete = false;
  }
}
