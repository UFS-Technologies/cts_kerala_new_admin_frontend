import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student_Followup_Service } from '../../../services/Student_Followup.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Student_Followup } from '../../../models/Student_Followup';
import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';@Component({
selector: 'app-Student_Followup',
templateUrl: './Student_Followup.component.html',
styleUrls: ['./Student_Followup.component.css']
})
export class Student_FollowupComponent implements OnInit {
Student_Followup_Data:Student_Followup[]
Student_Followup_:Student_Followup= new Student_Followup();
Student_Followup_Name_Search:string;
Entry_View:boolean=true;
EditIndex: number;
Total_Entries: number;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Student_Followup_Edit:boolean;
Student_Followup_Save:boolean;
Student_Followup_Delete:boolean;
myInnerHeight: number;
constructor(public Student_Followup_Service_:Student_Followup_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
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
this.Student_Followup_Edit=this.Permissions.Edit;
this.Student_Followup_Save=this.Permissions.Save;
this.Student_Followup_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
this.myInnerHeight = (window.innerHeight);
this.myInnerHeight = this.myInnerHeight - 200;
this.Clr_Student_Followup();
this.Search_Student_Followup();
this.Entry_View=false;
}
Create_New()
{
this.Entry_View = true;
this.Clr_Student_Followup();
}
Close_Click()
{
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

 Clr_Student_Followup()
 {
// this.Student_Followup_.Student_Followup_Id=0;
// this.Student_Followup_.Student_Id=0;
// this.Student_Followup_.Entry_Date="";
// this.Student_Followup_.Next_FollowUp_Date="";
// this.Student_Followup_.FollowUp_Difference=0;
// this.Student_Followup_.Status=0;
// this.Student_Followup_.User_Id=0;
// this.Student_Followup_.Remark="";
// this.Student_Followup_.Remark_Id=0;
// this.Student_Followup_.FollowUp_Type=0;
// this.Student_Followup_.FollowUP_Time="";
// this.Student_Followup_.Actual_FollowUp_Date="";

}
Search_Student_Followup()
{
this.issLoading=true;
this.Student_Followup_Service_.Search_Student_Followup('').subscribe(Rows => {
 this.Student_Followup_Data=Rows[0];
this.Total_Entries=this.Student_Followup_Data.length;
if(this.Student_Followup_Data.length==0)
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
Delete_Student_Followup(Student_Followup_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Student_Followup_Service_.Delete_Student_Followup(Student_Followup_Id).subscribe(Delete_status => {
 Delete_status = Delete_status[0];
    Delete_status = Delete_status[0].DeleteStatus_.data[0];
if(Delete_status[0][0].Student_Followup_Id_>0){
this.Student_Followup_Data.splice(index, 1);
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
Save_Student_Followup()
{
this.issLoading=true;
this.Student_Followup_Service_.Save_Student_Followup(this.Student_Followup_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].Student_Followup_Id_)>0)
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
Edit_Student_Followup(Student_Followup_e:Student_Followup,index)
{
this.Entry_View=true;
this.Student_Followup_=Student_Followup_e;
this.Student_Followup_=Object.assign({},Student_Followup_e);
}
}

