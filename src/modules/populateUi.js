import { getData, getComment } from './API.js';

const row = document.querySelector('.row');
const popUpMealDetails = document.querySelector('.popUp-meal-details');
const commentBoard = document.querySelector('.comment-board');
const commentCount = document.querySelector('.comment-cout');

// Populate the Hopepage
const renderUi = (input) => {
  row.innerHTML += `<div class="col">
  <article class="card border-primary mb-3 id= meal-${input.idCategory}">
    <div class="card-body">
      <img
        src="${input.strCategoryThumb}
      "
        alt="icon"
        width="250"
        height="300"
      />
    </div>
    <div class="card-header">
      <div><p>${input.strCategory}</p></div>
      <div class="likes-info">
        <i class="fa fa-heart"></i><span>5 likes</span>
      </div>
    </div>
    <button
      class="comment-btn"
      type="button"
      id=${input.idCategory}
    >Comments</button>
  </article>`;
};

const printFood = async () => {
  const allFood = await getData();
  allFood.forEach((meal) => {
    renderUi(meal);
  });
};

// Create popup meals
const createPopUp = (mealData) => {
  const form = document.querySelector('form');
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
const commentCounter = (elem) => {
  if (elem.length) {
    commentCount.textContent = elem.length;
  } else if (!elem.length) {
    commentCount.textContent = 0;
  }
};

// Display comment on the screen
const showComment = async (id) => {
  const receivedComm = await getComment(id);
  commentBoard.innerHTML = '';
  // commentCount.textContent = receivedComm.length;
  commentCounter(receivedComm);

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
  printFood, displayPopUp, openModel, closeModel, showComment, arrangeComments, row,
};