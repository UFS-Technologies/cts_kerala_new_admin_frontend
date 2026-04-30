import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agent_Course_Type_Service } from '../../../services/Agent_Course_Type.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Agent_Course_Type } from '../../../models/Agent_Course_Type';
import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';@Component({
selector: 'app-Agent_Course_Type',
templateUrl: './Agent_Course_Type.component.html',
styleUrls: ['./Agent_Course_Type.component.css']
})
export class Agent_Course_TypeComponent implements OnInit {
Agent_Course_Type_Data:Agent_Course_Type[]
Agent_Course_Type_:Agent_Course_Type= new Agent_Course_Type();
Agent_Course_Type_Name_Search:string;
Entry_View:boolean=true;
EditIndex: number;
Total_Entries: number;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Agent_Course_Type_Edit:boolean;
Agent_Course_Type_Save:boolean;
Agent_Course_Type_Delete:boolean;
myInnerHeight: number;
constructor(public Agent_Course_Type_Service_:Agent_Course_Type_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
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
this.Agent_Course_Type_Edit=this.Permissions.Edit;
this.Agent_Course_Type_Save=this.Permissions.Save;
this.Agent_Course_Type_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
this.myInnerHeight = (window.innerHeight);
this.myInnerHeight = this.myInnerHeight - 200;
this.Clr_Agent_Course_Type();
this.Search_Agent_Course_Type();
this.Entry_View=false;
}
Create_New()
{
this.Entry_View = true;
this.Clr_Agent_Course_Type();
}
Close_Click()
{
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

 Clr_Agent_Course_Type()
 {
this.Agent_Course_Type_.Agent_Course_Type_Id=0;
this.Agent_Course_Type_.Agent_Id=0;
this.Agent_Course_Type_.Course_Type_Id=0;
this.Agent_Course_Type_.Cousrse_Type_Name="";

}
Search_Agent_Course_Type()
{
this.issLoading=true;
this.Agent_Course_Type_Service_.Search_Agent_Course_Type('').subscribe(Rows => {
 this.Agent_Course_Type_Data=Rows[0];
this.Total_Entries=this.Agent_Course_Type_Data.length;
if(this.Agent_Course_Type_Data.length==0)
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
Delete_Agent_Course_Type(Agent_Course_Type_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Agent_Course_Type_Service_.Delete_Agent_Course_Type(Agent_Course_Type_Id).subscribe(Delete_status => {
 Delete_status = Delete_status[0];
    Delete_status = Delete_status[0].DeleteStatus_.data[0];
if(Delete_status[0][0].Agent_Course_Type_Id_>0){
this.Agent_Course_Type_Data.splice(index, 1);
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
Save_Agent_Course_Type()
{
this.issLoading=true;
this.Agent_Course_Type_Service_.Save_Agent_Course_Type(this.Agent_Course_Type_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].Agent_Course_Type_Id_)>0)
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
Edit_Agent_Course_Type(Agent_Course_Type_e:Agent_Course_Type,index)
{
this.Entry_View=true;
this.Agent_Course_Type_=Agent_Course_Type_e;
this.Agent_Course_Type_=Object.assign({},Agent_Course_Type_e);
}
}

