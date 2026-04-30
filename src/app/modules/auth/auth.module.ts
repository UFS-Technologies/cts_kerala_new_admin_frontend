import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared-module/shared-module';

import { AuthRoutes } from './auth.routing'
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    RouterModule.forChild(AuthRoutes),
    SharedModule,
  ],
  declarations: [
    AuthComponent,
    LoginComponent
  ]

})

export class AuthModule { }
