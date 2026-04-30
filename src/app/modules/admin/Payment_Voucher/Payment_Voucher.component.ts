import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Payment_Voucher_Service } from '../../../services/Payment_Voucher.service';
import { Account_Voucher_Service } from '../../../services/Account_Voucher.service';
import { Client_Accounts_Service } from '../../../services/Client_Accounts.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Payment_Voucher } from '../../../models/Payment_Voucher';
import { Client_Accounts } from '../../../models/Client_Accounts';
// import { Company } from '../../../models/Company';
import { PaymentMode } from '../../../models/PaymentMode';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {MatDialog} from '@angular/material';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
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
@Component({
selector: 'app-Payment_Voucher',
templateUrl: './Payment_Voucher.component.html',
styleUrls: ['./Payment_Voucher.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},],

})
export class Payment_VoucherComponent implements OnInit {
Payment_Voucher_Data:Payment_Voucher[]
Payment_Voucher_:Payment_Voucher= new Payment_Voucher();
Payment_Voucher_Name_Search:string;

Payment_Mode_Data:PaymentMode[]
Payment_Mode_:PaymentMode=new PaymentMode();
Mode_Temp:PaymentMode=new PaymentMode();
FromAccount_:Client_Accounts=new Client_Accounts();
Client_Accounts_Data:Client_Accounts[]
From_Client_Accounts_Data:Client_Accounts[]
Print_Client_:Client_Accounts=new Client_Accounts();
Client_Accounts_Data_:Client_Accounts[]
// Company_Temp:Company=new Company();
// Company_Data:Company[];
// Company_Search:Company=new Company();
// Print_Company_:Company=new Company();

Image_Url:string;
Company_Sign:string;
Company_Seal:string;

ToAccount_:Client_Accounts=new Client_Accounts();
Search_FromDate:Date=new Date();
Search_ToDate:Date=new Date();
FromAccount_Search:Client_Accounts=new Client_Accounts();
ToAccount_Search:Client_Accounts=new Client_Accounts();
Voucher_No_search:number;
FromAccount_Temp:Client_Accounts=new Client_Accounts();
ToAccount_Temp:Client_Accounts=new Client_Accounts();

Print_Date_:Date;
Entry_View:boolean=false;
myInnerHeight: number;
EditIndex: number;
 Total_Entries: number=0;
color = 'primary';
mode = 'indeterminate';
value = 50;
Total_Amounts:number=0;
Look_In_Date:Boolean=true;
month: any;
day: any;
date:any;
year: any;
Login_User:string="0";
issLoading: boolean;
Permissions: any;
Permissions1:any;
Payment_Voucher_Edit:boolean;
Payment_Voucher_Save:boolean;
Payment_Voucher_Delete:boolean;
Payment_Voucher_Status:boolean;
Payment_Voucher_Print:boolean;

constructor(public Payment_Voucher_Service_:Payment_Voucher_Service,public Client_Accounts_Service_:Client_Accounts_Service,public Account_Voucher_Service_:Account_Voucher_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
this.Login_User=localStorage.getItem("Login_User");   
this.Permissions = Get_Page_Permission(40);
this.Permissions1=Get_Page_Permission(40);
if(this.Permissions==undefined || this.Permissions==null)
{
localStorage.removeItem('token');
this.router.navigateByUrl('/auth/login');
}
else
{
this.Payment_Voucher_Edit=this.Permissions.Edit;
this.Payment_Voucher_Save=this.Permissions.Save;
this.Payment_Voucher_Delete=this.Permissions.Delete;
this.Payment_Voucher_Status=this.Permissions1.status;
this.Page_Load()
}
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
    Print_Date(Date_)
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
    this.date = this.day + "-" + this.month + "-" + this.year;
    return this.date;
    }

Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 200;
 
    //this.Accounts_Typeahead();
    this.Search_FromDate=this.New_Date(this.Search_FromDate);
    this.Search_ToDate=this.New_Date(this.Search_ToDate);
    this.Clr_Payment_Voucher();
    this.Search_Payment_Voucher();
    this.Get_Payment_Mode();
    this.Entry_View=false;
    this.Payment_Voucher_Print=false;
    
    this.Search_Company();
}
From_Accounts_Typeahead(event: any)
{
     
    this.issLoading=true;
var Value = "";
if (event.target.value == "")
Value = undefined;
else
Value = event.target.value;
 
this.Account_Voucher_Service_.Accounts_Typeahead('11',Value).subscribe(Rows => {
     
if (Rows != null) {
this.From_Client_Accounts_Data = Rows[0];
//this.Print_Client_=this.Client_Accounts_Data[0];
}
this.issLoading=false;
},
Rows => {
    this.issLoading=false;
});
}

Accounts_Typeahead(event: any)
{
     
   this.issLoading=true;
var Value = "";
if (event.target.value == "")
Value = undefined;
else
Value = event.target.value;
 
this.Account_Voucher_Service_.Accounts_Typeahead('1,2,3',Value).subscribe(Rows => {
     
if (Rows != null) {
this.Client_Accounts_Data = Rows[0];
//this.Print_Client_=this.Client_Accounts_Data[0];
}

this.issLoading=false;
},
Rows => {
    this.issLoading=false;
});
}
Get_Client_Accounts() 
{
     
        this.Client_Accounts_Service_.Get_Client_Accounts(this.FromAccount_.Client_Accounts_Id).subscribe(Rows => {
         
        this.Client_Accounts_Data_ = Rows[0];
      //  this.Company_Info = Rows[0];
        // this.Company_Temp.Company_Id = 0;
        // this.Company_Temp.Company_Name = "Select";
        // this.Company_Data.unshift(this.Company_Temp);
        this.Print_Client_ = this.Client_Accounts_Data_[0];
},
Rows => 
{
//  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
});
}

Get_Payment_Mode() 
        {
         
                 
        this.Payment_Voucher_Service_.Get_Payment_Mode().subscribe(Rows => {
                 
        this.Payment_Mode_Data = Rows[0];
        this.Mode_Temp.Payment_Mode_Id = 0;
    this.Mode_Temp.Payment_Mode_Name = "Select";
    this.Payment_Mode_Data.unshift(this.Mode_Temp);
    this.Payment_Mode_ = this.Payment_Mode_Data[0];
        },
        Rows => 
        {
        //  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        });
        }
Search_Company() 
        {
             
        //         this.Account_Voucher_Service_.Search_Company().subscribe(Rows => {
                 
        //         this.Company_Data = Rows[0];
        //       //  this.Company_Info = Rows[0];
        //         // this.Company_Temp.Company_Id = 0;
        //         // this.Company_Temp.Company_Name = "Select";
        //         // this.Company_Data.unshift(this.Company_Temp);
        //         this.Print_Company_ = this.Company_Data[0];
        // },
        // Rows => 
        // {
        // //  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        // });
}

    
Print_Click()
{
           
  this.Get_Client_Accounts();

                // this.Image_Url='/tvm_admin_assets/img/'+this.Print_Company_.Company_Id+'.jpg';
                // this.Company_Sign='/tvm_admin_assets/img/Sign_'+this.Print_Company_.Company_Id+'.jpg';
                // this.Company_Seal='/tvm_admin_assets/img/Seal_'+this.Print_Company_.Company_Id+'.jpg';
          let popupWinindow
           let innerContents = document.getElementById("Print_Div").innerHTML;
           popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
           popupWinindow.document.open();
           popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
           popupWinindow.document.close();
       // }
//}
}
Create_New()
{
this.Payment_Voucher_Print=false;
this.Clr_Payment_Voucher();
     
//if(this.Account_Voucher_Status==true)
{
    this.Payment_Voucher_.Payment_Status=0;
   }
this.Entry_View = true;

}
Close_Click()
{
    let top = document.getElementById('Topdiv');
    if (top !== null) 
    {
        top.scrollIntoView();
        top = null;
    }
this.Clr_Payment_Voucher();
this.Search_Payment_Voucher();
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}
Address_Change(Address1) 
{ 
    
   // this.Get_Client_Accounts_Change(Client_Accounts_Id);
    this.Payment_Voucher_.Address1=Address1;
}
 Clr_Payment_Voucher()
 {
     
    this.Payment_Voucher_.Payment_Voucher_Id=0;
    this.Payment_Voucher_.Date=new Date();
    this.Payment_Voucher_.Date=this.New_Date(this.Payment_Voucher_.Date);
    this.Payment_Voucher_.Voucher_No=null;
    this.Payment_Voucher_.From_Account_Id=0;
    this.Payment_Voucher_.Amount=null;
    this.Payment_Voucher_.To_Account_Id=0;
    this.Payment_Voucher_.Payment_Mode=0;
    this.Payment_Voucher_.User_Id=0;
    this.FromAccount_=null;
    this.ToAccount_=null;
    this.Payment_Voucher_.Address1="";
    if(this.Payment_Mode_Data!=null && this.Payment_Mode_Data != undefined)
    this.Payment_Mode_=this.Payment_Mode_Data[0];
    this.Payment_Voucher_.Payment_Status=0;
    this.Payment_Voucher_.Description="";
    this.Payment_Voucher_Print=false;
}

Search_Payment_Voucher()
    { 
        var look_In_Date_Value=0,ClientAccount=0,Voucher_No_search_=0,ClientAccounts_Id=0;
        this.Total_Amounts=0;
        if (this.Look_In_Date == true )
        look_In_Date_Value = 1;

        if (this.ToAccount_Search != undefined && this.ToAccount_Search!=null)
        if (this.ToAccount_Search.Client_Accounts_Id != undefined && this.ToAccount_Search.Client_Accounts_Id != null)
        ClientAccounts_Id = this.ToAccount_Search.Client_Accounts_Id;

        if (this.FromAccount_Search != undefined && this.FromAccount_Search!=null)
        if (this.FromAccount_Search.Client_Accounts_Id != undefined && this.FromAccount_Search.Client_Accounts_Id != null)
        ClientAccount= this.FromAccount_Search.Client_Accounts_Id;

    if (this.Voucher_No_search != undefined && this.Voucher_No_search != null && this.Voucher_No_search != 0)
    Voucher_No_search_ = this.Voucher_No_search;

        this.issLoading=true;
    this.Payment_Voucher_Service_.Search_Payment_Voucher(moment(this.Search_FromDate).format('YYYY-MM-DD'), moment(this.Search_ToDate).format('YYYY-MM-DD'),ClientAccount,ClientAccounts_Id,Voucher_No_search_,look_In_Date_Value).subscribe(Rows => {
     
        this.Payment_Voucher_Data=Rows[0];
    
    this.Total_Entries=this.Payment_Voucher_Data.length;

    for(var i=0;i<this.Payment_Voucher_Data.length;i++)
    {
            this.Total_Amounts=Number(this.Total_Amounts)+Number(this.Payment_Voucher_Data[i].Amount);
    }
    if(this.Payment_Voucher_Data.length==0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type: "3" }});
    }
    this.issLoading=false;
    },
    Rows => { 
        this.issLoading=false;
   const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); });
  
}




