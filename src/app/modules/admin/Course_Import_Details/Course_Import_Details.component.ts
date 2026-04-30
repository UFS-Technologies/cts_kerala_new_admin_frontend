import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course_Import_Details_Service } from '../../../services/Course_Import_Details.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Course_Import_Details } from '../../../models/Course_Import_Details';
import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';@Component({
selector: 'app-Course_Import_Details',
templateUrl: './Course_Import_Details.component.html',
styleUrls: ['./Course_Import_Details.component.css']
})
export class Course_Import_DetailsComponent implements OnInit {
Course_Import_Details_Data:Course_Import_Details[]
Course_Import_Details_:Course_Import_Details= new Course_Import_Details();
Course_Import_Details_Name_Search:string;
Entry_View:boolean=true;
EditIndex: number;
Total_Entries: number;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Course_Import_Details_Edit:boolean;
Course_Import_Details_Save:boolean;
Course_Import_Details_Delete:boolean;
myInnerHeight: number;
constructor(public Course_Import_Details_Service_:Course_Import_Details_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
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
this.Course_Import_Details_Edit=this.Permissions.Edit;
this.Course_Import_Details_Save=this.Permissions.Save;
this.Course_Import_Details_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
this.myInnerHeight = (window.innerHeight);
this.myInnerHeight = this.myInnerHeight - 200;
this.Clr_Course_Import_Details();
this.Search_Course_Import_Details();
this.Entry_View=false;
}
Create_New()
{
this.Entry_View = true;
this.Clr_Course_Import_Details();
}
Close_Click()
{
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

 Clr_Course_Import_Details()
 {
this.Course_Import_Details_.Course_Import_Details_Id=0;
this.Course_Import_Details_.Course_Import_Master_Id=0;
this.Course_Import_Details_.Course_Id=0;

}
Search_Course_Import_Details()
{
this.issLoading=true;
this.Course_Import_Details_Service_.Search_Course_Import_Details('').subscribe(Rows => {
 this.Course_Import_Details_Data=Rows[0];
this.Total_Entries=this.Course_Import_Details_Data.length;
if(this.Course_Import_Details_Data.length==0)
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
Delete_Course_Import_Details(Course_Import_Details_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Course_Import_Details_Service_.Delete_Course_Import_Details(Course_Import_Details_Id).subscribe(Delete_status => {
 Delete_status = Delete_status[0];
    Delete_status = Delete_status[0].DeleteStatus_.data[0];
if(Delete_status[0][0].Course_Import_Details_Id_>0){
this.Course_Import_Details_Data.splice(index, 1);
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
Save_Course_Import_Details()
{
this.issLoading=true;
this.Course_Import_Details_Service_.Save_Course_Import_Details(this.Course_Import_Details_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].Course_Import_Details_Id_)>0)
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
Edit_Course_Import_Details(Course_Import_Details_e:Course_Import_Details,index)
{
this.Entry_View=true;
this.Course_Import_Details_=Course_Import_Details_e;
this.Course_Import_Details_=Object.assign({},Course_Import_Details_e);
}
}

