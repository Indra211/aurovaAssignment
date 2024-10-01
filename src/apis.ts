export const URLs = {
  getCategories: "https://www.themealdb.com/api/json/v1/1/list.php?c=list",
  getFoodbyCategory: (category: string) =>
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
  getFoodbyId: (id: string) =>
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
  getFoodByArea: (area: string) =>
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`,
  getFoodbyIngredient: (ingredient: string) =>
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`,
};
