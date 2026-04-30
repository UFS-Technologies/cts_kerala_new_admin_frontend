import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Qualification_Service } from '../../../services/Qualification.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Qualification } from '../../../models/Qualification';
import {MatDialog} from '@angular/material';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
@Component({
    selector: 'app-Qualification',
    templateUrl: './Qualification.component.html',
    styleUrls: ['./Qualification.component.css']
})
export class QualificationComponent implements OnInit {
    Qualification_Data:Qualification[]
    Qualification_:Qualification= new Qualification();
    Qualification_Name_Search:string;
    Entry_View:boolean=true;
    EditIndex: number;
    Total_Entries: number;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Qualification_Edit:boolean;
    Qualification_Save:boolean;
    Qualification_Delete:boolean;
    myInnerHeight: number;

    Login_User_Id:number=0;
constructor(public Qualification_Service_:Qualification_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User_Id = Number(localStorage.getItem('Login_User'));
    this.Permissions = Get_Page_Permission(10);
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.Qualification_Edit=this.Permissions.Edit;
    this.Qualification_Save=this.Permissions.Save;
    this.Qualification_Delete=this.Permissions.Delete;
    this.Page_Load()
    }
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 200;
    this.Clr_Qualification();
    this.Search_Qualification();
    this.Entry_View=false;
}
Create_New()
{
    this.Entry_View = true;
    this.Clr_Qualification();
}
Close_Click()
{
    this.Search_Qualification();
    this.Clr_Qualification();
    this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

Clr_Qualification()
{
    this.Qualification_.Qualification_Id=0;
    this.Qualification_.Qualification_Name="";
    this.Qualification_.User_Id=0;
}
Search_Qualification()
{
    this.issLoading=true;
    this.Qualification_Service_.Search_Qualification(this.Qualification_Name_Search).subscribe(Rows => {
    this.Qualification_Data=Rows[0];
    this.Total_Entries=this.Qualification_Data.length;
    if(this.Qualification_Data.length==0)
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
Delete_Qualification(Qualification_Id,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
        {
        this.issLoading=true;
        this.Qualification_Service_.Delete_Qualification(Qualification_Id).subscribe(Delete_Qualification => {
        
        Delete_Qualification = Delete_Qualification[0];
        Delete_Qualification = Delete_Qualification[0].DeleteStatus_.data[0];
        if(Delete_Qualification==1){
        this.Qualification_Data.splice(index, 1);
        this.Search_Qualification();
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
Save_Qualification()
{
    if(this.Qualification_.Qualification_Name===undefined || this.Qualification_.Qualification_Name==null || this.Qualification_.Qualification_Name=="")
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Qualification ',Type: "3" }});
    return  
    }
    this.issLoading=true;
    this.Qualification_.User_Id = this.Login_User_Id;
    this.Qualification_Service_.Save_Qualification(this.Qualification_).subscribe(Save_Qualification => {
    Save_Qualification=Save_Qualification[0];
    if(Number(Save_Qualification[0].Qualification_Id_)>0)
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
Edit_Qualification(Qualification_e:Qualification,index)
{
    this.Entry_View=true;
    this.Qualification_=Qualification_e;
    this.Qualification_=Object.assign({},Qualification_e);
}
}

