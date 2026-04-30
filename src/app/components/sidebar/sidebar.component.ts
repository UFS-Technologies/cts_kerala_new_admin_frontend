import { Component, OnInit } from '@angular/core';
import { UserData } from '../../services/user-data';
import { Router } from '@angular/router';


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
///export var menuItems: any[] = [];

// export var Pointer_Table: PointerInfo[] = [
 
// ]
export function Set_Page_Permission(ROUTES_,POINTER_)
{
  
  ROUTES=ROUTES_;
 
Pointer_Table=POINTER_;  
 
}

export function clear_Route()
{
  ROUTES=[];
  Pointer_Table=[];  
}

export  function Get_Page_Permission(Menu_Id)
{
 

var RootIndex_Value=Pointer_Table[Menu_Id-1];
;
//if()
{
  // if (Menu_Id==21){
  // console.log(ROUTES)
  // console.log(Pointer_Table)
  // //console.log(Menu_Id)
  // console.log(RootIndex_Value)
  // }
if(RootIndex_Value!=undefined && RootIndex_Value<=ROUTES.length-1 && RootIndex_Value>-1)
  return{'View':ROUTES[RootIndex_Value].View,'Save':ROUTES[RootIndex_Value].Save,'Edit':ROUTES[RootIndex_Value].Edit,'Delete':ROUTES[RootIndex_Value].Delete} ;
else
  return undefined;
}
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
 
Login_Id:string="0";
menuItems:any[];
menuindex:any[];
uname:string;

Menus:any[];
  constructor(
    public userData: UserData,
    public router: Router,

  ) {
    
    this.menuItems= ROUTES.filter(menuItem => menuItem);
    // this.router.navigateByUrl('Leads');
   }

  ngOnInit() {
    
    // this.menuItems= ROUTES.filter(menuItem => menuItem);
    // this.router.navigateByUrl('Leads');

this.uname=localStorage.getItem('uname');
var retrievedObject=localStorage.getItem('Routes_Temp');
ROUTES=JSON.parse(retrievedObject);

var retrievedPointer=localStorage.getItem('Pointer_Temp');
Pointer_Table=JSON.parse(retrievedPointer);
this.menuindex=Pointer_Table;
this.menuItems= ROUTES.filter(menuItem => menuItem);

  }
  isMobileMenu() {
   
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
  Document_Type() {
   
    this.router.navigateByUrl('/Document_Type');
  }

  
  logout() {
    this.userData.logout();

    // localStorage.removeItem("Routes_Temp");
    ROUTES=[];
    Pointer_Table=[];
    localStorage.setItem("Routes_Temp",JSON.stringify(ROUTES));
    localStorage.setItem("Pointer_Temp",JSON.stringify(Pointer_Table));
    //localStorage.removeItem("Pointer_Temp");
     localStorage.removeItem("Login_User");

    
    this.router.navigateByUrl('/auth/login');

//     
//     var retrievedObject=localStorage.getItem('Routes_Temp');
// ROUTES=JSON.parse(retrievedObject);

// var retrievedPointer=localStorage.getItem('Pointer_Temp');
// Pointer_Table=JSON.parse(retrievedPointer);
  }

}
