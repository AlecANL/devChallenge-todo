import Todo from './todo.js';
import Render from './render.js';

let listTodos = [];
const render = new Render();

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

const saveToStorage = (arr) =>
  localStorage.setItem('todos', JSON.stringify(arr));

const readToStorage = () => {
  if (!localStorage.getItem('todos')) {
    return [];
  }
  listTodos = JSON.parse(localStorage.getItem('todos'));
};

const addTodos = (value) => listTodos.push(new Todo(value));

const createDOMTodo = (value, where) =>
  render.renderAddTodo(new Todo(value), where);

inputTodo.addEventListener('keypress', (e) => {
  if (e.key !== 'Enter') {
    return;
  }
  const value = e.target.value;
  addTodos(value);
  createDOMTodo(value, panelAll);
  saveToStorage(listTodos);
  location.reload();
});

btn.addEventListener('click', () => {
  const value = inputTodo.value;
  addTodos(value);
  saveToStorage(listTodos);
  createDOMTodo(value, panelAll);
  location.reload();
});

const verifyCheck = (arrChecks) => {
  console.log(listTodos);
  arrChecks.forEach((check, i) => {
    check.addEventListener('change', (e) => {
      const t = e.target.nextElementSibling;
      t.classList.toggle('complete');
      listTodos[i].complete = check.checked;
      saveToStorage(listTodos);
      // location.reload();
    });
  });
};

const renderActiveTodos = (where) => {
  render.renderActiveTodos(listTodos, where);
};

const renderTodoIncompleted = (where) => {
  const el = document.createElement('h1');
  el.textContent = 'Nothing Todo is Completed';

  const completedTodos = listTodos.filter((todo) => todo.complete === true);
  if (!completedTodos.length) {
    panelComplete.appendChild(el);
    return;
  }
  render.renderIncompleteTodo(listTodos, where);
  console.log(panelComplete.children);
  panelComplete.querySelectorAll('.new-todo').forEach((todo) => {
    todo.children[1].classList.add('complete');
    todo.children[0].checked = true;
  });
  console.log(panelComplete.querySelector('.new-todo').children[1]);
};

document.addEventListener('DOMContentLoaded', () => {
  readToStorage();
  render.renderToStorage(listTodos, panelAll);
  const checks = Array.from(document.querySelectorAll('.check-todo'));
  verifyCheck(checks);
  renderTodoIncompleted(panelComplete);
  renderActiveTodos(panelActive);
});
