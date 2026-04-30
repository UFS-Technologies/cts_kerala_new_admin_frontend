import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Specialization_Service } from '../../../services/Specialization.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Specialization } from '../../../models/Specialization';
import {MatDialog} from '@angular/material';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
@Component({
    selector: 'app-Specialization',
    templateUrl: './Specialization.component.html',
    styleUrls: ['./Specialization.component.css']
})
export class SpecializationComponent implements OnInit {
    Specialization_Data:Specialization[]
    Specialization_:Specialization= new Specialization();
    Specialization_Name_Search:string;
    Entry_View:boolean=true;
    EditIndex: number;
    Total_Entries: number;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Specialization_Edit:boolean;
    Specialization_Save:boolean;
    Specialization_Delete:boolean;
    myInnerHeight: number;

    Login_User_Id:number=0;
constructor(public Specialization_Service_:Specialization_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User_Id = Number(localStorage.getItem('Login_User'));
    this.Permissions = Get_Page_Permission(11);
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.Specialization_Edit=this.Permissions.Edit;
    this.Specialization_Save=this.Permissions.Save;
    this.Specialization_Delete=this.Permissions.Delete;
    this.Page_Load()
    }
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 200;
    this.Clr_Specialization();
    this.Search_Specialization();
    this.Entry_View=false;
}
Create_New()
{
    this.Entry_View = true;
    this.Clr_Specialization();
}
Close_Click()
{
    this.Search_Specialization();
    this.Clr_Specialization();
    this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

Clr_Specialization()
{
    this.Specialization_.Specialization_Id=0;
    this.Specialization_.Specialization_Name="";
    this.Specialization_.User_Id=0;
}
Search_Specialization()
{
    this.issLoading=true;
    this.Specialization_Service_.Search_Specialization(this.Specialization_Name_Search).subscribe(Rows => {
    this.Specialization_Data=Rows[0];
    this.Total_Entries=this.Specialization_Data.length;
    if(this.Specialization_Data.length==0)
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
Delete_Specialization(Specialization_Id,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
        {
        this.issLoading=true;
        this.Specialization_Service_.Delete_Specialization(Specialization_Id).subscribe(DeleteStatus => {
            
        
            DeleteStatus = DeleteStatus[0];
            DeleteStatus = DeleteStatus[0].DeleteStatus_.data[0];
        if(DeleteStatus==1){
        this.Specialization_Data.splice(index, 1);
        this.Search_Specialization();
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
Save_Specialization()
{
    if(this.Specialization_.Specialization_Name===undefined || this.Specialization_.Specialization_Name==null || this.Specialization_.Specialization_Name=="")
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Specialization ',Type: "3" }});
    return  
    }
    this.issLoading=true;
    this.Specialization_.User_Id = this.Login_User_Id;
    this.Specialization_Service_.Save_Specialization(this.Specialization_).subscribe(Save_Specialization => {
    Save_Specialization=Save_Specialization[0];
    if(Number(Save_Specialization[0].Specialization_Id_)>0)
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
Edit_Specialization(Specialization_e:Specialization,index)
{
    this.Entry_View=true;
    this.Specialization_=Specialization_e;
    this.Specialization_=Object.assign({},Specialization_e);
}
}

