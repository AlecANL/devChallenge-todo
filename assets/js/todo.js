// this class only function is create structure to single object todo, and his functunality

class Todo {
  name;
  complete;

  constructor(name, complete = false) {
    this.name = name;
    this.complete = complete;
  }
}

export default Todo;
