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

  const filter = e.target.textContent.toLowerCase();

  for (const el of panelTodos.children) {
    el.classList.remove('is-completed');
    const isCompleted = el.classList.contains('complete');
    switch (filter) {
      case 'all':
        break;
      case 'active':
        if (isCompleted) {
          el.classList.add('is-completed');
        }
        break;
      case 'completed':
        if (!isCompleted) {
          el.classList.add('is-completed');
        }

        break;
      default:
        break;
    }
  }
}

listOptionTodos[0].classList.add('active-item');
listItemsTodos.addEventListener('click', optionInTodo);
inputTodo.addEventListener('keypress', buildTodoToKeyboard);
btnTodo.addEventListener('click', buildTodoToBtn);
