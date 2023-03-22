import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import _ from 'lodash';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { IngredientsService } from '../../../ingredients/ingredients.service';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

export interface Group {
  name: string;
  children: any[];
}

@Component({
  selector: 'meal-ingredient',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './meal-ingredient.component.html',
})
export class MealIngredientComponent implements OnInit {

  groups: Group[];
  filteredGroups$: Observable<Group[]>;
  inputFormControl: FormControl;

  public ingredients: any[];

  constructor(
    private ingredientService: IngredientsService,
    private toastrService: NbToastrService,
  ) {}

  ngOnInit() {
    this.inputFormControl = new FormControl();

    this.ingredientService.get()
      .subscribe(
        (data) => {
          const groupedIngredients = _.groupBy(data, function (item) {
            return item.category;
          });

          this.groups = [];
          for (const groupName in groupedIngredients) {
            if (!groupedIngredients.hasOwnProperty(groupName)) {
              continue;
            }

            this.groups.push({
              name: groupName,
              children: groupedIngredients[groupName],
            });
          }

          this.initDropdown();
        },
        (e) => {
          const body = e.error.message.join ? e.error.message.join(', ') : e.error.message;
          this.showToast('danger', 'Failed to load data', body);
        },
      );
  }

  private initDropdown() {
    this.filteredGroups$ = of(this.groups);
    this.filteredGroups$ = this.inputFormControl.valueChanges
      .pipe(
        startWith(''),
        map(filterString => this.filter(filterString)),
      );
  }

  private filterChildren(children: any[], filterValue: string) {
    return children.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  private filter(value: string): Group[] {
    const filterValue = value.toLowerCase();
    return this.groups
      .map(group => {
        return {
          name: group.name,
          children: this.filterChildren(group.children, filterValue),
        };
      })
      .filter(group => group.children.length);
  }

  trackByFn(index, item) {
    return item.name;
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

}
