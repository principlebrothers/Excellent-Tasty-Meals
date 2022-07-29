// const url = 'www.themealdb.com/api/json/v1/1/categories.php';
const getMeals = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
  const data = await response.json();
  return data.categories.slice(0, 12);
};

export default getMeals;