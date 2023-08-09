import { Component, Input, OnInit } from '@angular/core';
import { NbComponentStatus, NbDialogRef, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Observable, of, Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { IngredientsService } from '../../../ingredients/ingredients.service';
import _ from 'lodash';
import { MealsService } from '../../meals.service';
import { MealInterface } from '../../meal.interface';

export interface MealIngredient {
  ingredient: any;
  amount: number;
}

@Component({
  selector: 'ngx-showcase-dialog',
  templateUrl: 'edit-meal.component.html',
  styleUrls: ['edit-meal.component.scss'],
})
export class EditMealComponent implements OnInit {
  @Input() title: string;
  @Input() editMealSubject: Subject<MealInterface>;
  @Input() meal: MealInterface;
  public ingredients: any[];
  formGroup: FormGroup;
  mealIngredients: MealIngredient[] = [];

  constructor(
    protected ref: NbDialogRef<EditMealComponent>,
    private ingredientService: IngredientsService,
    private mealService: MealsService,
    private toastrService: NbToastrService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.mealIngredients = this.meal.mealToIngredients;

    this.formGroup = this.fb.group({
      name: [this.meal.name, [Validators.required]],
      ingredient: [null],
      amount: [null],
    });

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

    this.mealService.update(this.meal.id, data)
      .subscribe(
        (response) => {
          const meal = response.pop();
          this.ref.close();
          this.showToast('success', 'Meal updated', `${meal.name} updated successfully`);
          this.editMealSubject.next(meal);
        },
        (e) => {
          const body = e.error.message.join ? e.error.message.join(', ') : e.error.message;
          this.showToast('danger', 'Failed to update meal', body);
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
  }

  private computeIngredientsPropSum(ingredients: any[], prop: string): number {
    return _.reduce(ingredients, (sum, item) => {
      return sum + (item.amount * item.ingredient[prop]) / 100;
    }, 0);
  }

  private computeTotalElementsSum(): void {
    this.meal.calories = this.computeIngredientsPropSum(this.meal.mealToIngredients || [], 'calories');
    this.meal.fats = this.computeIngredientsPropSum(this.meal.mealToIngredients || [], 'fats');
    this.meal.carbohydrates = this.computeIngredientsPropSum(this.meal.mealToIngredients || [], 'carbohydrates');
    this.meal.proteins = this.computeIngredientsPropSum(this.meal.mealToIngredients || [], 'proteins');
  }
}
