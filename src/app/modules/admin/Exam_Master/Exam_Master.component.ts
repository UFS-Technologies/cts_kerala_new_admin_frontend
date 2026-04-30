import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Exam_Master_Service } from '../../../services/Exam_Master.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Exam_Master } from '../../../models/Exam_Master';
import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';@Component({
selector: 'app-Exam_Master',
templateUrl: './Exam_Master.component.html',
styleUrls: ['./Exam_Master.component.css']
})
export class Exam_MasterComponent implements OnInit {
Exam_Master_Data:Exam_Master[]
Exam_Master_:Exam_Master= new Exam_Master();
Exam_Master_Name_Search:string;
Entry_View:boolean=true;
EditIndex: number;
Total_Entries: number;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Exam_Master_Edit:boolean;
Exam_Master_Save:boolean;
Exam_Master_Delete:boolean;
myInnerHeight: number;
constructor(public Exam_Master_Service_:Exam_Master_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
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
this.Exam_Master_Edit=this.Permissions.Edit;
this.Exam_Master_Save=this.Permissions.Save;
this.Exam_Master_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
this.myInnerHeight = (window.innerHeight);
this.myInnerHeight = this.myInnerHeight - 200;
this.Clr_Exam_Master();
this.Search_Exam_Master();
this.Entry_View=false;
}
Create_New()
{
this.Entry_View = true;
this.Clr_Exam_Master();
}
Close_Click()
{
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

 Clr_Exam_Master()
 {
this.Exam_Master_.Exam_Master_Id=0;
this.Exam_Master_.Exam_Date="";
this.Exam_Master_.Student_Id=0;
this.Exam_Master_.Subject_Id=0;
this.Exam_Master_.Subject_Name="";
this.Exam_Master_.Start_Time="";
this.Exam_Master_.End_Time="";
this.Exam_Master_.Mark_Obtained="";
this.Exam_Master_.User_Id=0;

}
Search_Exam_Master()
{
this.issLoading=true;
this.Exam_Master_Service_.Search_Exam_Master('').subscribe(Rows => {
 this.Exam_Master_Data=Rows[0];
this.Total_Entries=this.Exam_Master_Data.length;
if(this.Exam_Master_Data.length==0)
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
Delete_Exam_Master(Exam_Master_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Exam_Master_Service_.Delete_Exam_Master(Exam_Master_Id).subscribe(Delete_status => {
 Delete_status = Delete_status[0];
    Delete_status = Delete_status[0].DeleteStatus_.data[0];
if(Delete_status[0][0].Exam_Master_Id_>0){
this.Exam_Master_Data.splice(index, 1);
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
Save_Exam_Master()
{
this.issLoading=true;
this.Exam_Master_Service_.Save_Exam_Master(this.Exam_Master_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].Exam_Master_Id_)>0)
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
Edit_Exam_Master(Exam_Master_e:Exam_Master,index)
{
this.Entry_View=true;
this.Exam_Master_=Exam_Master_e;
this.Exam_Master_=Object.assign({},Exam_Master_e);
}
}

