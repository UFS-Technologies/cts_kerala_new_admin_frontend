import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fees_Type_Service } from '../../../services/Fees_Type.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Fees_Type } from '../../../models/Fees_Type';
import {MatDialog} from '@angular/material';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
@Component({
    selector: 'app-Fees_Type',
    templateUrl: './Fees_Type.component.html',
    styleUrls: ['./Fees_Type.component.css']
})
export class Fees_TypeComponent implements OnInit {
    Fees_Type_Data:Fees_Type[]
    Fees_Type_:Fees_Type= new Fees_Type();
    Fees_Type_Name_Search:string;
    Entry_View:boolean=true;
    EditIndex: number;
    Total_Entries: number;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Fees_Type_Edit:boolean;
    Fees_Type_Save:boolean;
    Fees_Type_Delete:boolean;
    myInnerHeight: number;

    Login_User_Id:number=0;
constructor(public Fees_Type_Service_:Fees_Type_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User_Id = Number(localStorage.getItem('Login_User'));
    this.Permissions = Get_Page_Permission(4);
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.Fees_Type_Edit=this.Permissions.Edit;
    this.Fees_Type_Save=this.Permissions.Save;
    this.Fees_Type_Delete=this.Permissions.Delete;
    this.Page_Load()
    }
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 200;
    this.Clr_Fees_Type();
    this.Search_Fees_Type();
    this.Entry_View=false;
}
Create_New()
{
    this.Entry_View = true;
    this.Clr_Fees_Type();
}
Close_Click()
{
    this.Search_Fees_Type();
    this.Clr_Fees_Type();
    this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

Clr_Fees_Type()
{
    this.Fees_Type_.Fees_Type_Id=0;
    this.Fees_Type_.Fees_Type_Name="";
    this.Fees_Type_.User_Id=0;
}
Search_Fees_Type()
{
    this.issLoading=true;
    this.Fees_Type_Service_.Search_Fees_Type(this.Fees_Type_Name_Search).subscribe(Rows => {
    this.Fees_Type_Data=Rows[0];
    this.Total_Entries=this.Fees_Type_Data.length;
    if(this.Fees_Type_Data.length==0)
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
Delete_Fees_Type(Fees_Type_Id,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
        {
        this.issLoading=true;
        this.Fees_Type_Service_.Delete_Fees_Type(Fees_Type_Id).subscribe(Delete_status => {
        
        Delete_status = Delete_status[0];
        Delete_status = Delete_status[0].DeleteStatus_.data[0];
        if(Delete_status==1){
        this.Fees_Type_Data.splice(index, 1);
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
Save_Fees_Type()
{
    if(this.Fees_Type_.Fees_Type_Name===undefined || this.Fees_Type_.Fees_Type_Name==null || this.Fees_Type_.Fees_Type_Name=="")
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Fees Type ',Type: "3" }});
    return  
    }
    this.issLoading=true;
    this.Fees_Type_.User_Id = this.Login_User_Id;
    this.Fees_Type_Service_.Save_Fees_Type(this.Fees_Type_).subscribe(Save_status => {
    Save_status=Save_status[0];
    if(Number(Save_status[0].Fees_Type_Id_)>0)
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
Edit_Fees_Type(Fees_Type_e:Fees_Type,index)
{
    this.Entry_View=true;
    this.Fees_Type_=Fees_Type_e;
    this.Fees_Type_=Object.assign({},Fees_Type_e);
}
}

