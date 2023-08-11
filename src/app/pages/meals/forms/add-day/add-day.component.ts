import { Component, Input, OnInit } from '@angular/core';
import { NbComponentStatus, NbDialogRef, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Observable, of, Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IngredientsService } from '../../../ingredients/ingredients.service';
import { MealsService } from '../../meals.service';
import { DayInterface } from '../../day.interface';
import { DaysService } from '../../days.service';

export interface MealIngredient {
  ingredient: any;
  amount: number;
}

@Component({
  selector: 'ngx-add-day-dialog',
  templateUrl: 'add-day.component.html',
  styleUrls: ['add-day.component.scss'],
})
export class AddDayComponent implements OnInit {
  @Input() title: string;
  @Input() addDaySubject: Subject<DayInterface>;
  public meals: any[];
  formGroup: FormGroup;

  constructor(
    protected ref: NbDialogRef<AddDayComponent>,
    private ingredientService: IngredientsService,
    private mealService: MealsService,
    private dayService: DaysService,
    private toastrService: NbToastrService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: [null, [Validators.required]],
      breakfast: [null],
      snack1: [null],
      lunch: [null],
      snack2: [null],
      dinner: [null],
    });

    this.mealService.get()
      .subscribe(
        (data) => {
          this.meals = data.map((meal) => {
            return meal;
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
    this.dayService.create(this.formGroup.value)
      .subscribe(
        (response) => {
          const day = response.pop();
          this.ref.close();
          this.showToast('success', 'Day added', `${day.name} added successfully`);
          this.addDaySubject.next(day);
        },
        (e) => {
          const body = e.error.message.join ? e.error.message.join(', ') : e.error.message;
          this.showToast('danger', 'Failed to create day', body);
        },
      );
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && control.touched;
  }

  public close() {
    this.ref.close();
  }
}
