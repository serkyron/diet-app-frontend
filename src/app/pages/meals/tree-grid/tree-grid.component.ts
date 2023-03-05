import { Component, OnInit } from '@angular/core';
import { MealsService } from "../meals.service";
import _ from "lodash";

@Component({
  selector: 'ngx-tree-grid',
  templateUrl: './tree-grid.component.html',
  styleUrls: ['./tree-grid.component.scss'],
})
export class TreeGridComponent implements OnInit{

  public meals: any[];

  constructor(
    private mealsService: MealsService)
  {}

  ngOnInit() {
    this.mealsService.get()
      .subscribe(
        (data) => {
          for (let meal of data) {
            meal.calories = _.reduce(meal.mealToIngredients, (sum, item) => {
              return sum + (item.amount * item.ingredient.calories) / 100;
            }, 0);
            meal.fats = _.reduce(meal.mealToIngredients, (sum, item) => {
              return sum + (item.amount * item.ingredient.fats) / 100;
            }, 0);
            meal.carbohydrates = _.reduce(meal.mealToIngredients, (sum, item) => {
              return sum + (item.amount * item.ingredient.carbohydrates) / 100;
            }, 0);
            meal.proteins = _.reduce(meal.mealToIngredients, (sum, item) => {
              return sum + (item.amount * item.ingredient.proteins) / 100;
            }, 0);
          }
          this.meals = data;
        },
        (e) => {
          console.log(e.message);
        }
      );
  }
}
