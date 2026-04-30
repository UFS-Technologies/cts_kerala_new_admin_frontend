import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Part_Service } from '../../../services/Part.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Part } from '../../../models/Part';
import {MatDialog} from '@angular/material';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { Activity_Service } from '../../../services/Activity.Service';
import { Activity } from '../../../models/Activity';
@Component({
    selector: 'app-Activity',
    templateUrl: './Activity.component.html',
    styleUrls: ['./Activity.component.css']
})
export class ActivityComponent implements OnInit {
    Activity_Data:Activity []
    Activity_:Activity= new Activity();
    Activity_Name_Search:string;
    Entry_View:boolean=true;
    EditIndex: number;
    Total_Entries: number;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Activity_Edit:boolean;
    Activity_Save:boolean;
    Activity_Delete:boolean;
    myInnerHeight: number;
    myTotalHeight: number;

    Login_User_Id:number=0;
constructor(public Activity_Service_:Activity_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User_Id = Number(localStorage.getItem('Login_User'));
    this.Permissions = Get_Page_Permission(37);
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.Activity_Edit=this.Permissions.Edit;
    this.Activity_Save=this.Permissions.Save;
    this.Activity_Delete=this.Permissions.Delete;
    this.Page_Load()
    }
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 480;
    this.myTotalHeight=this.myTotalHeight-800;
    this.Clr_Activity();
    this.Search_Activity();
    this.Entry_View=false;
}
Create_New()
{
    this.Entry_View = true;
    this.Clr_Activity();
}
Close_Click()
{
    this.Search_Activity();
    this.Clr_Activity();
    this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

Clr_Activity()
{
    this.Activity_.Activity_Id=0;
    this.Activity_.Activity_Name="";    
}
Search_Activity()
{
    this.issLoading=true;
    
    this.Activity_Service_.Search_Activity(this.Activity_Name_Search).subscribe(Rows => {
        
        this.Activity_Data=Rows[0];
    this.Total_Entries=this.Activity_Data.length;
    if(this.Activity_Data.length==0)
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
Delete_Activity(Activity_Id,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
        {
        this.issLoading=true;
        this.Activity_Service_.Delete_Activity(Activity_Id).subscribe(Delete_status => {
        
        Delete_status = Delete_status[0];
        Delete_status = Delete_status[0].DeleteStatus_.data[0];
        if(Delete_status==1){
        this.Activity_Data.splice(index, 1);
        this.Search_Activity();
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
Save_Activity()
{
    if(this.Activity_.Activity_Name===undefined || this.Activity_.Activity_Name==null || this.Activity_.Activity_Name=="")
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Activity ',Type: "3" }});
    return  
    }
    this.issLoading=true; 
       
    this.Activity_Service_.Save_Activity(this.Activity_).subscribe(Save_status => {
        
    Save_status=Save_status[0];
    if(Number(Save_status[0].Activity_Id_)>0)
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
Edit_Activity(Activity_e:Activity,index)
{
    this.Entry_View=true;
    this.Activity_=Activity_e;
    this.Activity_=Object.assign({},Activity_e);
}
}

