/**
 * @jest-environment jsdom
 */
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