display_FromAccount(Client_Accounts_e: Client_Accounts) 
    {
         
    if (Client_Accounts_e) { return Client_Accounts_e.Client_Accounts_Name; }
    }
Delete_Payment_Voucher(Payment_Voucher_Id,index)
{
         
    const dialogRef = this.dialogBox.open
    ( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
    {
    this.issLoading=true;
    this.Payment_Voucher_Service_.Delete_Payment_Voucher(Payment_Voucher_Id).subscribe(Delete_status => {
         
    if(Delete_status[0][0].Payment_Voucher_Id_>0){
        this.Total_Entries=this.Total_Entries-1;
        this.Total_Amounts=Number(this.Total_Amounts)-Number(this.Payment_Voucher_Data[index].Amount);
    this.Payment_Voucher_Data.splice(index, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
    }
    else
    {
    //this.Payment_Voucher_Data.splice(index, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
    }
    this.issLoading=false;
    },
    Rows => { 
        this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
    }
    });
}
Save_Payment_Voucher()
{

     
    
    if (this.FromAccount_ == undefined || this.FromAccount_.Client_Accounts_Id == 0 || this.FromAccount_ == null||this.FromAccount_.Client_Accounts_Id==undefined) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select The From account', Type: "3" } });
        }

        else if(this.ToAccount_==undefined||this.ToAccount_==null||this.ToAccount_.Client_Accounts_Id==undefined||this.ToAccount_.Client_Accounts_Id==0)
        {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select The To Account', Type: "3" } });
        }
        else if(this.Payment_Voucher_.Amount==undefined||this.Payment_Voucher_.Amount==null||this.Payment_Voucher_.Amount==undefined||this.Payment_Voucher_.Amount==0)
        {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter the Amount', Type: "3" } });
        }
        
        // else if (this.Payment_Mode_ == null ||this.Payment_Mode_ == undefined || this.Payment_Mode_.Payment_Mode_Id == undefined || this.Payment_Mode_.Payment_Mode_Id == 0) {
        // const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select The Payment Mode', Type: "3" } });
        // }
      
        if (this.Payment_Mode_ == undefined || this.Payment_Mode_ == null || this.Payment_Mode_.Payment_Mode_Id == undefined || this.Payment_Mode_.Payment_Mode_Id==0) 
        {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select The Payment Mode', Type: "3" } });
            return;
        } 
   
else
{



    this.Payment_Voucher_.User_Id=Number(this.Login_User);
    this.Payment_Voucher_.From_Account_Id=this.FromAccount_.Client_Accounts_Id;
    this.Payment_Voucher_.To_Account_Id=this.ToAccount_.Client_Accounts_Id;
    this.Payment_Voucher_.Payment_Mode=this.Payment_Mode_.Payment_Mode_Id;
    this.Payment_Voucher_.Date=this.New_Date(new Date(moment(this.Payment_Voucher_.Date).format('YYYY-MM-DD')));

document.getElementById('Save_Button').hidden=true;
this.issLoading=true;
this.Payment_Voucher_Service_.Save_Payment_Voucher(this.Payment_Voucher_).subscribe(Save_status => {
    

     
Save_status=Save_status[0];
if(Number(Save_status[0].Payment_Voucher_Id_)>0)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
this.Payment_Voucher_Print=true;
this.Payment_Voucher_.Voucher_No=Save_status[0].Voucher_No_;
document.getElementById('Save_Button').hidden=true;
this.Clr_Payment_Voucher();
this.Close_Click();
}
else{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
document.getElementById('Save_Button').hidden=true;
}
this.issLoading=false;
 },
 Rows => { 
     
this.issLoading=false;
      
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
 });
}

}


