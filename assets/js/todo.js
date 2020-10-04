class Todo {
  name;
  complete;

  constructor(name, complete = false) {
    this.name = name;
    this.complete = complete;
  }
}

export default Todo;
