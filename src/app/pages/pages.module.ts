import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { IngredientsService } from "./ingredients/ingredients.service";
import { NbAuthModule } from "@nebular/auth";
import { RecommendationsService } from "./recommendations/recommendations.service";

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    NbAuthModule,
  ],
  declarations: [
    PagesComponent,
  ],
  providers: [
    IngredientsService,
    RecommendationsService,
  ],
})
export class PagesModule {
}
