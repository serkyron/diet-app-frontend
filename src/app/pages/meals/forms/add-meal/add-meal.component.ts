import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Observable, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

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

  constructor(protected ref: NbDialogRef<AddMealComponent>) {}

  ngOnInit() {
  }

  dismiss() {
    this.ref.close();
  }
}
