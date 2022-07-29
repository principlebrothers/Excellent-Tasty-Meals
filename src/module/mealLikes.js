const baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/xdgpBu6wgzd0D3VYQ10x/likes/';

const getLikes = async () => {
  const columns = document.querySelectorAll('.col');
  const likesNumber = document.querySelectorAll('.no-of-likes');
  await fetch(baseUrl)
    .then((res) => res.json())
    .then((data) => {
      columns.forEach((column, index) => {
        data.forEach((meal) => {
          if (meal.item_id === column.id) {
            likesNumber[index].innerHTML = meal.likes;
          }
        });
      });
    });
};

// eslint-disable-next-line
const mealCounter = (meals, nodeItem) => { return nodeItem.innerHTML = meals.length; };

export { getLikes, mealCounter };