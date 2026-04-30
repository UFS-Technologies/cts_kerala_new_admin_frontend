import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course_Type_Service } from '../../../services/Course_Type.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Course_Type } from '../../../models/Course_Type';
import {MatDialog} from '@angular/material';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
@Component({
    selector: 'app-Course_Type',
    templateUrl: './Course_Type.component.html',
    styleUrls: ['./Course_Type.component.css']
})
export class Course_TypeComponent implements OnInit {
    Course_Type_Data:Course_Type[]
    Course_Type_:Course_Type= new Course_Type();
    Course_Type_Name_Search:string;
    Entry_View:boolean=true;
    EditIndex: number;
    Total_Entries: number;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Course_Type_Edit:boolean;
    Course_Type_Save:boolean;
    Course_Type_Delete:boolean;
    myInnerHeight: number;
    myTotalHeight:number;

    Login_User_Id:number=0;
constructor(public Course_Type_Service_:Course_Type_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User_Id = Number(localStorage.getItem('Login_User'));
    this.Permissions = Get_Page_Permission(3);
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.Course_Type_Edit=this.Permissions.Edit;
    this.Course_Type_Save=this.Permissions.Save;
    this.Course_Type_Delete=this.Permissions.Delete;
    this.Page_Load()
    }
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 200;
    this.Clr_Course_Type();
    this.Search_Course_Type();
    this.Entry_View=false;

    this.myInnerHeight = (window.innerHeight);
        this.myTotalHeight=this.myInnerHeight
        this.myTotalHeight=this.myTotalHeight-40;
        this.myInnerHeight = this.myInnerHeight - 300;

}
Create_New()
{
    this.Entry_View = true;
    this.Clr_Course_Type();
}
Close_Click()
{
    this.Search_Course_Type();
    this.Clr_Course_Type();
    this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

Clr_Course_Type()
{
    this.Course_Type_.Course_Type_Id=0;
    this.Course_Type_.Course_Type_Name="";
    this.Course_Type_.User_Id=0;
}
Search_Course_Type()
{
    this.issLoading=true;
    this.Course_Type_Service_.Search_Course_Type(this.Course_Type_Name_Search).subscribe(Rows => {
    this.Course_Type_Data=Rows[0];
    this.Total_Entries=this.Course_Type_Data.length;
    if(this.Course_Type_Data.length==0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
    this.issLoading=false;
    }
    this.issLoading=false;
    },
    Rows => { 
    this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
}
Delete_Course_Type(Course_Type_Id,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
        {
        this.issLoading=true;
        this.Course_Type_Service_.Delete_Course_Type(Course_Type_Id).subscribe(Delete_status => {
        
        Delete_status = Delete_status[0];
        Delete_status = Delete_status[0].DeleteStatus_.data[0];
        if(Delete_status==1){
        this.Course_Type_Data.splice(index, 1);
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type: "false"}});
        }
        else
        {
        this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Cannot be Delete',Type:"2"}});
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
Save_Course_Type()
{
    if(this.Course_Type_.Course_Type_Name===undefined || this.Course_Type_.Course_Type_Name==null || this.Course_Type_.Course_Type_Name=="")
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Course Type ',Type: "3" }});
    return  
    }
    this.issLoading=true;
    this.Course_Type_.User_Id = this.Login_User_Id;
    this.Course_Type_Service_.Save_Course_Type(this.Course_Type_).subscribe(Save_status => {
    Save_status=Save_status[0];
    if(Number(Save_status[0].Course_Type_Id_)>0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
    this.Close_Click();
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
Edit_Course_Type(Course_Type_e:Course_Type,index)
{
    this.Entry_View=true;
    this.Course_Type_=Course_Type_e;
    this.Course_Type_=Object.assign({},Course_Type_e);
}
}

