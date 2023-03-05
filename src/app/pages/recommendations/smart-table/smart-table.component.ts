import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { RecommendationsService } from "../recommendations.service";
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from "@nebular/theme";

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
      confirmSave: true,
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
        editor: {
          type: 'list',
          config: {
            list: [
              { value: 'proteins', title: 'Proteins' },
              { value: 'carbohydrates', title: 'Carbohydrates' },
              { value: 'fats', title: 'Fats' },
              { value: 'calories', title: 'Calories' },
            ],
          },
        },
      },
      amount: {
        title: 'Amount',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private ingredientsService: RecommendationsService,
    private toastrService: NbToastrService,
  ) {
    this.loadData();
  }

  private loadData(): void {
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
      this.ingredientsService.delete(event.data.id)
        .subscribe(
          () => {event.confirm.resolve()},
          (e) => {
            event.confirm.reject();
            console.log(e);
          }
        );
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    this.ingredientsService.create(event.newData)
      .subscribe(
        () => {
          event.confirm.resolve();
          this.loadData();
        },
        (e) => {
          event.confirm.reject();
          alert(e.error.message.join(', '));
        }
      );
  }

  onEditConfirm(event): void {
    this.ingredientsService.update(event.newData.id, event.newData)
      .subscribe(
        () => {event.confirm.resolve()},
        (e) => {
          event.confirm.reject();
          alert(e.error.message.join(', '));
        }
      );
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
