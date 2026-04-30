import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course_Import_Master_Service } from '../../../services/Course_Import_Master.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Course_Import_Master } from '../../../models/Course_Import_Master';
import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';@Component({
selector: 'app-Course_Import_Master',
templateUrl: './Course_Import_Master.component.html',
styleUrls: ['./Course_Import_Master.component.css']
})
export class Course_Import_MasterComponent implements OnInit {
Course_Import_Master_Data:Course_Import_Master[]
Course_Import_Master_:Course_Import_Master= new Course_Import_Master();
Course_Import_Master_Name_Search:string;
Entry_View:boolean=true;
EditIndex: number;
Total_Entries: number;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Course_Import_Master_Edit:boolean;
Course_Import_Master_Save:boolean;
Course_Import_Master_Delete:boolean;
myInnerHeight: number;
constructor(public Course_Import_Master_Service_:Course_Import_Master_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
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
this.Course_Import_Master_Edit=this.Permissions.Edit;
this.Course_Import_Master_Save=this.Permissions.Save;
this.Course_Import_Master_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
this.myInnerHeight = (window.innerHeight);
this.myInnerHeight = this.myInnerHeight - 200;
this.Clr_Course_Import_Master();
this.Search_Course_Import_Master();
this.Entry_View=false;
}
Create_New()
{
this.Entry_View = true;
this.Clr_Course_Import_Master();
}
Close_Click()
{
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

 Clr_Course_Import_Master()
 {
this.Course_Import_Master_.Course_Import_Master_Id=0;
this.Course_Import_Master_.Date="";
this.Course_Import_Master_.User_Id=0;

}
Search_Course_Import_Master()
{
this.issLoading=true;
this.Course_Import_Master_Service_.Search_Course_Import_Master('').subscribe(Rows => {
 this.Course_Import_Master_Data=Rows[0];
this.Total_Entries=this.Course_Import_Master_Data.length;
if(this.Course_Import_Master_Data.length==0)
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
Delete_Course_Import_Master(Course_Import_Master_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Course_Import_Master_Service_.Delete_Course_Import_Master(Course_Import_Master_Id).subscribe(Delete_status => {
 Delete_status = Delete_status[0];
    Delete_status = Delete_status[0].DeleteStatus_.data[0];
if(Delete_status[0][0].Course_Import_Master_Id_>0){
this.Course_Import_Master_Data.splice(index, 1);
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
Save_Course_Import_Master()
{
this.issLoading=true;
this.Course_Import_Master_Service_.Save_Course_Import_Master(this.Course_Import_Master_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].Course_Import_Master_Id_)>0)
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
Edit_Course_Import_Master(Course_Import_Master_e:Course_Import_Master,index)
{
this.Entry_View=true;
this.Course_Import_Master_=Course_Import_Master_e;
this.Course_Import_Master_=Object.assign({},Course_Import_Master_e);
}
}

