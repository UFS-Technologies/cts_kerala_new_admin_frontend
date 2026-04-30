import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Batch_Service } from '../../../services/Batch.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Batch } from '../../../models/Batch';
import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';@Component({
selector: 'app-Batch',
templateUrl: './Batch.component.html',
styleUrls: ['./Batch.component.css']
})
export class BatchComponent implements OnInit {
Batch_Data:Batch[]
Batch_:Batch= new Batch();
Batch_Name_Search:string;
Entry_View:boolean=true;
EditIndex: number;
Total_Entries: number;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Batch_Edit:boolean;
Batch_Save:boolean;
Batch_Delete:boolean;
myInnerHeight: number;
constructor(public Batch_Service_:Batch_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
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
this.Batch_Edit=this.Permissions.Edit;
this.Batch_Save=this.Permissions.Save;
this.Batch_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
this.myInnerHeight = (window.innerHeight);
this.myInnerHeight = this.myInnerHeight - 200;
this.Clr_Batch();
this.Search_Batch();
this.Entry_View=false;
}
Create_New()
{
this.Entry_View = true;
this.Clr_Batch();
}
Close_Click()
{
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

 Clr_Batch()
 {
this.Batch_.Batch_Id=0;
this.Batch_.Batch_Name="";
this.Batch_.User_Id=0;

}
Search_Batch()
{
this.issLoading=true;
this.Batch_Service_.Search_Batch('').subscribe(Rows => {
 this.Batch_Data=Rows[0];
this.Total_Entries=this.Batch_Data.length;
if(this.Batch_Data.length==0)
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
Delete_Batch(Batch_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Batch_Service_.Delete_Batch(Batch_Id).subscribe(Delete_status => {
 Delete_status = Delete_status[0];
    Delete_status = Delete_status[0].DeleteStatus_.data[0];
if(Delete_status[0][0].Batch_Id_>0){
this.Batch_Data.splice(index, 1);
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
Save_Batch()
{
this.issLoading=true;
this.Batch_Service_.Save_Batch(this.Batch_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].Batch_Id_)>0)
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
Edit_Batch(Batch_e:Batch,index)
{
this.Entry_View=true;
this.Batch_=Batch_e;
this.Batch_=Object.assign({},Batch_e);
}
}

