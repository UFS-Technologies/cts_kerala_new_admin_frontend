import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Followup_Type_Service } from '../../../services/Followup_Type.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Followup_Type } from '../../../models/Followup_Type';
import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';@Component({
selector: 'app-Followup_Type',
templateUrl: './Followup_Type.component.html',
styleUrls: ['./Followup_Type.component.css']
})
export class Followup_TypeComponent implements OnInit {
Followup_Type_Data:Followup_Type[]
Followup_Type_:Followup_Type= new Followup_Type();
Followup_Type_Name_Search:string;
Entry_View:boolean=true;
EditIndex: number;
Total_Entries: number;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Followup_Type_Edit:boolean;
Followup_Type_Save:boolean;
Followup_Type_Delete:boolean;
myInnerHeight: number;
constructor(public Followup_Type_Service_:Followup_Type_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
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
this.Followup_Type_Edit=this.Permissions.Edit;
this.Followup_Type_Save=this.Permissions.Save;
this.Followup_Type_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
this.myInnerHeight = (window.innerHeight);
this.myInnerHeight = this.myInnerHeight - 200;
this.Clr_Followup_Type();
this.Search_Followup_Type();
this.Entry_View=false;
}
Create_New()
{
this.Entry_View = true;
this.Clr_Followup_Type();
}
Close_Click()
{
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

 Clr_Followup_Type()
 {
this.Followup_Type_.Followup_Type_Id=0;
this.Followup_Type_.Followup_Type_Name="";
this.Followup_Type_.User_Id=0;

}
Search_Followup_Type()
{
this.issLoading=true;
this.Followup_Type_Service_.Search_Followup_Type('').subscribe(Rows => {
 this.Followup_Type_Data=Rows[0];
this.Total_Entries=this.Followup_Type_Data.length;
if(this.Followup_Type_Data.length==0)
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
Delete_Followup_Type(Followup_Type_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Followup_Type_Service_.Delete_Followup_Type(Followup_Type_Id).subscribe(Delete_status => {
 Delete_status = Delete_status[0];
    Delete_status = Delete_status[0].DeleteStatus_.data[0];
if(Delete_status[0][0].Followup_Type_Id_>0){
this.Followup_Type_Data.splice(index, 1);
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
Save_Followup_Type()
{
this.issLoading=true;
this.Followup_Type_Service_.Save_Followup_Type(this.Followup_Type_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].Followup_Type_Id_)>0)
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
Edit_Followup_Type(Followup_Type_e:Followup_Type,index)
{
this.Entry_View=true;
this.Followup_Type_=Followup_Type_e;
this.Followup_Type_=Object.assign({},Followup_Type_e);
}
}

