import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbAuthJWTInterceptor, NbAuthModule } from '@nebular/auth';
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule
} from '@nebular/theme';
import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from "./services/auth-guard.service";
import { SecondAuthGuard } from "./services/second-auth-guard.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,

    NbAuthModule,
  ],
  declarations: [
    LoginComponent,
  ],
  providers: [
    AuthGuard,
    SecondAuthGuard,
    NbAuthJWTInterceptor
  ],
})
export class AuthModule {
}
