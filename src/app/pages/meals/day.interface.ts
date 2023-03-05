import { MealInterface } from "./meal.interface";

export interface DayInterface {
  id?: number;
  name: string;
  breakfast: MealInterface;
  snack1: MealInterface;
  lunch: MealInterface;
  snack2: MealInterface;
  dinner: MealInterface;
}
