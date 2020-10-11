import { list } from '../index.js';

const a = document.querySelector('.panel-all');

export const createComponent = ({ name, id, complete }) => {
  return `
    <li class="item-todo" data-id=${id}>
        <div class="view ${complete ? 'complete' : ''}">
            <input type="checkbox" id="check" name="check-todo" ${
              complete ? 'checked' : ''
            } />
            <label name="check">${name}</label>
            ${complete ? '<button class="btn btn--deleted">Delete<button>' : ''}
        </div>
    </li>
  `;
};

export const renderDOM = (obj, where) => {
  const el = document.createElement('div');
  el.innerHTML = createComponent(obj);
  where.append(el.firstElementChild);
};

a.addEventListener('click', (e) => {
  const localName = e.target.localName;
  const localEl = e.target.parentElement.parentElement;
  const idParent = e.target.parentElement.parentElement.getAttribute('data-id');

  switch (localName) {
    case 'input':
      list.isComplete(+idParent);
      localEl.classList.toggle('complete');
      console.log(list);
      break;
    case 'button':
      list.deleteTodo(idParent);
      a.removeChild(localEl);
      break;
    default:
      break;
  }
});
