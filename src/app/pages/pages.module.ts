import { NgModule } from '@angular/core';
import {
  NbAutocompleteModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
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
import { MealIngredientComponent } from './meals/form-elements/meal-ingredient/meal-ingredient.component';
import { ReactiveFormsModule } from "@angular/forms";

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
  ],
  declarations: [
    PagesComponent,
    AddMealComponent,
    MealIngredientComponent,
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
