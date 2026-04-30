import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserData } from '../services/user-data';

@Injectable({
    providedIn: 'root'
})
export class CanAdminGuard implements CanActivate {
    constructor(public userData: UserData,private route:Router) { }
    async canActivate() {
const isLogged= this.userData.isLoggedIn();
if(!isLogged){
    this.route.navigateByUrl('/auth/login');
}
        return isLogged;
    }
}
