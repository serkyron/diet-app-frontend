import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { IngredientsService } from '../../../ingredients/ingredients.service';

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
    // private ingredientService: IngredientsService,
  ) {}

  ngOnInit() {

    this.groups = [
      {
        name: 'Group 1',
        children: [{name: 'Option 11', id: 1}, {name: 'Option 12', id: 2}, {name: 'Option 13', id: 3}],
      },
      {
        name: 'Group 2',
        children: [{name: 'Option 21', id: 3}, {name: 'Option 22', id: 4}, {name: 'Option 23', id: 5}],
      }];

    this.filteredGroups$ = of(this.groups);
    this.inputFormControl = new FormControl();

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

}
