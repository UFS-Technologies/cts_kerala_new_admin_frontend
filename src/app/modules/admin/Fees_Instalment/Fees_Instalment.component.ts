import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fees_Instalment_Service } from '../../../services/Fees_Instalment.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Fees_Instalment } from '../../../models/Fees_Instalment';
import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';@Component({
selector: 'app-Fees_Instalment',
templateUrl: './Fees_Instalment.component.html',
styleUrls: ['./Fees_Instalment.component.css']
})
export class Fees_InstalmentComponent implements OnInit {
Fees_Instalment_Data:Fees_Instalment[]
Fees_Instalment_:Fees_Instalment= new Fees_Instalment();
Fees_Instalment_Name_Search:string;
Entry_View:boolean=true;
EditIndex: number;
Total_Entries: number;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Fees_Instalment_Edit:boolean;
Fees_Instalment_Save:boolean;
Fees_Instalment_Delete:boolean;
myInnerHeight: number;
constructor(public Fees_Instalment_Service_:Fees_Instalment_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
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
this.Fees_Instalment_Edit=this.Permissions.Edit;
this.Fees_Instalment_Save=this.Permissions.Save;
this.Fees_Instalment_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
this.myInnerHeight = (window.innerHeight);
this.myInnerHeight = this.myInnerHeight - 200;
this.Clr_Fees_Instalment();
this.Search_Fees_Instalment();
this.Entry_View=false;
}
Create_New()
{
this.Entry_View = true;
this.Clr_Fees_Instalment();
}
Close_Click()
{
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

 Clr_Fees_Instalment()
 {
this.Fees_Instalment_.Fees_Instalment_Id=0;
this.Fees_Instalment_.Student_Id=0;
this.Fees_Instalment_.Course_Id="";
this.Fees_Instalment_.Fees_Type_Id="";
this.Fees_Instalment_.Instalment_Date="";
this.Fees_Instalment_.Amount=0;
this.Fees_Instalment_.Status=0;

}
Search_Fees_Instalment()
{
this.issLoading=true;
this.Fees_Instalment_Service_.Search_Fees_Instalment('').subscribe(Rows => {
 this.Fees_Instalment_Data=Rows[0];
this.Total_Entries=this.Fees_Instalment_Data.length;
if(this.Fees_Instalment_Data.length==0)
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
Delete_Fees_Instalment(Fees_Instalment_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Fees_Instalment_Service_.Delete_Fees_Instalment(Fees_Instalment_Id).subscribe(Delete_status => {
 Delete_status = Delete_status[0];
    Delete_status = Delete_status[0].DeleteStatus_.data[0];
if(Delete_status[0][0].Fees_Instalment_Id_>0){
this.Fees_Instalment_Data.splice(index, 1);
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
Save_Fees_Instalment()
{
this.issLoading=true;
this.Fees_Instalment_Service_.Save_Fees_Instalment(this.Fees_Instalment_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].Fees_Instalment_Id_)>0)
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
Edit_Fees_Instalment(Fees_Instalment_e:Fees_Instalment,index)
{
this.Entry_View=true;
this.Fees_Instalment_=Fees_Instalment_e;
this.Fees_Instalment_=Object.assign({},Fees_Instalment_e);
}
}

