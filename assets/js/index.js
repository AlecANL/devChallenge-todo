import { List, Todo } from './classes/index.js';
import { renderDOM } from './classes/render.class.js';

export const list = new List();

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

const createTodo = (value) => {
  list.addTodo(new Todo(value));
  renderDOM(new Todo(value), panelAll);
  console.log(list);
};

inputTodo.addEventListener('keypress', (e) => {
  const value = e.target.value;
  if (e.key !== 'Enter' || !value) {
    return;
  }
  createTodo(value);
});

list.list.forEach((todo) => renderDOM(todo, panelAll));

// panelActive.addEventListener('click', () => {
//   list.list = list.list.filter((todo) => todo.complete !== true);
//   list.list.forEach((data) => renderDOM(data, panelActive));
// });
// items[1].addEventListener('click', () => {
//   console.log('hello');
//   list.list = list.list.filter((data) => data.complete !== true);
//   list.list.forEach((d) => renderDOM(d, panelActive));
// });
