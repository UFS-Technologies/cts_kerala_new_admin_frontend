import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Part_Service } from '../../../services/Part.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Part } from '../../../models/Part';
import {MatDialog} from '@angular/material';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
@Component({
    selector: 'app-Part',
    templateUrl: './Part.component.html',
    styleUrls: ['./Part.component.css']
})
export class PartComponent implements OnInit {
    Part_Data:Part[]
    Part_:Part= new Part();
    Part_Name_Search:string;
    Entry_View:boolean=true;
    EditIndex: number;
    Total_Entries: number;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Part_Edit:boolean;
    Part_Save:boolean;
    Part_Delete:boolean;
    myInnerHeight: number;
    myTotalHeight:number;
    Login_User_Id:number=0;
constructor(public Part_Service_:Part_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User_Id = Number(localStorage.getItem('Login_User'));
    this.Permissions = Get_Page_Permission(6);
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.Part_Edit=this.Permissions.Edit;
    this.Part_Save=this.Permissions.Save;
    this.Part_Delete=this.Permissions.Delete;
    this.Page_Load()
    }
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 200;
    this.Clr_Part();
    this.Search_Part();
    this.Entry_View=false;
    this.myInnerHeight = (window.innerHeight);
        this.myTotalHeight=this.myInnerHeight
        this.myTotalHeight=this.myTotalHeight-310;
        this.myInnerHeight = this.myInnerHeight - 250;
}
Create_New()
{
    this.Entry_View = true;
    this.Clr_Part();
}
Close_Click()
{
    this.Search_Part();
    this.Clr_Part();
    this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

Clr_Part()
{
    this.Part_.Part_Id=0;
    this.Part_.Part_Name="";
    this.Part_.User_Id=0;
}
Search_Part()
{
    this.issLoading=true;
    this.Part_Service_.Search_Part(this.Part_Name_Search).subscribe(Rows => {
    this.Part_Data=Rows[0];
    this.Total_Entries=this.Part_Data.length;
    if(this.Part_Data.length==0)
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
Delete_Part(Part_Id,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
        {
        this.issLoading=true;
        this.Part_Service_.Delete_Part(Part_Id).subscribe(Delete_status => {
        
        Delete_status = Delete_status[0];
        Delete_status = Delete_status[0].DeleteStatus_.data[0];
        if(Delete_status==1){
        this.Part_Data.splice(index, 1);
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
Save_Part()
{
    if(this.Part_.Part_Name===undefined || this.Part_.Part_Name==null || this.Part_.Part_Name=="")
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Part ',Type: "3" }});
    return  
    }
    if(this.Part_.Serial_No===undefined || this.Part_.Serial_No==null || this.Part_.Serial_No==0)
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Serial No ',Type: "3" }});
    return  
    }
    this.issLoading=true;
    this.Part_.User_Id = this.Login_User_Id;
    this.Part_Service_.Save_Part(this.Part_).subscribe(Save_status => {
    Save_status=Save_status[0];
    if(Number(Save_status[0].Part_Id_)>0)
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
Edit_Part(Part_e:Part,index)
{
    this.Entry_View=true;
    this.Part_=Part_e;
    this.Part_=Object.assign({},Part_e);
}
}

