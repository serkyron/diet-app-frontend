import { NgModule } from '@angular/core';
import {
  NbAutocompleteModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule, NbIconModule,
  NbInputModule,
  NbMenuModule,
} from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { IngredientsService } from './ingredients/ingredients.service';
import { NbAuthModule } from '@nebular/auth';
import { RecommendationsService } from './recommendations/recommendations.service';
import { MealsService } from './meals/meals.service';
import { DaysService } from './meals/days.service';
import { AddMealComponent } from './meals/forms/add-meal/add-meal.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgSelectModule } from "@ng-select/ng-select";
import { AddDayComponent } from "./meals/forms/add-day/add-day.component";
import { EditDayComponent } from "./meals/forms/edit-day/edit-day.component";
import { EditMealComponent } from "./meals/forms/edit-meal/edit-meal.component";

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    NbAuthModule,
    NbCardModule,
    NbCheckboxModule,
    NbInputModule,
    NbButtonModule,
    NbAutocompleteModule,
    ReactiveFormsModule,
    NbIconModule,
    NgSelectModule,
    FormsModule,
  ],
  declarations: [
    PagesComponent,
    AddMealComponent,
    AddDayComponent,
    EditDayComponent,
    EditMealComponent,
  ],
  providers: [
    IngredientsService,
    RecommendationsService,
    MealsService,
    DaysService,
  ],
})
export class PagesModule {
}
