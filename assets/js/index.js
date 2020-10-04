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
