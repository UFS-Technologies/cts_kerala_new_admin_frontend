import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course_Fees_Service } from '../../../services/Course_Fees.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Course_Fees } from '../../../models/Course_Fees';
import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';@Component({
selector: 'app-Course_Fees',
templateUrl: './Course_Fees.component.html',
styleUrls: ['./Course_Fees.component.css']
})
export class Course_FeesComponent implements OnInit {
Course_Fees_Data:Course_Fees[]
Course_Fees_:Course_Fees= new Course_Fees();
Course_Fees_Name_Search:string;
Entry_View:boolean=true;
EditIndex: number;
Total_Entries: number;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Course_Fees_Edit:boolean;
Course_Fees_Save:boolean;
Course_Fees_Delete:boolean;
myInnerHeight: number;
constructor(public Course_Fees_Service_:Course_Fees_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
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
this.Course_Fees_Edit=this.Permissions.Edit;
this.Course_Fees_Save=this.Permissions.Save;
this.Course_Fees_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
this.myInnerHeight = (window.innerHeight);
this.myInnerHeight = this.myInnerHeight - 200;
this.Clr_Course_Fees();
this.Search_Course_Fees();
this.Entry_View=false;
}
Create_New()
{
this.Entry_View = true;
this.Clr_Course_Fees();
}
Close_Click()
{
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

 Clr_Course_Fees()
 {
this.Course_Fees_.Course_Fees_Id=0;
this.Course_Fees_.Course_Id=0;
this.Course_Fees_.Fees_Type_Id=0;
this.Course_Fees_.Amount=0;
this.Course_Fees_.No_Of_Instalment="";
this.Course_Fees_.Instalment_Period="";

}
Search_Course_Fees()
{
this.issLoading=true;
this.Course_Fees_Service_.Search_Course_Fees('').subscribe(Rows => {
 this.Course_Fees_Data=Rows[0];
this.Total_Entries=this.Course_Fees_Data.length;
if(this.Course_Fees_Data.length==0)
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
Delete_Course_Fees(Course_Fees_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Course_Fees_Service_.Delete_Course_Fees(Course_Fees_Id).subscribe(Delete_status => {
 Delete_status = Delete_status[0];
    Delete_status = Delete_status[0].DeleteStatus_.data[0];
if(Delete_status[0][0].Course_Fees_Id_>0){
this.Course_Fees_Data.splice(index, 1);
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
Save_Course_Fees()
{
this.issLoading=true;
this.Course_Fees_Service_.Save_Course_Fees(this.Course_Fees_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].Course_Fees_Id_)>0)
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
Edit_Course_Fees(Course_Fees_e:Course_Fees,index)
{
this.Entry_View=true;
this.Course_Fees_=Course_Fees_e;
this.Course_Fees_=Object.assign({},Course_Fees_e);
}
}

