import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate_Followup_Service } from '../../../services/Candidate_Followup.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Candidate_Followup } from '../../../models/Candidate_Followup';
import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';@Component({
selector: 'app-Candidate_Followup',
templateUrl: './Candidate_Followup.component.html',
styleUrls: ['./Candidate_Followup.component.css']
})
export class Candidate_FollowupComponent implements OnInit {
Candidate_Followup_Data:Candidate_Followup[]
Candidate_Followup_:Candidate_Followup= new Candidate_Followup();
Candidate_Followup_Name_Search:string;
Entry_View:boolean=true;
EditIndex: number;
Total_Entries: number;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Candidate_Followup_Edit:boolean;
Candidate_Followup_Save:boolean;
Candidate_Followup_Delete:boolean;
myInnerHeight: number;
constructor(public Candidate_Followup_Service_:Candidate_Followup_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
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
this.Candidate_Followup_Edit=this.Permissions.Edit;
this.Candidate_Followup_Save=this.Permissions.Save;
this.Candidate_Followup_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
this.myInnerHeight = (window.innerHeight);
this.myInnerHeight = this.myInnerHeight - 200;
this.Clr_Candidate_Followup();
this.Search_Candidate_Followup();
this.Entry_View=false;
}
Create_New()
{
this.Entry_View = true;
this.Clr_Candidate_Followup();
}
Close_Click()
{
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

Clr_Candidate_Followup()
 {
// this.Candidate_Followup_.Candidate_Followup_Id=0;
// this.Candidate_Followup_.Candidate_Id=0;
// this.Candidate_Followup_.Entry_Date="";
// this.Candidate_Followup_.Next_FollowUp_Date="";
// this.Candidate_Followup_.FollowUp_Difference=0;
// this.Candidate_Followup_.Status=0;
// this.Candidate_Followup_.User_Id=0;
// this.Candidate_Followup_.Remark="";
// this.Candidate_Followup_.Remark_Id=0;
// this.Candidate_Followup_.FollowUp_Type=0;
// this.Candidate_Followup_.FollowUP_Time="";
// this.Candidate_Followup_.Actual_FollowUp_Date="";
// this.Candidate_Followup_.Entry_Type="";
}
Search_Candidate_Followup()
{
this.issLoading=true;
this.Candidate_Followup_Service_.Search_Candidate_Followup('').subscribe(Rows => {
 this.Candidate_Followup_Data=Rows[0];
this.Total_Entries=this.Candidate_Followup_Data.length;
if(this.Candidate_Followup_Data.length==0)
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
Delete_Candidate_Followup(Candidate_Followup_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Candidate_Followup_Service_.Delete_Candidate_Followup(Candidate_Followup_Id).subscribe(Delete_status => {
 Delete_status = Delete_status[0];
    Delete_status = Delete_status[0].DeleteStatus_.data[0];
if(Delete_status[0][0].Candidate_Followup_Id_>0){
this.Candidate_Followup_Data.splice(index, 1);
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
Save_Candidate_Followup()
{
this.issLoading=true;
this.Candidate_Followup_Service_.Save_Candidate_Followup(this.Candidate_Followup_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].Candidate_Followup_Id_)>0)
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
Edit_Candidate_Followup(Candidate_Followup_e:Candidate_Followup,index)
{
this.Entry_View=true;
this.Candidate_Followup_=Candidate_Followup_e;
this.Candidate_Followup_=Object.assign({},Candidate_Followup_e);
}
}

