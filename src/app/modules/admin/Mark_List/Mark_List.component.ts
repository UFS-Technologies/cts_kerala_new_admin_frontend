import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mark_List_Service } from '../../../services/Mark_List.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Mark_List } from '../../../models/Mark_List';
import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';@Component({
selector: 'app-Mark_List',
templateUrl: './Mark_List.component.html',
styleUrls: ['./Mark_List.component.css']
})
export class Mark_ListComponent implements OnInit {
Mark_List_Data:Mark_List[]
Mark_List_:Mark_List= new Mark_List();
Mark_List_Name_Search:string;
Entry_View:boolean=true;
EditIndex: number;
Total_Entries: number;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Mark_List_Edit:boolean;
Mark_List_Save:boolean;
Mark_List_Delete:boolean;
myInnerHeight: number;
constructor(public Mark_List_Service_:Mark_List_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
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
this.Mark_List_Edit=this.Permissions.Edit;
this.Mark_List_Save=this.Permissions.Save;
this.Mark_List_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
this.myInnerHeight = (window.innerHeight);
this.myInnerHeight = this.myInnerHeight - 200;
this.Clr_Mark_List();
this.Search_Mark_List();
this.Entry_View=false;
}
Create_New()
{
this.Entry_View = true;
this.Clr_Mark_List();
}
Close_Click()
{
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

 Clr_Mark_List()
 {
// this.Mark_List_.Mark_List_Id=0;
// this.Mark_List_.Student_Id=0;
// this.Mark_List_.Course_Id=0;
// this.Mark_List_.Course_Name="";
// this.Mark_List_.Subject_Id=0;
// this.Mark_List_.Subject_Name="";
// this.Mark_List_.Minimum_Mark="";
// this.Mark_List_.Maximum_Mark="";
// this.Mark_List_.Mark_Obtained="";
// this.Mark_List_.User_Id=0;

}
Search_Mark_List()
{
this.issLoading=true;
this.Mark_List_Service_.Search_Mark_List('').subscribe(Rows => {
 this.Mark_List_Data=Rows[0];
this.Total_Entries=this.Mark_List_Data.length;
if(this.Mark_List_Data.length==0)
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
Delete_Mark_List(Mark_List_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Mark_List_Service_.Delete_Mark_List(Mark_List_Id).subscribe(Delete_status => {
 Delete_status = Delete_status[0];
    Delete_status = Delete_status[0].DeleteStatus_.data[0];
if(Delete_status[0][0].Mark_List_Id_>0){
this.Mark_List_Data.splice(index, 1);
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
Save_Mark_List()
{
this.issLoading=true;
this.Mark_List_Service_.Save_Mark_List(this.Mark_List_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].Mark_List_Id_)>0)
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
Edit_Mark_List(Mark_List_e:Mark_List,index)
{
this.Entry_View=true;
this.Mark_List_=Mark_List_e;
this.Mark_List_=Object.assign({},Mark_List_e);
}
}

