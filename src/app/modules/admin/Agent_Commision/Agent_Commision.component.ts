import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agent_Commision_Service } from '../../../services/Agent_Commision.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Agent_Commision } from '../../../models/Agent_Commision';
import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';@Component({
selector: 'app-Agent_Commision',
templateUrl: './Agent_Commision.component.html',
styleUrls: ['./Agent_Commision.component.css']
})
export class Agent_CommisionComponent implements OnInit {
Agent_Commision_Data:Agent_Commision[]
Agent_Commision_:Agent_Commision= new Agent_Commision();
Agent_Commision_Name_Search:string;
Entry_View:boolean=true;
EditIndex: number;
Total_Entries: number;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Agent_Commision_Edit:boolean;
Agent_Commision_Save:boolean;
Agent_Commision_Delete:boolean;
myInnerHeight: number;
constructor(public Agent_Commision_Service_:Agent_Commision_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
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
this.Agent_Commision_Edit=this.Permissions.Edit;
this.Agent_Commision_Save=this.Permissions.Save;
this.Agent_Commision_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
this.myInnerHeight = (window.innerHeight);
this.myInnerHeight = this.myInnerHeight - 200;
this.Clr_Agent_Commision();
this.Search_Agent_Commision();
this.Entry_View=false;
}
Create_New()
{
this.Entry_View = true;
this.Clr_Agent_Commision();
}
Close_Click()
{
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

 Clr_Agent_Commision()
 {
this.Agent_Commision_.Agent_Commision_Id=0;
this.Agent_Commision_.Agent_Id=0;
this.Agent_Commision_.Category_Id=0;
this.Agent_Commision_.Category_Name="";
this.Agent_Commision_.Commision_Per="";
this.Agent_Commision_.Commision_Amount=0;

}
Search_Agent_Commision()
{
this.issLoading=true;
this.Agent_Commision_Service_.Search_Agent_Commision('').subscribe(Rows => {
 this.Agent_Commision_Data=Rows[0];
this.Total_Entries=this.Agent_Commision_Data.length;
if(this.Agent_Commision_Data.length==0)
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
Delete_Agent_Commision(Agent_Commision_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Agent_Commision_Service_.Delete_Agent_Commision(Agent_Commision_Id).subscribe(Delete_status => {
 Delete_status = Delete_status[0];
    Delete_status = Delete_status[0].DeleteStatus_.data[0];
if(Delete_status[0][0].Agent_Commision_Id_>0){
this.Agent_Commision_Data.splice(index, 1);
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
Save_Agent_Commision()
{
this.issLoading=true;
this.Agent_Commision_Service_.Save_Agent_Commision(this.Agent_Commision_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].Agent_Commision_Id_)>0)
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
Edit_Agent_Commision(Agent_Commision_e:Agent_Commision,index)
{
this.Entry_View=true;
this.Agent_Commision_=Agent_Commision_e;
this.Agent_Commision_=Object.assign({},Agent_Commision_e);
}
}

