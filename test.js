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