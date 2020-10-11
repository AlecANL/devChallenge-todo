import { isComplete, deleteById } from './index.js';

const panelTodos = document.getElementById('list-todos');

export function createComponent({ name, id, complete }) {
  return `
        <li class="todo-view ${complete ? 'complete' : ''}" data-id=${id}>
            <input type="checkbox" ${complete ? 'checked' : ''} />
              <label  class="todo ">${name} </label>
        ${
          complete
            ? '<img class="delete-icon" src="./delete-icon.svg" alt="delete icon"/>'
            : ''
        }
        </li>
    `;
}

export function renderDOM(obj, where) {
  const el = document.createElement('div');
  el.innerHTML += createComponent(obj);
  where.append(el.firstElementChild);
}

function moreEvents(e) {
  const getId = e.target.parentElement.getAttribute('data-id'),
    elName = e.target.localName,
    el = e.target;
  switch (elName) {
    case 'label':
      console.log(el);
      break;
    case 'input':
      isComplete(+getId);
      el.parentElement.classList.toggle('complete');
      break;
    case 'img':
      deleteById(+getId);
      panelTodos.removeChild(el.parentElement);
      break;
    default:
      console.log('error');
      break;
  }
}
export const createBtn = () => {
  return `<button class="btn btn--deleted">Delete All</button>`;
};

panelTodos.addEventListener('click', moreEvents);
