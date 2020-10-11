import { isComplete } from './index.js';

const panelTodos = document.getElementById('list-todos');

export function createComponent({ name, id, complete }) {
  return `
        <li class="todo-view" data-id=${id}>
            <input type="checkbox" ${complete ? 'checked' : ''} />
              <label  class="todo ${
                complete ? 'complete' : ''
              }">${name} </label>
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
  //   console.log(e.target.localName);
  //   console.log(e.target);
  switch (elName) {
    case 'label':
      console.log(el);
      break;
    case 'input':
      isComplete(+getId);
      el.parentElement.classList.toggle('complete');
      break;
    case 'img':
      console.log(el);

      break;
    default:
      console.log('error');
      break;
  }
}
panelTodos.addEventListener('click', moreEvents);
