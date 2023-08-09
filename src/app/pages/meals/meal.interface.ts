import { MealIngredientInterface } from "./meal.ingredient.interface";

export interface MealInterface {
  id?: number;
  name: string;
  calories?: number;
  proteins?: number;
  carbohydrates?: number;
  fats?: number;
  caloriesDiff?: number;
  proteinsDiff?: number;
  carbohydratesDiff?: number;
  fatsDiff?: number;
  mealToIngredients: MealIngredientInterface[];
}
