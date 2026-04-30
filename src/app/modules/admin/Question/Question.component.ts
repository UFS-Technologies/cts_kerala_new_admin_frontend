import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question_Service } from '../../../services/Question.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Question } from '../../../models/Question';
import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';@Component({
selector: 'app-Question',
templateUrl: './Question.component.html',
styleUrls: ['./Question.component.css']
})
export class QuestionComponent implements OnInit {
Question_Data:Question[]
Question_:Question= new Question();
Question_Name_Search:string;
Entry_View:boolean=true;
EditIndex: number;
Total_Entries: number;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Question_Edit:boolean;
Question_Save:boolean;
Question_Delete:boolean;
myInnerHeight: number;
constructor(public Question_Service_:Question_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
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
this.Question_Edit=this.Permissions.Edit;
this.Question_Save=this.Permissions.Save;
this.Question_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
this.myInnerHeight = (window.innerHeight);
this.myInnerHeight = this.myInnerHeight - 200;
this.Clr_Question();
this.Search_Question();
this.Entry_View=false;
}
Create_New()
{
this.Entry_View = true;
this.Clr_Question();
}
Close_Click()
{
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

 Clr_Question()
 {
this.Question_.Question_Id=0;
this.Question_.Question="";
this.Question_.Option1="";
this.Question_.Option2="";
this.Question_.Option3="";
this.Question_.Option4="";
this.Question_.Answer="";
this.Question_.Subject_Id=0;
this.Question_.Subject_Name="";
this.Question_.Course_Id=0;
this.Question_.Course_Name="";
this.Question_.Semester_Id=0;
this.Question_.Semester_Name="";

}
Search_Question()
{
this.issLoading=true;
this.Question_Service_.Search_Question('').subscribe(Rows => {
 this.Question_Data=Rows[0];
this.Total_Entries=this.Question_Data.length;
if(this.Question_Data.length==0)
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
Delete_Question(Question_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Question_Service_.Delete_Question(Question_Id).subscribe(Delete_status => {
 Delete_status = Delete_status[0];
    Delete_status = Delete_status[0].DeleteStatus_.data[0];
if(Delete_status[0][0].Question_Id_>0){
this.Question_Data.splice(index, 1);
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
Save_Question()
{
this.issLoading=true;
this.Question_Service_.Save_Question(this.Question_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].Question_Id_)>0)
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
Edit_Question(Question_e:Question,index)
{
this.Entry_View=true;
this.Question_=Question_e;
this.Question_=Object.assign({},Question_e);
}
}

