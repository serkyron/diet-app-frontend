import { Component, Input, OnInit } from '@angular/core';
import { NbComponentStatus, NbDialogRef, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Observable, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { IngredientsService } from '../../../ingredients/ingredients.service';

export interface Group {
  name: string;
  children: string[];
}

@Component({
  selector: 'ngx-showcase-dialog',
  templateUrl: 'add-meal.component.html',
  styleUrls: ['add-meal.component.scss'],
})
export class AddMealComponent implements OnInit {
  @Input() title: string;
  public ingredients: any[];

  constructor(
    protected ref: NbDialogRef<AddMealComponent>,
    private ingredientService: IngredientsService,
    private toastrService: NbToastrService,
  ) {}

  ngOnInit() {
    this.ingredientService.get()
      .subscribe(
        (data) => {
          this.ingredients = data;
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

  dismiss() {
    this.ref.close();
  }
}
