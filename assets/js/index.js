import { createObj, listTodos, addTodo, renderDOM } from './functions/index.js';

const listOptionTodos = Array.from(document.querySelectorAll('.todo-item'));
const listItemsTodos = document.getElementById('todo-list'),
  panelTodos = document.getElementById('list-todos');

const inputTodo = document.getElementById('input-todo'),
  btnTodo = document.getElementById('add');

listTodos.map((todo) => renderDOM(todo, panelTodos));

function buildTodoToKeyboard(e) {
  if (e.key !== 'Enter') return;
  const newObj = createObj(this.value);
  addTodo(newObj);
  renderDOM(newObj, panelTodos);
}
function buildTodoToBtn() {
  if (!inputTodo.value) return;
  console.log(inputTodo.value);
}

function optionInTodo(e) {
  if (!e.target.classList.contains('todo-item')) return;
  listOptionTodos.map((item) => item.classList.remove('active-item'));
  e.target.classList.toggle('active-item');
  const el = e.target.textContent.toLowerCase();
  const some = document.querySelectorAll('.todo');
  console.log(el);
  switch (el) {
    case 'all':
      some.forEach((x) => {
        x.parentElement.classList.remove('is-completed');
      });
      break;
    case 'active':
      some.forEach((x) => {
        x.parentElement.classList.remove('is-completed');
        if (x.classList.contains('complete')) {
          x.parentElement.classList.add('is-completed');
        }
      });

      break;
    case 'completed':
      some.forEach((x) => {
        x.parentElement.classList.remove('is-completed');
        if (!x.classList.contains('complete')) {
          x.parentElement.classList.add('is-completed');
        }
      });
      break;

    default:
      console.warn('sometimes happend a wrong');
      break;
  }
}

listOptionTodos[0].classList.add('active-item');
listItemsTodos.addEventListener('click', optionInTodo);
inputTodo.addEventListener('keypress', buildTodoToKeyboard);
btnTodo.addEventListener('click', buildTodoToBtn);
// const createTodo = (value) => {
//   list.addTodo(new Todo(value));
//   renderDOM(new Todo(value), panelAll);
//   console.log(list);
// };

// inputTodo.addEventListener('keypress', (e) => {
//   const value = e.target.value;
//   if (e.key !== 'Enter' || !value) {
//     return;
//   }
//   createTodo(value);
// });

// list.list.forEach((todo) => renderDOM(todo, panelAll));
