import { Component, OnInit } from '@angular/core';
import { MealsService } from '../meals.service';
import _ from 'lodash';
import { DaysService } from '../days.service';
import { DayInterface } from '../day.interface';
import { RecommendationsService } from '../../recommendations/recommendations.service';
import { combineLatest, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { AddMealComponent } from '../forms/add-meal/add-meal.component';
import { MealInterface } from '../meal.interface';
import { AddDayComponent } from '../forms/add-day/add-day.component';

@Component({
  selector: 'ngx-tree-grid',
  templateUrl: './tree-grid.component.html',
  styleUrls: ['./tree-grid.component.scss'],
})
export class TreeGridComponent implements OnInit {

  public meals: any[];
  public days: any[];
  public recommendations;
  public addMealSubject: Subject<MealInterface> = new Subject<MealInterface>();
  public addDaySubject: Subject<DayInterface> = new Subject<DayInterface>();

  constructor(
    private mealsService: MealsService,
    private daysService: DaysService,
    private recommendationsService: RecommendationsService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
  ) {}

  ngOnInit() {
    this.addMealSubject.asObservable()
      .subscribe((meal: any) => {
        meal.calories = this.computeIngredientsPropSum(meal.mealToIngredients || [], 'calories');
        meal.fats = this.computeIngredientsPropSum(meal.mealToIngredients || [], 'fats');
        meal.carbohydrates = this.computeIngredientsPropSum(meal.mealToIngredients || [], 'carbohydrates');
        meal.proteins = this.computeIngredientsPropSum(meal.mealToIngredients || [], 'proteins');
        this.meals.push(meal);
      });

    this.addDaySubject.asObservable()
      .subscribe((day: any) => {
        day.calories = this.computeDayIngredientsPropSum(day, 'calories');
        day.fats = this.computeDayIngredientsPropSum(day, 'fats');
        day.carbohydrates = this.computeDayIngredientsPropSum(day, 'carbohydrates');
        day.proteins = this.computeDayIngredientsPropSum(day, 'proteins');

        day.caloriesDiff = day.calories - this.recommendations.calories?.amount;
        day.fatsDiff = day.fats - this.recommendations.fats?.amount;
        day.proteinsDiff = day.proteins - this.recommendations.proteins?.amount;
        day.carbohydratesDiff = day.carbohydrates - this.recommendations.carbohydrates?.amount;

        this.days.push(day);
    });

    this.mealsService.get()
      .subscribe(
        (data) => {
          for (const meal of data) {
            meal.calories = this.computeIngredientsPropSum(meal.mealToIngredients || [], 'calories');
            meal.fats = this.computeIngredientsPropSum(meal.mealToIngredients || [], 'fats');
            meal.carbohydrates = this.computeIngredientsPropSum(meal.mealToIngredients || [], 'carbohydrates');
            meal.proteins = this.computeIngredientsPropSum(meal.mealToIngredients || [], 'proteins');
          }
          this.meals = data;
        },
        (e) => {
          const body = e.error.message.join ? e.error.message.join(', ') : e.error.message;
          this.showToast('danger', 'Failed to load meals', body);
        },
      );

    const days$ = this.daysService.get()
      .pipe(
        map((data) => {
          for (const day of data) {
            day.calories = this.computeDayIngredientsPropSum(day, 'calories');
            day.fats = this.computeDayIngredientsPropSum(day, 'fats');
            day.carbohydrates = this.computeDayIngredientsPropSum(day, 'carbohydrates');
            day.proteins = this.computeDayIngredientsPropSum(day, 'proteins');
          }

          return data;
        }),
      );

    combineLatest([
      days$,
      this.recommendationsService.get(),
    ])
      .pipe(
        map(([days, recommendations]) => {
          recommendations = _.keyBy(recommendations, 'name');
          this.recommendations = recommendations;

          for (const day of days) {
            day.caloriesDiff = day.calories - recommendations.calories?.amount;
            day.fatsDiff = day.fats - recommendations.fats?.amount;
            day.proteinsDiff = day.proteins - recommendations.proteins?.amount;
            day.carbohydratesDiff = day.carbohydrates - recommendations.carbohydrates?.amount;
          }

          return days;
        }),
      )
      .subscribe(
        (data) => {
          this.days = data;
        },
        (e) => {
          const body = e.error.message.join ? e.error.message.join(', ') : e.error.message;
          this.showToast('danger', 'Failed to load days', body);
        },
      );
  }

  private computeIngredientsPropSum(ingredients: any[], prop: string): number {
    return _.reduce(ingredients, (sum, item) => {
      return sum + (item.amount * item.ingredient[prop]) / 100;
    }, 0);
  }

  private computeDayIngredientsPropSum(day: DayInterface, prop: string): number {
    const meals = ['breakfast', 'snack1', 'lunch', 'snack2', 'dinner'];
    let sum = 0;

    for (const meal of meals) {
      sum += this.computeIngredientsPropSum(day[meal]?.mealToIngredients || [], prop);
    }

    return sum;
  }

  public deleteMeal(id: number): void {
    const confirmed = confirm('Are you sure you want to delete this meal?');

    if (confirmed) {
      this.mealsService.delete(id)
        .subscribe(
          () => {
            this.mealsService.refresh();
            this.daysService.refresh();
          },
          (e) => {
            const body = e.error.message.join ? e.error.message.join(', ') : e.error.message;
            this.showToast('danger', 'Failed to delete', body);
          },
        );
    }
  }

  public deleteDay(id: number): void {
    const confirmed = confirm('Are you sure you want to delete this day?');

    if (confirmed) {
      this.daysService.delete(id)
        .subscribe(
          () => {
            this.daysService.refresh();
          },
          (e) => {
            const body = e.error.message.join ? e.error.message.join(', ') : e.error.message;
            this.showToast('danger', 'Failed to delete', body);
          },
        );
    }
  }

  public editDay(id: number): void {
    this.dialogService.open(AddDayComponent, {
      context: {
        title: 'EDIT DAY',
        addDaySubject: this.addDaySubject,
      },
    });
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 5000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false,
    };

    this.toastrService.show(body, title, config);
  }

  public openAddMealForm() {
    this.dialogService.open(AddMealComponent, {
      context: {
        title: 'NEW MEAL',
        addMealSubject: this.addMealSubject,
      },
    });
  }

  public openAddDayForm() {
    this.dialogService.open(AddDayComponent, {
      context: {
        title: 'NEW DAY',
        addDaySubject: this.addDaySubject,
      },
    });
  }
}
