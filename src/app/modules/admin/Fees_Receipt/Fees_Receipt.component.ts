import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fees_Receipt_Service } from '../../../services/Fees_Receipt.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Fees_Receipt } from '../../../models/Fees_Receipt';
import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';@Component({
selector: 'app-Fees_Receipt',
templateUrl: './Fees_Receipt.component.html',
styleUrls: ['./Fees_Receipt.component.css']
})
export class Fees_ReceiptComponent implements OnInit {
Fees_Receipt_Data:Fees_Receipt[]
Fees_Receipt_:Fees_Receipt= new Fees_Receipt();
Fees_Receipt_Name_Search:string;
Entry_View:boolean=true;
EditIndex: number;
Total_Entries: number;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Fees_Receipt_Edit:boolean;
Fees_Receipt_Save:boolean;
Fees_Receipt_Delete:boolean;
myInnerHeight: number;
constructor(public Fees_Receipt_Service_:Fees_Receipt_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
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
this.Fees_Receipt_Edit=this.Permissions.Edit;
this.Fees_Receipt_Save=this.Permissions.Save;
this.Fees_Receipt_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
this.myInnerHeight = (window.innerHeight);
this.myInnerHeight = this.myInnerHeight - 200;
this.Clr_Fees_Receipt();
this.Search_Fees_Receipt();
this.Entry_View=false;
}
Create_New()
{
this.Entry_View = true;
this.Clr_Fees_Receipt();
}
Close_Click()
{
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

 Clr_Fees_Receipt()
 {
this.Fees_Receipt_.Fees_Receipt_Id=0;
this.Fees_Receipt_.Fees_Installment_Id=0;
this.Fees_Receipt_.Course_Id=0;
this.Fees_Receipt_.Course_Name="";
this.Fees_Receipt_.Student_Id=0;
this.Fees_Receipt_.Fees_Type_Id=0;
this.Fees_Receipt_.Fees_Type_Name="";
this.Fees_Receipt_.Amount=0;
this.Fees_Receipt_.Date="";

}
Search_Fees_Receipt()
{
this.issLoading=true;
this.Fees_Receipt_Service_.Search_Fees_Receipt('').subscribe(Rows => {
 this.Fees_Receipt_Data=Rows[0];
this.Total_Entries=this.Fees_Receipt_Data.length;
if(this.Fees_Receipt_Data.length==0)
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
Delete_Fees_Receipt(Fees_Receipt_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Fees_Receipt_Service_.Delete_Fees_Receipt(Fees_Receipt_Id).subscribe(Delete_status => {
 Delete_status = Delete_status[0];
    Delete_status = Delete_status[0].DeleteStatus_.data[0];
if(Delete_status[0][0].Fees_Receipt_Id_>0){
this.Fees_Receipt_Data.splice(index, 1);
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
Save_Fees_Receipt()
{
this.issLoading=true;
this.Fees_Receipt_Service_.Save_Fees_Receipt(this.Fees_Receipt_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].Fees_Receipt_Id_)>0)
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
Edit_Fees_Receipt(Fees_Receipt_e:Fees_Receipt,index)
{
this.Entry_View=true;
this.Fees_Receipt_=Fees_Receipt_e;
this.Fees_Receipt_=Object.assign({},Fees_Receipt_e);
}
}

