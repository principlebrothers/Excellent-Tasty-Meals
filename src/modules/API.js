const foodUrl = 'https://www.themealdb.com/api/json/v1/1/categories.php';

const getCommentUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Ba78TFi3KepRuUvllE3V/comments?item_id=';

const postCommentUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Ba78TFi3KepRuUvllE3V/comments/';

//Get food detils
const getData = async () => {
  const response = await fetch(foodUrl);
  const {categories: meals} = await response.json();

  return meals;
};

// Get comment details
const getComment = async (id) => {
  const response = await fetch(getCommentUrl+id);
  const comments = await response.json();

  return comments;
}

// Update comment APi
const updateComment = async(name, insight, id) => {
  await fetch(postCommentUrl, {
    method: 'POST',
    body: JSON.stringify({
      item_id: id,
      username: name,
      comment: insight
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((response) => response.json());
}

export {getData, getComment, updateComment};