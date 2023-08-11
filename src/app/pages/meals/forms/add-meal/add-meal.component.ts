import { Component, Input, OnInit } from '@angular/core';
import { NbComponentStatus, NbDialogRef, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Observable, of, Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { IngredientsService } from '../../../ingredients/ingredients.service';
import _ from 'lodash';
import { MealsService } from '../../meals.service';
import { MealInterface } from '../../meal.interface';
import { MealRecommendationsService } from "../../../recommendations/meal-recommendations.service";

export interface MealIngredient {
  ingredient: any;
  amount: number;
}

@Component({
  selector: 'ngx-showcase-dialog',
  templateUrl: 'add-meal.component.html',
  styleUrls: ['add-meal.component.scss'],
})
export class AddMealComponent implements OnInit {
  @Input() title: string;
  @Input() addMealSubject: Subject<MealInterface>;
  public ingredients: any[];
  formGroup: FormGroup;
  mealIngredients: MealIngredient[] = [];
  mealRecommendations: any;
  meal: any = {};

  constructor(
    protected ref: NbDialogRef<AddMealComponent>,
    private ingredientService: IngredientsService,
    private mealService: MealsService,
    private toastrService: NbToastrService,
    private fb: FormBuilder,
    private mealRecommendationsService: MealRecommendationsService,
  ) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: [null, [Validators.required]],
      ingredient: [null],
      amount: [null],
    });

    this.mealRecommendationsService.get()
      .subscribe(
        (data) => {
          data = _.keyBy(data, 'name');
          this.mealRecommendations = data;

          this.computeTotalElementsSum();
          this.computeTotalElementsRecommendationsDiff();
        },
        (e) => {
          const body = e.error.message.join ? e.error.message.join(', ') : e.error.message;
          this.showToast('danger', 'Failed to load meal recommendations', body);
        }
      );

    this.ingredientService.get()
      .subscribe(
        (data) => {
          this.ingredients = data.map((ingredient) => {
            ingredient.title = `${ingredient.name} - ${ingredient.calories} calories`;
            return ingredient;
          });
        },
        (e) => {
          const body = e.error.message.join ? e.error.message.join(', ') : e.error.message;
          this.showToast('danger', 'Failed to load data', body);
        },
      );
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

  submit(): void {
    const ingredients = this.mealIngredients.map((item: MealIngredient) => {
      return {
        ingredient: {id: item.ingredient.id},
        amount: item.amount,
      };
    });

    const data = {
      name: this.formGroup.value.name,
      ingredients: ingredients,
    };

    this.mealService.create(data)
      .subscribe(
        (response) => {
          const meal = response.pop();
          this.ref.close();
          this.showToast('success', 'Meal added', `${meal.name} added successfully`);
          this.addMealSubject.next(meal);
        },
        (e) => {
          const body = e.error.message.join ? e.error.message.join(', ') : e.error.message;
          this.showToast('danger', 'Failed to create meal', body);
        },
      );
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && control.touched;
  }

  public removeIngredient(id: number): void {
    _.remove(this.mealIngredients, (item) => item.ingredient.id === id);
    this.computeTotalElementsSum();
    this.computeTotalElementsRecommendationsDiff();
  }

  public addIngredient(): void {
    const formValue = this.formGroup.value;

    if (formValue.ingredient === null || formValue.amount === null) {
      this.showToast('danger', 'Ingredient not added', 'Select both ingredient and amount');

      return;
    }

    if (_.find(this.mealIngredients, (item) => item.ingredient.id === formValue.ingredient.id)) {
      this.showToast('danger', 'Cannot add ingredient twice', `${formValue.ingredient.name} is already added`);

      return;
    }

    this.mealIngredients.push({
      ingredient: formValue.ingredient,
      amount: formValue.amount,
    });

    this.formGroup.controls.ingredient.setValue(null);
    this.formGroup.controls.amount.setValue(null);

    this.computeTotalElementsSum();
    this.computeTotalElementsRecommendationsDiff();
  }

  private computeIngredientsPropSum(ingredients: any[], prop: string): number {
    return _.reduce(ingredients, (sum, item) => {
      return sum + (item.amount * item.ingredient[prop]) / 100;
    }, 0);
  }

  private computeTotalElementsSum(): void {
    this.meal.calories = this.computeIngredientsPropSum(this.mealIngredients || [], 'calories');
    this.meal.fats = this.computeIngredientsPropSum(this.mealIngredients || [], 'fats');
    this.meal.carbohydrates = this.computeIngredientsPropSum(this.mealIngredients || [], 'carbohydrates');
    this.meal.proteins = this.computeIngredientsPropSum(this.mealIngredients || [], 'proteins');
  }

  private computeTotalElementsRecommendationsDiff(): void {
    this.meal.caloriesDiff = this.meal.calories - this.mealRecommendations.calories?.amount;
    this.meal.fatsDiff = this.meal.fats - this.mealRecommendations.fats?.amount;
    this.meal.proteinsDiff = this.meal.proteins - this.mealRecommendations.proteins?.amount;
    this.meal.carbohydratesDiff = this.meal.carbohydrates - this.mealRecommendations.carbohydrates?.amount;
  }

  public close() {
    this.ref.close();
  }
}
