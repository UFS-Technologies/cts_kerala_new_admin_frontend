import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate_Job_Apply_Service } from '../../../services/Candidate_Job_Apply.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Candidate_Job_Apply } from '../../../models/Candidate_Job_Apply';
import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';@Component({
selector: 'app-Candidate_Job_Apply',
templateUrl: './Candidate_Job_Apply.component.html',
styleUrls: ['./Candidate_Job_Apply.component.css']
})
export class Candidate_Job_ApplyComponent implements OnInit {
Candidate_Job_Apply_Data:Candidate_Job_Apply[]
Candidate_Job_Apply_:Candidate_Job_Apply= new Candidate_Job_Apply();
Candidate_Job_Apply_Name_Search:string;
Entry_View:boolean=true;
EditIndex: number;
Total_Entries: number;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Candidate_Job_Apply_Edit:boolean;
Candidate_Job_Apply_Save:boolean;
Candidate_Job_Apply_Delete:boolean;
myInnerHeight: number;
constructor(public Candidate_Job_Apply_Service_:Candidate_Job_Apply_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
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
this.Candidate_Job_Apply_Edit=this.Permissions.Edit;
this.Candidate_Job_Apply_Save=this.Permissions.Save;
this.Candidate_Job_Apply_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
this.myInnerHeight = (window.innerHeight);
this.myInnerHeight = this.myInnerHeight - 200;
this.Clr_Candidate_Job_Apply();
this.Search_Candidate_Job_Apply();
this.Entry_View=false;
}
Create_New()
{
this.Entry_View = true;
this.Clr_Candidate_Job_Apply();
}
Close_Click()
{
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

 Clr_Candidate_Job_Apply()
 {
this.Candidate_Job_Apply_.Candidate_Job_Apply_Id=0;
this.Candidate_Job_Apply_.Candidate_Id=0;
this.Candidate_Job_Apply_.Entry_Date="";
this.Candidate_Job_Apply_.Skills="";
this.Candidate_Job_Apply_.Designation="";
this.Candidate_Job_Apply_.Functional_Area_Id=0;
this.Candidate_Job_Apply_.Functional_Area_Name="";
this.Candidate_Job_Apply_.Specialization_Id=0;
this.Candidate_Job_Apply_.Specialization_Name="";
this.Candidate_Job_Apply_.Experience_Id=0;
this.Candidate_Job_Apply_.Experience_Name="";
this.Candidate_Job_Apply_.Qualification_Id=0;
this.Candidate_Job_Apply_.Qualification_Name="";
this.Candidate_Job_Apply_.Remark="";
this.Candidate_Job_Apply_.Resume="";
this.Candidate_Job_Apply_.Experience_Certificate="";
this.Candidate_Job_Apply_.Photo="";
this.Candidate_Job_Apply_.Status_Id=0;
this.Candidate_Job_Apply_.Status_Name="";
this.Candidate_Job_Apply_.User_Id=0;

}
Search_Candidate_Job_Apply()
{
this.issLoading=true;
this.Candidate_Job_Apply_Service_.Search_Candidate_Job_Apply('').subscribe(Rows => {
 this.Candidate_Job_Apply_Data=Rows[0];
this.Total_Entries=this.Candidate_Job_Apply_Data.length;
if(this.Candidate_Job_Apply_Data.length==0)
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
Delete_Candidate_Job_Apply(Candidate_Job_Apply_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Candidate_Job_Apply_Service_.Delete_Candidate_Job_Apply(Candidate_Job_Apply_Id).subscribe(Delete_status => {
 Delete_status = Delete_status[0];
    Delete_status = Delete_status[0].DeleteStatus_.data[0];
if(Delete_status[0][0].Candidate_Job_Apply_Id_>0){
this.Candidate_Job_Apply_Data.splice(index, 1);
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
Save_Candidate_Job_Apply()
{
this.issLoading=true;
this.Candidate_Job_Apply_Service_.Save_Candidate_Job_Apply(this.Candidate_Job_Apply_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].Candidate_Job_Apply_Id_)>0)
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
Edit_Candidate_Job_Apply(Candidate_Job_Apply_e:Candidate_Job_Apply,index)
{
this.Entry_View=true;
this.Candidate_Job_Apply_=Candidate_Job_Apply_e;
this.Candidate_Job_Apply_=Object.assign({},Candidate_Job_Apply_e);
}
}

