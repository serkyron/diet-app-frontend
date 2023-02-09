import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MealsComponent } from './meals.component';
import { TreeGridComponent } from "./tree-grid/tree-grid.component";

const routes: Routes = [{
  path: '',
  component: MealsComponent,
  children: [
    {
      path: '',
      component: TreeGridComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
  MealsComponent,
  TreeGridComponent,
];
