import { Component, OnInit,Input,Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of as observableOf, merge, from } from 'rxjs';
import { Account_Voucher_Service } from '../../../services/Account_Voucher.service';
import { Client_Accounts_Service } from '../../../services/Client_Accounts.service';
// import { Company } from '../../../models/Company';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Voucher_Type } from '../../../models/Voucher_Type';
import {Account_Voucher} from '../../../models/Account_Voucher';
import { Client_Accounts} from '../../../models/Client_Accounts';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component'
import {FormControl} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: {
    dateInput: 'DD/MM/YYYY',
    },
    display: {
    dateInput: 'DD/MM/YYYY',monthYearLabel: 'MMM YYYY',dateA11yLabel: 'DD/MM/YYYY',monthYearA11yLabel: 'MMMM YYYY',
    },
    };
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material';
import { debuglog } from 'util';

@Component({
        selector: 'app-Ledger',
        templateUrl: './Ledger.component.html',
        styleUrls: ['./Ledger.component.css'],
        providers: [
                {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
                {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
              ],
})
export class LedgerComponent implements OnInit {
        Entry_View:boolean=false;
        myInnerHeight: number;
        EditIndex: number;
        color = 'primary';  
        mode = 'indeterminate';
        value = 50;
        issLoading: boolean;
        array:any;

        month: any;
        year: any;
        date: any;
        d: Date;
        day: any;
        Total_Entries:Number=0;
        Login_User:string="0";

        Search_FromDate:Date=new Date();
        Search_ToDate:Date=new Date();
        Look_In_Date:Boolean=true;
        Voucher_Type_Data:Voucher_Type[]; 
        Voucher_Type_Search:Voucher_Type=new Voucher_Type();
        Voucher_Type_Temp:Voucher_Type=new Voucher_Type();
        From_Party_Search:Client_Accounts=new Client_Accounts();
        Client_Accounts_Data:Client_Accounts[]
        Accounts_Data:any;
        Search_Date:Date=new Date();
       
        // Print_Company_:Company=new Company();
        Print_Date_:Date;
        Image_Url:string;
        Company_Sign:string;
        Company_Seal:string;
        Client_Accounts_Data_:Client_Accounts[]
        Print_Client1_:Client_Accounts=new Client_Accounts();
        FromAccount_:Client_Accounts=new Client_Accounts();
        Account_Voucher_:Account_Voucher= new Account_Voucher();
        // Company_Data:Company[];
constructor(public Account_Voucher_Service_:Account_Voucher_Service, public Client_Accounts_Service_:Client_Accounts_Service,private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{    
        this.Search_FromDate=new Date();
        this.Login_User=localStorage.getItem("Login_User");
        this.array=Get_Page_Permission(39);
        if(this.array==undefined || this.array==null)
        {
        }
        else 
        {
        this.Page_Load()
        }
}
Page_Load()
 {   
        this.myInnerHeight = (window.innerHeight);
        this.myInnerHeight = this.myInnerHeight - 200;
        this.Search_FromDate=new Date();
        this.Search_ToDate=new Date();
        this.Search_Date=this.New_Date(this.Search_Date);
        this.Search_Date=new Date();
        this.Get_Voucher_Type();
        this.Search_Company();
}
trackByFn(index, item) 
{
        return index;
 }
New_Date(Date_)
{
        this.date=Date_;
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth() + 1;
        if (this.month < 10) {
        this.month = "0" + this.month;
        }
        this.day = this.date.getDate().toString();
        if (Number.parseInt(this.day) <10) {
        this.day = "0" + this.day;
        }
        this.date = this.year + "-" + this.month + "-" + this.day;
        return this.date;
}
Get_Voucher_Type() 
{
        this.Account_Voucher_Service_.Get_Voucher_Type().subscribe(Rows => { 
        if(Rows!=undefined)
        {
        this.Voucher_Type_Data = Rows[0];
        this.Voucher_Type_Temp.Voucher_Type_Id = 0;
        this.Voucher_Type_Temp.Voucher_Type_Name = "All";
        this.Voucher_Type_Data.unshift(Object.assign({},this.Voucher_Type_Temp));
        this.Voucher_Type_Search = this.Voucher_Type_Data[0];
        }
        },
        Rows => 
        {
        //  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        });
}
Print_Click()
{       
        if (this.From_Party_Search.Client_Accounts_Id== null ||this.From_Party_Search.Client_Accounts_Id == 0 ||this.From_Party_Search.Client_Accounts_Id == undefined) 
        {
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'please select Account', Type: "3" } });
        }
          else
 { 
        this.Get_Client_Accounts();
          
       
        let popupWinindow
        let innerContents = document.getElementById("Print_Div").innerHTML;
        popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
        popupWinindow.document.close();  
 }    
}
Search_Company() 
{
         
//     this.Account_Voucher_Service_.Search_Company().subscribe(Rows => {
         
//     this.Company_Data = Rows[0];
//     this.Print_Company_ = this.Company_Data[0];
//     this.Image_Url='/tvm_admin_assets/img/'+this.Print_Company_.Company_Id+'.jpg';
//     this.Company_Sign='/tvm_admin_assets/img/Sign_'+this.Print_Company_.Company_Id+'.jpg';
//     this.Company_Seal='/tvm_admin_assets/img/Seal_'+this.Print_Company_.Company_Id+'.jpg';  
//     },
//     Rows => 
//     {
//       const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
//     });
}
Get_Client_Accounts() 
{
     
    this.Client_Accounts_Service_.Get_Client_Accounts(this.From_Party_Search.Client_Accounts_Id ).subscribe(Rows => {
         
        this.Client_Accounts_Data_ = Rows[0];
    this.Print_Client1_ = this.Client_Accounts_Data_[0];
    },
      Rows => 
    {
    //  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
}


Get_Client_Accounts_Typeahead(event: any)
{
         
var Value = "";
if (event.target.value == "")
Value = undefined;
else
Value = event.target.value;
this.Account_Voucher_Service_.Get_Client_Accounts_Typeahead(Value).subscribe(Rows => {
if (Rows != null) {
this.Client_Accounts_Data = Rows[0];
}
},
Rows => { 
 const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); });
this.issLoading=false;
}

display_FromAccount(Client_Accounts_e: Client_Accounts)
{
  if (Client_Accounts_e) { return Client_Accounts_e.Client_Accounts_Name;  }
}
Search_Ledger()
        {
 var ClientAccounts_Id=0,Voucher_Type_Id=0;
    if (this.From_Party_Search.Client_Accounts_Id== null ||this.From_Party_Search.Client_Accounts_Id == 0 ||this.From_Party_Search.Client_Accounts_Id == undefined) 
    {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'please select Account', Type: "3" } });
    }
  else
 {
        if (this.From_Party_Search != undefined && this.From_Party_Search!=null)
        if (this.From_Party_Search.Client_Accounts_Id != undefined && this.From_Party_Search.Client_Accounts_Id != null)
        ClientAccounts_Id = this.From_Party_Search.Client_Accounts_Id;

        if (this.Voucher_Type_Search != undefined && this.Voucher_Type_Search!=null)
        if (this.Voucher_Type_Search.Voucher_Type_Id != undefined && this.Voucher_Type_Search.Voucher_Type_Id != null)
        Voucher_Type_Id = this.Voucher_Type_Search.Voucher_Type_Id;

        this.issLoading=true;
         
        this.Account_Voucher_Service_.Search_Ledger(moment(this.Search_FromDate).format('YYYY-MM-DD'),moment(this.Search_ToDate).format('YYYY-MM-DD') , ClientAccounts_Id, Voucher_Type_Id).subscribe(Rows =>        
        {
    
        this.Accounts_Data=Rows[0];
        this.Total_Entries=this.Accounts_Data.length;
        
        if (Rows != null) {
                this.Client_Accounts_Data_ = Rows[0];
                this.Print_Client1_ = this.Client_Accounts_Data_[0];           
            }
        if(this.Accounts_Data.length==0)
        {
          const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class' ,data:{Message:'No Details Found',Type: "3" }});
        }
        this.issLoading=false;
        },
        Rows => 
        { 
                this.issLoading=false;
         const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
         });
        }
}    

 }

