import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Certificate_Request_Service } from '../../../services/Certificate_Request.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Certificate_Request } from '../../../models/Certificate_Request';
import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';@Component({
selector: 'app-Certificate_Request',
templateUrl: './Certificate_Request.component.html',
styleUrls: ['./Certificate_Request.component.css']
})
export class Certificate_RequestComponent implements OnInit {
Certificate_Request_Data:Certificate_Request[]
Certificate_Request_:Certificate_Request= new Certificate_Request();
Certificate_Request_Name_Search:string;
Entry_View:boolean=true;
EditIndex: number;
Total_Entries: number;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Certificate_Request_Edit:boolean;
Certificate_Request_Save:boolean;
Certificate_Request_Delete:boolean;
myInnerHeight: number;
constructor(public Certificate_Request_Service_:Certificate_Request_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
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
this.Certificate_Request_Edit=this.Permissions.Edit;
this.Certificate_Request_Save=this.Permissions.Save;
this.Certificate_Request_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
this.myInnerHeight = (window.innerHeight);
this.myInnerHeight = this.myInnerHeight - 200;
this.Clr_Certificate_Request();
this.Search_Certificate_Request();
this.Entry_View=false;
}
Create_New()
{
this.Entry_View = true;
this.Clr_Certificate_Request();
}
Close_Click()
{
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

 Clr_Certificate_Request()
 {
this.Certificate_Request_.Certificate_Request_Id=0;
this.Certificate_Request_.Student_Id=0;
this.Certificate_Request_.Date="";
this.Certificate_Request_.Certificates_Id=0;
this.Certificate_Request_.Status=0;

}
Search_Certificate_Request()
{
this.issLoading=true;
this.Certificate_Request_Service_.Search_Certificate_Request('').subscribe(Rows => {
 this.Certificate_Request_Data=Rows[0];
this.Total_Entries=this.Certificate_Request_Data.length;
if(this.Certificate_Request_Data.length==0)
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
Delete_Certificate_Request(Certificate_Request_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Certificate_Request_Service_.Delete_Certificate_Request(Certificate_Request_Id).subscribe(Delete_status => {
 Delete_status = Delete_status[0];
    Delete_status = Delete_status[0].DeleteStatus_.data[0];
if(Delete_status[0][0].Certificate_Request_Id_>0){
this.Certificate_Request_Data.splice(index, 1);
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
Save_Certificate_Request()
{
this.issLoading=true;
this.Certificate_Request_Service_.Save_Certificate_Request(this.Certificate_Request_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].Certificate_Request_Id_)>0)
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
Edit_Certificate_Request(Certificate_Request_e:Certificate_Request,index)
{
this.Entry_View=true;
this.Certificate_Request_=Certificate_Request_e;
this.Certificate_Request_=Object.assign({},Certificate_Request_e);
}
}

