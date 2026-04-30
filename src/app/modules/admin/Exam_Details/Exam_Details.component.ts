import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Exam_Details_Service } from '../../../services/Exam_Details.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Exam_Details } from '../../../models/Exam_Details';
import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';@Component({
selector: 'app-Exam_Details',
templateUrl: './Exam_Details.component.html',
styleUrls: ['./Exam_Details.component.css']
})
export class Exam_DetailsComponent implements OnInit {
Exam_Details_Data:Exam_Details[]
Exam_Details_:Exam_Details= new Exam_Details();
Exam_Details_Name_Search:string;
Entry_View:boolean=true;
EditIndex: number;
Total_Entries: number;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Exam_Details_Edit:boolean;
Exam_Details_Save:boolean;
Exam_Details_Delete:boolean;
myInnerHeight: number;
constructor(public Exam_Details_Service_:Exam_Details_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
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
this.Exam_Details_Edit=this.Permissions.Edit;
this.Exam_Details_Save=this.Permissions.Save;
this.Exam_Details_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
this.myInnerHeight = (window.innerHeight);
this.myInnerHeight = this.myInnerHeight - 200;
this.Clr_Exam_Details();
this.Search_Exam_Details();
this.Entry_View=false;
}
Create_New()
{
this.Entry_View = true;
this.Clr_Exam_Details();
}
Close_Click()
{
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

 Clr_Exam_Details()
 {
this.Exam_Details_.Exam_Details_Id=0;
this.Exam_Details_.Exam_Master_Id=0;
this.Exam_Details_.Question_Id=0;
this.Exam_Details_.Question_Name="";
this.Exam_Details_.Option_1="";
this.Exam_Details_.Option_2="";
this.Exam_Details_.Option_3="";
this.Exam_Details_.Option_4="";
this.Exam_Details_.Question_Answer="";

}
Search_Exam_Details()
{
this.issLoading=true;
this.Exam_Details_Service_.Search_Exam_Details('').subscribe(Rows => {
 this.Exam_Details_Data=Rows[0];
this.Total_Entries=this.Exam_Details_Data.length;
if(this.Exam_Details_Data.length==0)
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
Delete_Exam_Details(Exam_Details_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Exam_Details_Service_.Delete_Exam_Details(Exam_Details_Id).subscribe(Delete_status => {
 Delete_status = Delete_status[0];
    Delete_status = Delete_status[0].DeleteStatus_.data[0];
if(Delete_status[0][0].Exam_Details_Id_>0){
this.Exam_Details_Data.splice(index, 1);
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
Save_Exam_Details()
{
this.issLoading=true;
this.Exam_Details_Service_.Save_Exam_Details(this.Exam_Details_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].Exam_Details_Id_)>0)
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
Edit_Exam_Details(Exam_Details_e:Exam_Details,index)
{
this.Entry_View=true;
this.Exam_Details_=Exam_Details_e;
this.Exam_Details_=Object.assign({},Exam_Details_e);
}
}

