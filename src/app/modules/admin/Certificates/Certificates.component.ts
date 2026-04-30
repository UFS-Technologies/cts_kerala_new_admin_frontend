import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Certificates_Service } from '../../../services/Certificates.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Certificates } from '../../../models/Certificates';
import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';@Component({
selector: 'app-Certificates',
templateUrl: './Certificates.component.html',
styleUrls: ['./Certificates.component.css']
})
export class CertificatesComponent implements OnInit {
Certificates_Data:Certificates[]
Certificates_:Certificates= new Certificates();
Certificates_Name_Search:string;
Entry_View:boolean=true;
EditIndex: number;
Total_Entries: number;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Certificates_Edit:boolean;
Certificates_Save:boolean;
Certificates_Delete:boolean;
myInnerHeight: number;
constructor(public Certificates_Service_:Certificates_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
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
this.Certificates_Edit=this.Permissions.Edit;
this.Certificates_Save=this.Permissions.Save;
this.Certificates_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
this.myInnerHeight = (window.innerHeight);
this.myInnerHeight = this.myInnerHeight - 200;
this.Clr_Certificates();
this.Search_Certificates();
this.Entry_View=false;
}
Create_New()
{
this.Entry_View = true;
this.Clr_Certificates();
}
Close_Click()
{
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

 Clr_Certificates()
 {
this.Certificates_.Certificates_Id=0;
this.Certificates_.Certificates_Name="";
this.Certificates_.User_Id=0;

}
Search_Certificates()
{
this.issLoading=true;
this.Certificates_Service_.Search_Certificates('').subscribe(Rows => {
 this.Certificates_Data=Rows[0];
this.Total_Entries=this.Certificates_Data.length;
if(this.Certificates_Data.length==0)
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
Delete_Certificates(Certificates_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Certificates_Service_.Delete_Certificates(Certificates_Id).subscribe(Delete_status => {
 Delete_status = Delete_status[0];
    Delete_status = Delete_status[0].DeleteStatus_.data[0];
if(Delete_status[0][0].Certificates_Id_>0){
this.Certificates_Data.splice(index, 1);
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
Save_Certificates()
{
this.issLoading=true;
this.Certificates_Service_.Save_Certificates(this.Certificates_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].Certificates_Id_)>0)
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
Edit_Certificates(Certificates_e:Certificates,index)
{
this.Entry_View=true;
this.Certificates_=Certificates_e;
this.Certificates_=Object.assign({},Certificates_e);
}
}

