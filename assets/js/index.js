let todos = [];

const panels = Array.from(document.querySelectorAll('.panel'));
const items = Array.from(document.querySelectorAll('.todo-item'));
const panelAll = document.querySelector('.panel-all'),
  panelActive = document.querySelector('.panel-active'),
  panelComplete = document.querySelector('.panel-completed');

const inputTodo = document.getElementById('input-todo');
const btn = document.getElementById('add');
const formInput = document.querySelector('.form-input__todo');

items.forEach((item, i) => {
  panels[0].classList.add('active');
  items[0].classList.add('active-item');
  item.addEventListener('click', () => {
    panels.map((panel) => panel.classList.remove('active'));
    items.map((panel) => panel.classList.remove('active-item'));

    panels[i].classList.add('active');
    items[i].classList.add('active-item');
    if (items[i] === items[2]) {
      formInput.style.display = 'none';
    } else {
      formInput.style.display = 'block';
    }
  });
});

const saveToStorage = (arr) => {
  localStorage.setItem('todos', JSON.stringify(arr));
};

const readToStorage = () => {
  if (localStorage.getItem('todos')) {
    return (todos = JSON.parse(localStorage.getItem('todos')));
  } else {
    return [];
  }
};

const createComponent = ({ name }) => {
  return `
  <div class="todo-item item-todo">
    <input type="checkbox" class="check-todo" />
    <p>${name}</p>
  </div>
  `;
};

const renderToDOM = (obj, where) => {
  const el = document.createElement('div');
  el.classList.add('new-content');

  const component = createComponent(obj);
  el.innerHTML += component;
  where.appendChild(el);
};

const renderArrTodos = (arr, where) => {
  const el = document.createElement('div');
  el.classList.add('task-content');
  arr.forEach((todo) => {
    const component = createComponent(todo);
    el.innerHTML += component;
  });
  where.appendChild(el);
};

const createTodo = (value) => {
  if (!value) return console.warn('do you write somenting');

  const objTodo = {
    name: value,
    complete: false,
  };

  todos.push(objTodo);
  saveToStorage(todos);
  renderToDOM(objTodo, panelAll);
  reset();
};

const reset = () => {
  return (inputTodo.value = '');
};

inputTodo.addEventListener('keydown', (e) => {
  let value = e.target.value;
  if (e.key !== 'Enter') {
    return;
  }
  createTodo(value);
  reset();
});

btn.addEventListener('click', () => {
  const value = inputTodo.value;
  createTodo(value);
});

const readCheck = () => {
  const check = document.querySelectorAll('.check-todo');
  const newTodos = [...todos];
  check.forEach((todo, i) => {
    verifyCheck(newTodos, i, todo);
    todo.addEventListener('change', () => {
      const val = todo.checked;
      newTodos[i].complete = val;
      saveToStorage(newTodos);
      readToStorage();
    });
    readToStorage();
  });
};

const verifyCheck = (arr, idx, todo) => {
  const item = document.querySelectorAll('.item-todo p');
  arr[idx].complete === true ? (todo.checked = true) : (todo.checked = false);
  arr[idx].complete === true
    ? item.forEach((a) => a.classList.add('complete'))
    : item.forEach((b) => b.classList.remove('complete'));
};

const renderComplete = (arr) => {
  const newArr = arr.filter((todo) => todo.complete === true);
  renderArrTodos(newArr, panelComplete);
};

const renderActive = (arr) => {
  const newArr = arr.filter((todo) => todo.complete === false);
  renderArrTodos(newArr, panelActive);
};

document.addEventListener('DOMContentLoaded', () => {
  readToStorage();
  renderArrTodos(todos, panelAll);
  readCheck();
  renderComplete(todos);
  renderActive(todos);
});
