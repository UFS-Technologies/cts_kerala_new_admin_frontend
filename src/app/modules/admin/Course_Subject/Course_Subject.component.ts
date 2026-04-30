import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course_Subject_Service } from '../../../services/Course_Subject.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Course_Subject } from '../../../models/Course_Subject';
import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';@Component({
selector: 'app-Course_Subject',
templateUrl: './Course_Subject.component.html',
styleUrls: ['./Course_Subject.component.css']
})
export class Course_SubjectComponent implements OnInit {
Course_Subject_Data:Course_Subject[]
Course_Subject_:Course_Subject= new Course_Subject();
Course_Subject_Name_Search:string;
Entry_View:boolean=true;
EditIndex: number;
Total_Entries: number;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Course_Subject_Edit:boolean;
Course_Subject_Save:boolean;
Course_Subject_Delete:boolean;
myInnerHeight: number;
constructor(public Course_Subject_Service_:Course_Subject_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
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
this.Course_Subject_Edit=this.Permissions.Edit;
this.Course_Subject_Save=this.Permissions.Save;
this.Course_Subject_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
this.myInnerHeight = (window.innerHeight);
this.myInnerHeight = this.myInnerHeight - 200;
this.Clr_Course_Subject();
this.Search_Course_Subject();
this.Entry_View=false;
}
Create_New()
{
this.Entry_View = true;
this.Clr_Course_Subject();
}
Close_Click()
{
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

 Clr_Course_Subject()
 {
this.Course_Subject_.Course_Subject_Id=0;
this.Course_Subject_.Course_Id=0;
this.Course_Subject_.Part_Id=0;
this.Course_Subject_.Subject_Id=0;
this.Course_Subject_.Subject_Name="";
this.Course_Subject_.Minimum_Mark="";
this.Course_Subject_.Maximum_Mark="";
this.Course_Subject_.Online_Exam_Status=0;
this.Course_Subject_.No_of_Question="";
this.Course_Subject_.Exam_Duration="";

}
Search_Course_Subject()
{
this.issLoading=true;
this.Course_Subject_Service_.Search_Course_Subject('').subscribe(Rows => {
 this.Course_Subject_Data=Rows[0];
this.Total_Entries=this.Course_Subject_Data.length;
if(this.Course_Subject_Data.length==0)
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
Delete_Course_Subject(Course_Subject_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Course_Subject_Service_.Delete_Course_Subject(Course_Subject_Id).subscribe(Delete_status => {
 Delete_status = Delete_status[0];
    Delete_status = Delete_status[0].DeleteStatus_.data[0];
if(Delete_status[0][0].Course_Subject_Id_>0){
this.Course_Subject_Data.splice(index, 1);
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
Save_Course_Subject()
{
this.issLoading=true;
this.Course_Subject_Service_.Save_Course_Subject(this.Course_Subject_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].Course_Subject_Id_)>0)
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
Edit_Course_Subject(Course_Subject_e:Course_Subject,index)
{
this.Entry_View=true;
this.Course_Subject_=Course_Subject_e;
this.Course_Subject_=Object.assign({},Course_Subject_e);
}
}

