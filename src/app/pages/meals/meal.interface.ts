import { MealIngredientInterface } from "./meal.ingredient.interface";

export interface MealInterface {
  id?: number;
  name: string;
  ingredients: MealIngredientInterface[];
}
