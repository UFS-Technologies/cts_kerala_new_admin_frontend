import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student_Course_Service } from '../../../services/Student_Course.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Student_Course } from '../../../models/Student_Course';
import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';@Component({
selector: 'app-Student_Course',
templateUrl: './Student_Course.component.html',
styleUrls: ['./Student_Course.component.css']
})
export class Student_CourseComponent implements OnInit {
Student_Course_Data:Student_Course[]
Student_Course_:Student_Course= new Student_Course();
Student_Course_Name_Search:string;
Entry_View:boolean=true;
EditIndex: number;
Total_Entries: number;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Student_Course_Edit:boolean;
Student_Course_Save:boolean;
Student_Course_Delete:boolean;
myInnerHeight: number;
constructor(public Student_Course_Service_:Student_Course_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
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
this.Student_Course_Edit=this.Permissions.Edit;
this.Student_Course_Save=this.Permissions.Save;
this.Student_Course_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
this.myInnerHeight = (window.innerHeight);
this.myInnerHeight = this.myInnerHeight - 200;
this.Clr_Student_Course();
this.Search_Student_Course();
this.Entry_View=false;
}
Create_New()
{
this.Entry_View = true;
this.Clr_Student_Course();
}
Close_Click()
{
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

 Clr_Student_Course()
 {
this.Student_Course_.Student_Course_Id=0;
this.Student_Course_.Student_Id=0;
// this.Student_Course_.Entry_Date="";
// this.Student_Course_.Course_Name_Details="";
// this.Student_Course_.Course_Id=0;
// this.Student_Course_.Course_Name="";
// this.Student_Course_.Start_Date="";
// this.Student_Course_.End_Date="";
// this.Student_Course_.Join_Date="";
this.Student_Course_.By_User_Id=0;
this.Student_Course_.Status=0;

}
Search_Student_Course()
{
this.issLoading=true;
this.Student_Course_Service_.Search_Student_Course('').subscribe(Rows => {
 this.Student_Course_Data=Rows[0];
this.Total_Entries=this.Student_Course_Data.length;
if(this.Student_Course_Data.length==0)
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
Delete_Student_Course(Student_Course_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Student_Course_Service_.Delete_Student_Course(Student_Course_Id).subscribe(Delete_status => {
 Delete_status = Delete_status[0];
    Delete_status = Delete_status[0].DeleteStatus_.data[0];
if(Delete_status[0][0].Student_Course_Id_>0){
this.Student_Course_Data.splice(index, 1);
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
Save_Student_Course()
{
this.issLoading=true;
this.Student_Course_Service_.Save_Student_Course(this.Student_Course_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].Student_Course_Id_)>0)
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
Edit_Student_Course(Student_Course_e:Student_Course,index)
{
this.Entry_View=true;
this.Student_Course_=Student_Course_e;
this.Student_Course_=Object.assign({},Student_Course_e);
}
}

