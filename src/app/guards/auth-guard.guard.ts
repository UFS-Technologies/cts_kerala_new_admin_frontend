import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserData } from '../services/user-data';

@Injectable({
  providedIn: 'root'
})
export class CanAuthGuardGuard implements CanActivate {
  constructor(public userData: UserData) { }
  async canActivate() {
    return !this.userData.isLoggedIn();
  }
}
