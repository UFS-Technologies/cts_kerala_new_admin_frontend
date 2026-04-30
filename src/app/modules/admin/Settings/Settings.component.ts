import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Settings_Service } from '../../../services/Settings.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Settings } from '../../../models/Settings';
import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';@Component({
selector: 'app-Settings',
templateUrl: './Settings.component.html',
styleUrls: ['./Settings.component.css']
})
export class SettingsComponent implements OnInit {
Settings_Data:Settings[]
Settings_:Settings= new Settings();
Settings_Name_Search:string;
Entry_View:boolean=true;
EditIndex: number;
Total_Entries: number;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Settings_Edit:boolean;
Settings_Save:boolean;
Settings_Delete:boolean;
myInnerHeight: number;
constructor(public Settings_Service_:Settings_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
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
this.Settings_Edit=this.Permissions.Edit;
this.Settings_Save=this.Permissions.Save;
this.Settings_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
this.myInnerHeight = (window.innerHeight);
this.myInnerHeight = this.myInnerHeight - 200;
this.Clr_Settings();
this.Search_Settings();
this.Entry_View=false;
}
Create_New()
{
this.Entry_View = true;
this.Clr_Settings();
}
Close_Click()
{
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

 Clr_Settings()
 {
this.Settings_.Settings_Id=0;
this.Settings_.Settings_Name="";
this.Settings_.Settings_Group=0;

}
Search_Settings()
{
this.issLoading=true;
this.Settings_Service_.Search_Settings('').subscribe(Rows => {
 this.Settings_Data=Rows[0];
this.Total_Entries=this.Settings_Data.length;
if(this.Settings_Data.length==0)
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
Delete_Settings(Settings_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Settings_Service_.Delete_Settings(Settings_Id).subscribe(Delete_status => {
 Delete_status = Delete_status[0];
    Delete_status = Delete_status[0].DeleteStatus_.data[0];
if(Delete_status[0][0].Settings_Id_>0){
this.Settings_Data.splice(index, 1);
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
Save_Settings()
{
this.issLoading=true;
this.Settings_Service_.Save_Settings(this.Settings_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].Settings_Id_)>0)
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
Edit_Settings(Settings_e:Settings,index)
{
this.Entry_View=true;
this.Settings_=Settings_e;
this.Settings_=Object.assign({},Settings_e);
}
}

