import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Accounts_Service } from '../../../services/Accounts.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Accounts } from '../../../models/Accounts';
import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';@Component({
selector: 'app-Accounts',
templateUrl: './Accounts.component.html',
styleUrls: ['./Accounts.component.css']
})
export class AccountsComponent implements OnInit {
Accounts_Data:Accounts[]
Accounts_:Accounts= new Accounts();
Accounts_Name_Search:string;
Entry_View:boolean=true;
EditIndex: number;
Total_Entries: number;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Accounts_Edit:boolean;
Accounts_Save:boolean;
Accounts_Delete:boolean;
myInnerHeight: number;
constructor(public Accounts_Service_:Accounts_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
this.Permissions = Get_Page_Permission(15);
if(this.Permissions==undefined || this.Permissions==null)
{
localStorage.removeItem('token');
this.router.navigateByUrl('/auth/login');
}
else
{
this.Accounts_Edit=this.Permissions.Edit;
this.Accounts_Save=this.Permissions.Save;
this.Accounts_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
this.myInnerHeight = (window.innerHeight);
this.myInnerHeight = this.myInnerHeight - 200;
this.Clr_Accounts();
this.Search_Accounts();
this.Entry_View=false;
}
Create_New()
{
this.Entry_View = true;
this.Clr_Accounts();
}
Close_Click()
{
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

 Clr_Accounts()
 {
this.Accounts_.Accounts_Id=0;
this.Accounts_.Date="";
this.Accounts_.Client_Id=0;
this.Accounts_.DR=0;
this.Accounts_.CR=0;
this.Accounts_.X_Client_Id=0;
this.Accounts_.Voucher_No="";
this.Accounts_.Voucher_Type="";
this.Accounts_.Description="";
this.Accounts_.Status=0;
this.Accounts_.Daybbok="";

}
Search_Accounts()
{
this.issLoading=true;
this.Accounts_Service_.Search_Accounts('').subscribe(Rows => {
 this.Accounts_Data=Rows[0];
this.Total_Entries=this.Accounts_Data.length;
if(this.Accounts_Data.length==0)
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
Delete_Accounts(Accounts_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Accounts_Service_.Delete_Accounts(Accounts_Id).subscribe(Delete_status => {
 Delete_status = Delete_status[0];
    Delete_status = Delete_status[0].DeleteStatus_.data[0];
if(Delete_status[0][0].Accounts_Id_>0){
this.Accounts_Data.splice(index, 1);
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type: "false"}});
}
else
{
this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
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
Save_Accounts()
{
this.issLoading=true;
this.Accounts_Service_.Save_Accounts(this.Accounts_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].Accounts_Id_)>0)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
}
else{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
}
this.issLoading=false;
 },
 Rows => { 
this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:Rows.error.error,Type:"2"}});
 });
}
Edit_Accounts(Accounts_e:Accounts,index)
{
this.Entry_View=true;
this.Accounts_=Accounts_e;
this.Accounts_=Object.assign({},Accounts_e);
}
}