Edit_Payment_Voucher(Payment_Voucher_e:Payment_Voucher,index)
{
 

this.issLoading=true;
    this.Client_Accounts_Service_.Get_Client_Accounts(Payment_Voucher_e.From_Account_Id).subscribe(Rows => {
         
               if (Rows != null) {
                   this.Client_Accounts_Data_ = Rows[0];
                   this.Print_Client_ = this.Client_Accounts_Data_[0];
             
               }
               this.issLoading = false;
           },
               Rows => {
                    
                   this.issLoading = false;
           const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
               });
this.Entry_View=true;
this.Payment_Voucher_=Payment_Voucher_e;
this.Print_Date_=new Date ( this.Payment_Voucher_.Date);
this.Print_Date_=this.Print_Date(this.Print_Date_);
this.Payment_Voucher_Print=true;
this.Payment_Voucher_=Object.assign({},Payment_Voucher_e);
this.FromAccount_Temp.Client_Accounts_Id=Payment_Voucher_e.From_Account_Id;
this.FromAccount_Temp.Client_Accounts_Name=Payment_Voucher_e.FromAccount_Name;
this.FromAccount_=this.FromAccount_Temp;

this.ToAccount_Temp.Client_Accounts_Id=Payment_Voucher_e.To_Account_Id;
this.ToAccount_Temp.Client_Accounts_Name=Payment_Voucher_e.ToAccount_Name;
this.ToAccount_=this.ToAccount_Temp;
 

for (var i = 0; i < this.Payment_Mode_Data.length; i++) {
    if (Payment_Voucher_e.Payment_Mode == this.Payment_Mode_Data[i].Payment_Mode_Id)
    this.Payment_Mode_ = this.Payment_Mode_Data[i];

}
}
}

