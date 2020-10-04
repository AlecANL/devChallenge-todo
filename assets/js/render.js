class Render {
  createComponent({ name }) {
    return `
            <input type="checkbox" />
            <p>${name}</p>
      `;
  }
  renderAddTodo(obj, where) {
    const el = document.createElement('div');
    el.classList.add('new-todo');
    const component = this.createComponent(obj);
    el.innerHTML += component;
    where.appendChild(el);
  }

  renderToStorage(arr, where) {
    arr.forEach((todo) => {
      this.renderAddTodo(todo, where);
    });
  }
}

export default Render;
