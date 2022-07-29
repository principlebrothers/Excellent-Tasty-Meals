/**
 * @jest-environment jsdom
 */
import { mealCounter } from './src/module/mealLikes.js';
import mealsss from './__mock__/mealDetails.js';

describe('Check the length of meals', () => {
  test('# add two item', () => {
    document.body.innerHTML = '<span class="h3 logo-name">Excellent Tasty Meals (<span class="total-item"></span>)</span>';
    const totalItem = document.querySelector('.total-item');
    expect(mealCounter(mealsss, totalItem)).toBe(2);
  });
});
import apiInfo from './__mock__/api.js';
import { commentCounter } from './src/modules/populateUi.js';

describe('Comment counter', () => {
  document.body.innerHTML = `<h2 class="title">
  Comments (<span class="comment-cout">0</span>)
</h2>`;
  const commentCount = document.querySelector('.comment-cout');
  test('Count the number of comments to be four (4)', () => {
    expect(commentCounter(apiInfo, commentCount)).toBe(4);
  });
});
