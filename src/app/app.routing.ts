import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { CanAuthGuardGuard } from './guards/auth-guard.guard';
import { CanAdminGuard } from './guards/admin.guard';


const routes: Routes = [

  {
    path: 'auth',
    loadChildren: './modules/auth/auth.module#AuthModule',
    canActivate: [CanAuthGuardGuard]
  },
  {
    path: '',
    loadChildren: './modules/admin/admin.module#AdminModule',
    canActivate: [CanAdminGuard]

  },
 
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
