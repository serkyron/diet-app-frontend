import { Component, OnInit } from '@angular/core';
import { MealsService } from "../meals.service";
import _ from "lodash";
import { DaysService } from "../days.service";
import { DayInterface } from "../day.interface";
import { RecommendationsService } from "../../recommendations/recommendations.service";
import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from "@nebular/theme";

@Component({
  selector: 'ngx-tree-grid',
  templateUrl: './tree-grid.component.html',
  styleUrls: ['./tree-grid.component.scss'],
})
export class TreeGridComponent implements OnInit{

  public meals: any[];
  public days: any[];

  constructor(
    private mealsService: MealsService,
    private daysService: DaysService,
    private recommendationsService: RecommendationsService,
    private toastrService: NbToastrService,
  ) {}

  ngOnInit() {
    this.mealsService.get()
      .subscribe(
        (data) => {
          for (let meal of data) {
            meal.calories = this.computeIngredientsPropSum(meal.mealToIngredients || [], 'calories');
            meal.fats = this.computeIngredientsPropSum(meal.mealToIngredients || [], 'fats');
            meal.carbohydrates = this.computeIngredientsPropSum(meal.mealToIngredients || [], 'carbohydrates');
            meal.proteins = this.computeIngredientsPropSum(meal.mealToIngredients || [], 'proteins');
          }
          this.meals = data;
        },
        (e) => {
          console.log(e.message);
        }
      );

    let days$ = this.daysService.get()
      .pipe(
        map((data) => {
          for (let day of data) {
            day.calories = this.computeDayIngredientsPropSum(day, 'calories');
            day.fats = this.computeDayIngredientsPropSum(day, 'fats');
            day.carbohydrates = this.computeDayIngredientsPropSum(day, 'carbohydrates');
            day.proteins = this.computeDayIngredientsPropSum(day, 'proteins');
          }

          return data;
        })
      );

    combineLatest([
      days$,
      this.recommendationsService.get()
    ])
      .pipe(
        map(([days, recommendations]) => {
          recommendations = _.keyBy(recommendations, 'name');

          for (let day of days) {
            day.caloriesDiff = day.calories - recommendations.calories.amount;
            day.fatsDiff = day.fats - recommendations.fats.amount;
            day.proteinsDiff = day.proteins - recommendations.proteins.amount;
            day.carbohydratesDiff = day.carbohydrates - recommendations.carbohydrates.amount;
          }

          return days;
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.days = data;
        },
        (e) => {
          console.log(e);
        }
      );
  }

  private computeIngredientsPropSum(ingredients: any[], prop: string): number {
    return _.reduce(ingredients, (sum, item) => {
      return sum + (item.amount * item.ingredient[prop]) / 100;
    }, 0);
  }

  private computeDayIngredientsPropSum(day: DayInterface, prop: string): number {
    let meals = ['breakfast', 'snack1', 'lunch', 'snack2', 'dinner'];
    let sum = 0;

    for (let meal of meals) {
      sum += this.computeIngredientsPropSum(day[meal]?.mealToIngredients || [], prop);
    }

    return sum;
  }

  public deleteMeal(id: number): void {
    let confirmed = confirm('Are you sure you want to delete this meal?');

    if (confirmed) {
      this.mealsService.delete(id)
        .subscribe(
          () => {
            this.mealsService.refresh();
            this.daysService.refresh();
          },
          (e) => {
            console.log(e);
          }
        );
    }
  }

  public deleteDay(id: number): void {
    let confirmed = confirm('Are you sure you want to delete this day?');

    if (confirmed) {
      this.daysService.delete(id)
        .subscribe(
          () => {
            this.daysService.refresh();
          },
          (e) => {
            console.log(e);
          }
        );
    }
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 2000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false,
    };

    this.toastrService.show(
      body,
      title,
      config);
  }
}
