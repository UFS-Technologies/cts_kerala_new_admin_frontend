import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { UserData } from '../../services/user-data';
import { Router } from '@angular/router';
// import { ROUTES } from '../sidebar/sidebar.component';
import { MatButtonModule, MatMenuModule } from '@angular/material';
declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  Menu_Id:string;
  Save:string;
  Delete:string;
  View:string;
  Edit:string;
  Menu_Type:boolean;
}

declare interface PointerInfo {
 Root_Index:number;
 
 
}
export var ROUTES: RouteInfo[] = [];
export var Pointer_Table: number[] = []
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
    mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;
    uname:string;


    menuItems: any[];
    menuArray: any[];
    constructor(location: Location, public userData: UserData, private element: ElementRef, private router: Router) {
        this.location = location;
        this.sidebarVisible = false;
        var retrievedObject=localStorage.getItem('Routes_Temp');
        ROUTES=JSON.parse(retrievedObject);
        
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        var retrievedPointer=localStorage.getItem('Pointer_Temp');
        Pointer_Table=JSON.parse(retrievedPointer);
       // this.menuArray = Pointer_Table.filter(menuItem => menuItem);
        this.menuArray = Pointer_Table
       ;
    }
  
    ngOnInit() {

        this.uname=localStorage.getItem('uname');
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.listTitles = ROUTES.filter(listTitle => listTitle);
    

const navbar: HTMLElement = this.element.nativeElement;

        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.router.events.subscribe((event) => {
            this.sidebarClose();
            var $layer: any = document.getElementsByClassName('close-layer')[0];
            if ($layer) {
                $layer.remove();
                this.mobile_menu_visible = 0;
            }
        });
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            // toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        // this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function () {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function () {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            } else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function () {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function () { //asign a function
                body.classList.remove('nav-open');
                this.mobile_menu_visible = 0;
                $layer.classList.remove('visible');
                setTimeout(function () {
                    $layer.remove();
                    $toggle.classList.remove('toggled');
                }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };
    isMobileMenu() {
        if ($(window).width() > 991) {
          return false;
        }
        return true;
      };
      isDesktopMenu() {
       
        if ($(window).width() < 991) {
          return false;
        }
        return true;
      };
    logout() {
        this.userData.logout();
    
        // localStorage.removeItem("Routes_Temp");
        ROUTES=[];
        Pointer_Table=[];
        localStorage.setItem("Routes_Temp",JSON.stringify(ROUTES));
        localStorage.setItem("Pointer_Temp",JSON.stringify(Pointer_Table));
         localStorage.removeItem("Login_User");        
        this.router.navigateByUrl('/auth/login');
      }
    getView() {

        return ("hai");
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(1);
        }

        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }
    getTitle() {
       // return ("hai");
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(1);
        }

        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }
}