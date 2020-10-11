import {
  createObj,
  listTodos,
  addTodo,
  renderDOM,
  deleteCompleted,
} from './functions/index.js';

const listOptionTodos = Array.from(document.querySelectorAll('.todo-item'));
const listItemsTodos = document.getElementById('todo-list'),
  panelTodos = document.getElementById('list-todos'),
  btnDeleted = document.querySelector('.btn--deleted');

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
        btnDeleted.classList.remove('show-btn');
        break;
      case 'active':
        if (isCompleted) {
          el.classList.add('is-completed');
          btnDeleted.classList.remove('show-btn');
        }
        break;
      case 'completed':
        if (!isCompleted) {
          el.classList.add('is-completed');
        }
        btnDeleted.classList.add('show-btn');

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
btnDeleted.addEventListener('click', () => {
  deleteCompleted();
  for (let i = panelTodos.children.length - 1; i >= 0; i--) {
    const el = panelTodos.children[i];
    if (el.classList.contains('complete')) {
      panelTodos.removeChild(el);
    }
  }
});
