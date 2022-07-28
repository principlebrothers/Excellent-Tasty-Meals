import './style.css';
import { trim } from 'lodash';
import {
  printFood, displayPopUp, openModel, closeModel, row, showComment, arrangeComments,
} from './modules/populateUi.js';
import { updateComment } from './modules/API.js';

const form = document.querySelector('form');
const input = document.querySelector('input');
const textarea = document.querySelector('textarea');
const closedModalButtons = document.querySelector('.closed-button');
const overlay = document.getElementById('overlay');
const modalContainer = document.querySelector('#mymodal');

printFood();

row.addEventListener('click', (event) => {
  const commentBtn = event.target;
  if (!commentBtn.classList.contains('comment-btn')) return;
  const id = commentBtn.getAttribute('id');
  displayPopUp(id);
  showComment(id);

  openModel(overlay, modalContainer);
});

closedModalButtons.addEventListener('click', () => {
  closeModel(overlay, modalContainer);
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const { id } = event.target.dataset;

  updateComment(trim(input.value), textarea.value, id);
  arrangeComments({ creation_date: id, username: input.value, comment: textarea.value });
  input.value = '';
  textarea.value = '';
});
