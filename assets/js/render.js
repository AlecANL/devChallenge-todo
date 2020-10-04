// this class only function is create methods to print onto dom
class Render {
  createComponent({ name }) {
    // this mehtod only functionality is create html compoentn to print onto dom
    return `
            <input type="checkbox" class="check-todo" />
            <p class="todo-item__name">${name}</p>
      `;
  }
  renderAddTodo(obj, where) {
    // this method receive an object and where = where print onto dom
    const el = document.createElement('div');
    el.classList.add('new-todo');
    const component = this.createComponent(obj);
    el.innerHTML += component;
    where.appendChild(el);
  }

  renderToStorage(arr, where) {
    // this anothoer method receive  and arrray to object with single todo, and where = where to print onto dom
    arr.forEach((todo) => {
      // use method renderAddTodo, and passed todo is an object to array and param where
      this.renderAddTodo(todo, where);
    });
  }

  renderIncompleteTodo(arr, where) {
    let newArr = arr.filter((todo) => todo.complete === true);
    const button = document.createElement('button');
    button.classList.add('btn');
    button.classList.add('btn--deleted');
    button.textContent = 'Delete All';
    newArr.forEach((todo) => this.renderAddTodo(todo, where));
    where.appendChild(button);

    button.addEventListener('click', () => {
      newArr = [];
    });
  }

  renderActiveTodos(arr, where) {
    const newArr = arr.filter((todo) => todo.complete === false);
    newArr.forEach((todo) => this.renderAddTodo(todo, where));
  }
}

export default Render;
