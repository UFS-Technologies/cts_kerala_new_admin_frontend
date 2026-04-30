import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Study_Materials_Service } from '../../../services/Study_Materials.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Study_Materials } from '../../../models/Study_Materials';
import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';@Component({
selector: 'app-Study_Materials',
templateUrl: './Study_Materials.component.html',
styleUrls: ['./Study_Materials.component.css']
})
export class Study_MaterialsComponent implements OnInit {
Study_Materials_Data:Study_Materials[]
Study_Materials_:Study_Materials= new Study_Materials();
Study_Materials_Name_Search:string;
Entry_View:boolean=true;
EditIndex: number;
Total_Entries: number;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Study_Materials_Edit:boolean;
Study_Materials_Save:boolean;
Study_Materials_Delete:boolean;
myInnerHeight: number;
constructor(public Study_Materials_Service_:Study_Materials_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
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
this.Study_Materials_Edit=this.Permissions.Edit;
this.Study_Materials_Save=this.Permissions.Save;
this.Study_Materials_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
this.myInnerHeight = (window.innerHeight);
this.myInnerHeight = this.myInnerHeight - 200;
this.Clr_Study_Materials();
this.Search_Study_Materials();
this.Entry_View=false;
}
Create_New()
{
this.Entry_View = true;
this.Clr_Study_Materials();
}
Close_Click()
{
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

 Clr_Study_Materials()
 {
this.Study_Materials_.Study_Materials_Id=0;
this.Study_Materials_.Course_Id=0;
this.Study_Materials_.Part_Id=0;
this.Study_Materials_.Subject_Id=0;
this.Study_Materials_.Course_Subject_Id=0;
this.Study_Materials_.Study_Materials_Name="";
this.Study_Materials_.File_Name="";

}
Search_Study_Materials()
{
this.issLoading=true;
this.Study_Materials_Service_.Search_Study_Materials('').subscribe(Rows => {
 this.Study_Materials_Data=Rows[0];
this.Total_Entries=this.Study_Materials_Data.length;
if(this.Study_Materials_Data.length==0)
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
Delete_Study_Materials(Study_Materials_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Study_Materials_Service_.Delete_Study_Materials(Study_Materials_Id).subscribe(Delete_status => {
 Delete_status = Delete_status[0];
    Delete_status = Delete_status[0].DeleteStatus_.data[0];
if(Delete_status[0][0].Study_Materials_Id_>0){
this.Study_Materials_Data.splice(index, 1);
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
Save_Study_Materials()
{
this.issLoading=true;
this.Study_Materials_Service_.Save_Study_Materials(this.Study_Materials_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].Study_Materials_Id_)>0)
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
Edit_Study_Materials(Study_Materials_e:Study_Materials,index)
{
this.Entry_View=true;
this.Study_Materials_=Study_Materials_e;
this.Study_Materials_=Object.assign({},Study_Materials_e);
}
}

