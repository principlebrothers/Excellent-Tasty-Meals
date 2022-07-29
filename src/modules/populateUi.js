import { getData, getComment } from './API.js';

const row = document.querySelector('.row');
const popUpMealDetails = document.querySelector('.popUp-meal-details');
const commentBoard = document.querySelector('.comment-board');
const commentCount = document.querySelector('.comment-cout');
const form = document.querySelector('form');


// Create popup meals
const createPopUp = (mealData) => {
  const id = mealData.idCategory;
  form.setAttribute('data-id', id);

  popUpMealDetails.innerHTML = `
  <div class="img-container">
  <img
    src="${mealData.strCategoryThumb}"
    alt="Meal"
    width="200"
    height="200"
  />
</div>
<div class="meal-description">
  <h2 class="title">${mealData.strCategory}</h2>
  <div class="description">${mealData.strCategoryDescription}</div>
</div>`;
};

const arrangeComments = (receiveComment) => {
  commentBoard.innerHTML += `
  <li>
      <span class="date">${receiveComment.creation_date}</span>
      <span class="name">${receiveComment.username}: </span>
      <span class="comment">${receiveComment.comment}</span>
  </li>`;
};

// Comment Counter
// eslint-disable-next-line
const commentCounter = (elem, element) => {
  if (elem.length) {
    // eslint-disable-next-line
    return element.textContent = elem.length;
  } if (!elem.length) {
    // eslint-disable-next-line
    return element.textContent = 0;
  }
};

// Display comment on the screen
const showComment = async (id) => {
  const receivedComm = await getComment(id);
  commentBoard.innerHTML = '';
  // commentCount.textContent = receivedComm.length;
  commentCounter(receivedComm, commentCount);

  receivedComm.find((info) => arrangeComments(info));
};

// Populate selected food
const displayPopUp = async (id) => {
  const allMeals = await getData();

  const choice = allMeals.find((item) => item.idCategory === id);

  createPopUp(choice);
};

// Open popup model
const openModel = (bgOverlay, modal) => {
  modal.classList.add('active');
  bgOverlay.classList.add('active');
};

// Close Popup model
const closeModel = (bgOverlay, modal) => {
  modal.classList.remove('active');
  bgOverlay.classList.remove('active');
};

export {
  printFood, displayPopUp, openModel, closeModel, showComment, arrangeComments, commentCounter, row,
};