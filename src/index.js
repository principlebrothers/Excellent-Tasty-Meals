import './style.css';
// import Icon from './icon.png';
import getMeals from './module/getMeals.js';
import { getLikes, mealCounter } from './module/mealLikes.js';

const container = document.querySelector('.container');
const baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/xdgpBu6wgzd0D3VYQ10x/likes/';

const row = document.querySelector('.row');
const totalItem = document.querySelector('.total-item');

const displayMeals = async () => {
  const meals = await getMeals();
  mealCounter(meals, totalItem);
  meals.forEach((meal) => {
    row.innerHTML += `
    <div class="col" id="${meal.idCategory}">
    <article class="card border-primary
    mb-5">
      <div class="card-body">
        <img
          src=${meal.strCategoryThumb}
          alt="icon"
          width="250"
          height="300"
        />
      </div>
      <div class="card-header">
        <div><p class="fw-5 h3">${meal.strCategory}</p></div>
        <div class="likes-info">
        <button class="like-button" id="${meal.idCategory}"><i class="fa fa-heart text-danger"></i></button><span class="no-of-likes fw-5">0</span>  likes
        </div>
      </div>
      <button class="comment-btn bg-danger" type="button" id="${meal.idCategory}">Comments</button>
    </article>
  </div>
        `;
    container.append(row);
  });

  const likeButtons = document.querySelectorAll('.like-button');
  const likesNumber = document.querySelectorAll('.no-of-likes');

  likeButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      likesNumber[index].innerHTML = `${parseInt(likesNumber[index].innerHTML, 10) + 1}`;
      fetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify({
          item_id: btn.id,
        }),
        headers: {
          'Content-Type': 'application/json', charset: 'UTF-8',
        },
      });
    });
  });
  getLikes();
};

displayMeals();
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
  arrangeComments({ creation_date: '', username: input.value, comment: textarea.value });
  input.value = '';
  textarea.value = '';
});
