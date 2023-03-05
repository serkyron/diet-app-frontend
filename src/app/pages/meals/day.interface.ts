import { MealIngredientInterface } from "./meal.ingredient.interface";

export interface DayInterface {
  id?: number;
  name: string;
  mealToIngredients: MealIngredientInterface[];
}
