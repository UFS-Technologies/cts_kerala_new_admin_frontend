import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription_Service } from '../../../services/Subscription.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Subscription } from '../../../models/Subscription';
import {MatDialog} from '@angular/material';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
@Component({
    selector: 'app-Subscription',
    templateUrl: './Subscription.component.html',
    styleUrls: ['./Subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
    Subscription_Data:Subscription[]
    Subscription_:Subscription= new Subscription();
    Subscription_Name_Search:string;
    Entry_View:boolean=true;
    EditIndex: number;
    Total_Entries: number;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Subscription_Edit:boolean;
    Subscription_Save:boolean;
    Subscription_Delete:boolean;
    myInnerHeight: number;
    myTotalHeight: number;
    Login_User_Id:number=0;
constructor(public Subscription_Service_:Subscription_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User_Id = Number(localStorage.getItem('Login_User'));
    this.Permissions = Get_Page_Permission(42);
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.Subscription_Edit=this.Permissions.Edit;
    this.Subscription_Save=this.Permissions.Save;
    this.Subscription_Delete=this.Permissions.Delete;
    this.Page_Load()
    }
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 600;
    this.myTotalHeight=this.myTotalHeight-350;
    this.Clr_Subscription();
    this.Search_Subscription();
    this.Entry_View=false;
}
Create_New()
{
    this.Entry_View = true;
    this.Clr_Subscription();
}
Close_Click()
{
    this.Search_Subscription();
    this.Clr_Subscription();
    this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

Clr_Subscription()
{
    this.Subscription_.Subscription_Id=0;
    this.Subscription_.Subscription_Name="";
    this.Subscription_.Subscription_Amount=0;
    this.Subscription_.Duration=0;
}
Search_Subscription()
{
    this.issLoading=true;
    this.Subscription_Service_.Search_Subscription(this.Subscription_Name_Search).subscribe(Rows => {
    this.Subscription_Data=Rows[0];
    this.Total_Entries=this.Subscription_Data.length;
    if(this.Subscription_Data.length==0)
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
Delete_Subscription(Subscription_Id,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
        {
        this.issLoading=true;
        this.Subscription_Service_.Delete_Subscription(Subscription_Id).subscribe(Delete_status => {
            
        
        Delete_status = Delete_status[0];
        Delete_status = Delete_status[0].DeleteStatus_.data[0];
        if(Delete_status==1){
        this.Subscription_Data.splice(index, 1);
        this.Search_Subscription();
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
Save_Subscription()
{
    if(this.Subscription_.Subscription_Name===undefined || this.Subscription_.Subscription_Name==null || this.Subscription_.Subscription_Name=="")
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Subscription ',Type: "3" }});
    return  
    }

    else if(this.Subscription_.Duration===undefined || this.Subscription_.Duration==null || this.Subscription_.Duration==0)
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Duration ',Type: "3" }});
    return  
    }

   else if(this.Subscription_.Subscription_Amount===undefined || this.Subscription_.Subscription_Amount==null || this.Subscription_.Subscription_Amount==0)
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Subscription Amount ',Type: "3" }});
    return  
    }
    this.issLoading=true;
    // this.Subscription_.User_Id = this.Login_User_Id;
    this.Subscription_Service_.Save_Subscription(this.Subscription_).subscribe(Save_status => {
    Save_status=Save_status[0];
    if(Number(Save_status[0].Subscription_Id_)>0)
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
Edit_Subscription(Subscription_e:Subscription,index)
{
    this.Entry_View=true;
    this.Subscription_=Subscription_e;
    this.Subscription_=Object.assign({},Subscription_e);
}
}

