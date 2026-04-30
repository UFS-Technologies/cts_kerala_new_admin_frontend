import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student_Course_Subject_Service } from '../../../services/Student_Course_Subject.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Student_Course_Subject } from '../../../models/Student_Course_Subject';
import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';@Component({
selector: 'app-Student_Course_Subject',
templateUrl: './Student_Course_Subject.component.html',
styleUrls: ['./Student_Course_Subject.component.css']
})
export class Student_Course_SubjectComponent implements OnInit {
Student_Course_Subject_Data:Student_Course_Subject[]
Student_Course_Subject_:Student_Course_Subject= new Student_Course_Subject();
Student_Course_Subject_Name_Search:string;
Entry_View:boolean=true;
EditIndex: number;
Total_Entries: number;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Student_Course_Subject_Edit:boolean;
Student_Course_Subject_Save:boolean;
Student_Course_Subject_Delete:boolean;
myInnerHeight: number;
constructor(public Student_Course_Subject_Service_:Student_Course_Subject_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
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
this.Student_Course_Subject_Edit=this.Permissions.Edit;
this.Student_Course_Subject_Save=this.Permissions.Save;
this.Student_Course_Subject_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
this.myInnerHeight = (window.innerHeight);
this.myInnerHeight = this.myInnerHeight - 200;
this.Clr_Student_Course_Subject();
this.Search_Student_Course_Subject();
this.Entry_View=false;
}
Create_New()
{
this.Entry_View = true;
this.Clr_Student_Course_Subject();
}
Close_Click()
{
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

 Clr_Student_Course_Subject()
 {
this.Student_Course_Subject_.Student_Course_Subject_Id=0;
this.Student_Course_Subject_.Student_Id=0;
this.Student_Course_Subject_.Course_Id=0;
this.Student_Course_Subject_.Course_Name="";
this.Student_Course_Subject_.Subject_Id=0;
this.Student_Course_Subject_.Subject_Name="";
this.Student_Course_Subject_.Minimum_Mark="";
this.Student_Course_Subject_.Maximum_Mark="";
this.Student_Course_Subject_.Online_Exam_Status="";
this.Student_Course_Subject_.No_of_Question="";
this.Student_Course_Subject_.Exam_Duration="";
this.Student_Course_Subject_.Exam_Attended_Status="";

}
Search_Student_Course_Subject()
{
this.issLoading=true;
this.Student_Course_Subject_Service_.Search_Student_Course_Subject('').subscribe(Rows => {
 this.Student_Course_Subject_Data=Rows[0];
this.Total_Entries=this.Student_Course_Subject_Data.length;
if(this.Student_Course_Subject_Data.length==0)
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
Delete_Student_Course_Subject(Student_Course_Subject_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Student_Course_Subject_Service_.Delete_Student_Course_Subject(Student_Course_Subject_Id).subscribe(Delete_status => {
 Delete_status = Delete_status[0];
    Delete_status = Delete_status[0].DeleteStatus_.data[0];
if(Delete_status[0][0].Student_Course_Subject_Id_>0){
this.Student_Course_Subject_Data.splice(index, 1);
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
Save_Student_Course_Subject()
{
this.issLoading=true;
this.Student_Course_Subject_Service_.Save_Student_Course_Subject(this.Student_Course_Subject_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].Student_Course_Subject_Id_)>0)
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
Edit_Student_Course_Subject(Student_Course_Subject_e:Student_Course_Subject,index)
{
this.Entry_View=true;
this.Student_Course_Subject_=Student_Course_Subject_e;
this.Student_Course_Subject_=Object.assign({},Student_Course_Subject_e);
}
}

