import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { IngredientsService } from "../ingredients.service";

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      saveConfirm: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        hide: true,
      },
      name: {
        title: 'Name',
        type: 'string',
      },
      calories: {
        title: 'Calories',
        type: 'number',
      },
      proteins: {
        title: 'Proteins',
        type: 'number',
      },
      carbohydrates: {
        title: 'Carbohydrates',
        type: 'number',
      },
      fats: {
        title: 'Fats',
        type: 'number',
      },
      category: {
        title: 'Category',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private ingredientsService: IngredientsService) {
    this.ingredientsService.get()
      .subscribe((data) => {
        this.source.load(data)
          .catch((e) => {
            console.log(e.message());
          });
      });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    console.log(event.newData);
    event.confirm.resolve();
  }

  onEditConfirm(event): void {
    console.log(event.newData);
    event.confirm.resolve();
  }
}
