import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account_Voucher_Service } from '../../../services/Account_Voucher.service';
import { Client_Accounts_Service } from '../../../services/Client_Accounts.service';
import{OldRegistartion_Service} from'../../../services/OldRegistartion.Service';

import{old_student_registration} from'../../../models/old_student_registration';

import { Journal_Entry_Service } from '../../../services/Journal_Entry.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Account_Voucher } from '../../../models/Account_Voucher';
import { Client_Accounts } from '../../../models/Client_Accounts';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { PaymentMode} from '../../../models/PaymentMode';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {parse: {dateInput: 'DD/MM/YYYY',},
display: {
dateInput: 'DD/MM/YYYY',monthYearLabel: 'MMM YYYY',dateA11yLabel: 'DD/MM/YYYY',monthYearA11yLabel: 'MMMM YYYY',
},
};
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material';import { Result } from '../../../models/Result';
@Component({
selector: 'app-Old_Student_Registration',
templateUrl: './Old_Student_Registration.component.html',
styleUrls: ['./Old_Student_Registration.component.css'],
providers: [
{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
{provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
],
})

export class Old_Student_RegistrationComponent implements OnInit {

Registration_No_Search_:string;
Student_Name_Search_:string;

Search_FromDate:Date=new Date();
Search_ToDate:Date=new Date();

Old_Student_Registration_:old_student_registration=new old_student_registration();
Old_Student_Registration_Data:old_student_registration[];
Entry_View:boolean=false;
myInnerHeight: number;
myTotalHeight: number;
EditIndex: number;
Total_Entries: number=0;

value = 50;
Look_In_Date:Boolean=true;
month: any;
day: any;
date:any;
year: any;
Login_User:string="0";
issLoading: boolean;
Permissions: any;
Permissions1: any;
Old_Student_Registration_Edit:boolean;
Old_Student_Registration_Save:boolean;
Old_Student_Registration_Delete:boolean;
Result_Data:Result[];
Result_:Result=new Result();
constructor(public OldRegistartion_Service_:OldRegistartion_Service,public Account_Voucher_Service_:Account_Voucher_Service,public Client_Accounts_Service_:Client_Accounts_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    
    this.Login_User=localStorage.getItem("Login_User"); 
    this.Permissions = Get_Page_Permission(41);
    this.Permissions1 = Get_Page_Permission(41);
    this.Result_Data = []
		this.Result_Data.push({'Result_Id':0,'Result_Name':'Select'});
		this.Result_Data.push({'Result_Id':1,'Result_Name':'Passed'});
		this.Result_Data.push({'Result_Id':2,'Result_Name':'Failed'});
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.Old_Student_Registration_Edit=this.Permissions.Edit;
    this.Old_Student_Registration_Save=this.Permissions.Save;
    this.Old_Student_Registration_Delete=this.Permissions.Delete;
    this.Page_Load()
    }
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight;
    this.myTotalHeight=this.myTotalHeight-90;
    this.myInnerHeight = this.myInnerHeight - 370;
    this.Search_FromDate=this.New_Date(this.Search_FromDate);
    this.Search_ToDate=this.New_Date(this.Search_ToDate);
   
    this.Entry_View=false;
       
}
trackByFn(index, item) 
{
return index;
}
Create_New()
{
    this.Entry_View = true;
    this.Clr_Old_Student();
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
Close_Click()
{
    let top = document.getElementById('Topdiv');
    if (top !== null) 
    {
    top.scrollIntoView();
    top = null;
    }  
    this.Entry_View = false;
}
Clr_Old_Student()
{
   this.Old_Student_Registration_.Old_Student_Registration_Id = 0;
   this.Old_Student_Registration_.Old_Student_Registration_Student_Name = '';
   this.Old_Student_Registration_.Old_Student_Registration_Address1 = '';
   this.Old_Student_Registration_.Old_Student_Registration_Address1 = '';
   this.Old_Student_Registration_.Old_Student_Registration_Address2 = '';
   this.Old_Student_Registration_.Old_Student_Registration_Address3 = '';
   this.Old_Student_Registration_.Old_Student_Registration_Address4 = '';
  // this.Old_Student_Registration_.Old_Student_Registration_Date = new Date();
   this.Old_Student_Registration_.Old_Student_Registration_Date =null;
   this.Old_Student_Registration_.Old_Student_Registration_Email = '';
   this.Old_Student_Registration_.Old_Student_Registration_Mobile = '';
   this.Old_Student_Registration_.Old_Student_Registration_Phone = '';
   this.Old_Student_Registration_.Old_Student_Registration_No = '';
   this.Old_Student_Registration_.Section = '';
   this.Old_Student_Registration_.Program = '';
   if (this.Result_Data != undefined && this.Result_Data != null)
        this.Result_ = this.Result_Data[0];
}
Save_Old_Student_Registration()
{
    if (this.Old_Student_Registration_.Old_Student_Registration_Student_Name == undefined || this.Old_Student_Registration_.Old_Student_Registration_Student_Name==null || this.Old_Student_Registration_.Old_Student_Registration_Student_Name=="" )
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Student Name',Type:"3"}});
    return;
    }
    if (this.Old_Student_Registration_.Old_Student_Registration_No == undefined || this.Old_Student_Registration_.Old_Student_Registration_No==null || this.Old_Student_Registration_.Old_Student_Registration_No=="" )
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Registration No',Type:"3"}});
    return;
    }


if(this.Old_Student_Registration_.Old_Student_Registration_Date!=null)
    this.Old_Student_Registration_.Old_Student_Registration_Date = this.New_Date(new Date(moment( this.Old_Student_Registration_.Old_Student_Registration_Date).format('YYYY-MM-DD')));

this.Old_Student_Registration_.Old_Student_Registration_user_id=this.Login_User;
this.Old_Student_Registration_.Result_Id=this.Result_.Result_Id;
this.Old_Student_Registration_.Result=this.Result_.Result_Name;
document.getElementById('Save_Button').hidden=true;
this.issLoading=true;
this.OldRegistartion_Service_.Save_Old_Student_Registration(this.Old_Student_Registration_).subscribe(Save_status => {

    Save_status=Save_status[0];
if(Number(Save_status[0].Old_Student_Registration_Id_)>0)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
this.Close_Click();
this.Search_Old_Student_Registration();
document.getElementById("Save_Button").hidden=true;
// this.Clr_Old_Student();
// this.Account_Voucher_.Voucher_No=Save_status[0].Voucher_No_;
// this.Account_Voucher_Print = false;
}
else{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
document.getElementById("Save_Button").hidden=true;

}
this.issLoading=false;
},
Rows => { 
this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
});
}
Search_Old_Student_Registration()
{
    this.issLoading=true;
    this.OldRegistartion_Service_.Search_Old_Student_Registration(this.Student_Name_Search_,this.Registration_No_Search_).subscribe(Rows => {
    this.Old_Student_Registration_Data=Rows[0];
    this.Total_Entries=this.Old_Student_Registration_Data.length;
    if(this.Old_Student_Registration_Data.length==0)
    {
    this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
    
    }
    this.issLoading=false;
    },
    Rows => { 
    this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
}
Edit_Old_Student_Registration(Old_Student_Registration_e:old_student_registration,index)
{ 
    
    this.Entry_View = true;
    this.Old_Student_Registration_=Object.assign({},Old_Student_Registration_e);
    for (var i = 0; i < this.Result_Data.length; i++)
    {
    if (this.Old_Student_Registration_.Result_Id == this.Result_Data[i].Result_Id)
    this.Result_=this.Result_Data[i];
    } 
    this.Old_Student_Registration_.Old_Student_Registration_Date =this.New_Date(new Date( moment(this.Old_Student_Registration_.Old_Student_Registration_Date).format("YYYY-MM-DD") ));
}
}

