import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Document_Service } from '../../../services/Document.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Document } from '../../../models/Document';
import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';@Component({
selector: 'app-Document',
templateUrl: './Document.component.html',
styleUrls: ['./Document.component.css']
})
export class DocumentComponent implements OnInit {
Document_Data:Document[]
Document_:Document= new Document();
Document_Name_Search:string;
Entry_View:boolean=true;
EditIndex: number;
Total_Entries: number;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Document_Edit:boolean;
Document_Save:boolean;
Document_Delete:boolean;
myInnerHeight: number;
constructor(public Document_Service_:Document_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
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
this.Document_Edit=this.Permissions.Edit;
this.Document_Save=this.Permissions.Save;
this.Document_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
this.myInnerHeight = (window.innerHeight);
this.myInnerHeight = this.myInnerHeight - 200;
this.Clr_Document();
this.Search_Document();
this.Entry_View=false;
}
Create_New()
{
this.Entry_View = true;
this.Clr_Document();
}
Close_Click()
{
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

 Clr_Document()
 {
this.Document_.Document_Id=0;
this.Document_.Student_Id=0;
this.Document_.Document_Name="";
this.Document_.Files="";

}
Search_Document()
{
this.issLoading=true;
this.Document_Service_.Search_Document('').subscribe(Rows => {
 this.Document_Data=Rows[0];
this.Total_Entries=this.Document_Data.length;
if(this.Document_Data.length==0)
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
Delete_Document(Document_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Document_Service_.Delete_Document(Document_Id).subscribe(Delete_status => {
 Delete_status = Delete_status[0];
    Delete_status = Delete_status[0].DeleteStatus_.data[0];
if(Delete_status[0][0].Document_Id_>0){
this.Document_Data.splice(index, 1);
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
Save_Document()
{
this.issLoading=true;
this.Document_Service_.Save_Document(this.Document_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].Document_Id_)>0)
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
Edit_Document(Document_e:Document,index)
{
this.Entry_View=true;
this.Document_=Document_e;
this.Document_=Object.assign({},Document_e);
}
}

