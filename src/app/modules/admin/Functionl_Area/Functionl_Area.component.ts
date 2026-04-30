import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Functionl_Area_Service } from '../../../services/Functionl_Area.service';
import { GeneralFunctions_Service } from '../../../services/GeneralFunctions.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Functionl_Area } from '../../../models/Functionl_Area';
import {MatDialog} from '@angular/material';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
@Component({
selector: 'app-Functionl_Area',
templateUrl: './Functionl_Area.component.html',
styleUrls: ['./Functionl_Area.component.css']
})
export class Functionl_AreaComponent implements OnInit {
Functionl_Area_Data:Functionl_Area[]
Functionl_Area_:Functionl_Area= new Functionl_Area();
Functionl_Area_Name_Search:string;
Entry_View:boolean=true;
EditIndex: number;
Total_Entries: number;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Functionl_Area_Edit:boolean;
Functionl_Area_Save:boolean;
Functionl_Area_Delete:boolean;
myInnerHeight: number;
myTotalHeight:number;
Login_User: string = "0";

constructor(public GeneralFunctions_Service_:GeneralFunctions_Service, public Functionl_Area_Service_:Functionl_Area_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
this.Login_User = localStorage.getItem("Login_User");
// this.Permissions = Get_Page_Permission(14);
// if(this.Permissions==undefined || this.Permissions==null)
// {
// localStorage.removeItem('token');
// this.router.navigateByUrl('/auth/login');
// }
// else
{
// this.Functionl_Area_Edit=this.Permissions.Edit;
// this.Functionl_Area_Save=this.Permissions.Save;
// this.Functionl_Area_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
this.myInnerHeight = (window.innerHeight);
this.myInnerHeight = this.myInnerHeight - 450;
this.myTotalHeight=this.myTotalHeight-200;
this.Clr_Functionl_Area();
this.Search_Functionl_Area();
this.Entry_View=false;
this.Get_Menu_Status(15,this.Login_User); 

}

Get_Menu_Status(Menu_id, Login_user_id)
{
    
this.issLoading = false;
this.GeneralFunctions_Service_.Get_Menu_Status(Menu_id,Login_user_id).subscribe(Rows => {            

    
    if (Rows[0][0]==undefined)
    {
        localStorage.removeItem('token');
        this.router.navigateByUrl('Home_Page');
    }  
    else
    if (Rows[0][0].View >0) 
    {       
        
        if(Menu_id==15)
        {
             this.Permissions=Rows[0][0];
            if(this.Permissions==undefined || this.Permissions==null)
                {
                    localStorage.removeItem('token');
                    this.router.navigateByUrl('Home_Page');
                }
               
                this.Functionl_Area_Edit=this.Permissions.Edit;
                this.Functionl_Area_Save=this.Permissions.Save;
                this.Functionl_Area_Delete=this.Permissions.Delete;
        }

    }
},
Rows => {
    this.issLoading = false;
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
});
}


Create_New()
{
this.Entry_View = true;
this.Clr_Functionl_Area();
}
Close_Click()
{
this.Entry_View = false;
this.Search_Functionl_Area();
this.Clr_Functionl_Area();
}
trackByFn(index, item) 
{
return index;
}

 Clr_Functionl_Area()
 {
this.Functionl_Area_.Functionl_Area_Id=0;
this.Functionl_Area_.Functionl_Area_Name="";
this.Functionl_Area_.User_Id=0;

}
Search_Functionl_Area()
{
this.issLoading=true;
this.Functionl_Area_Service_.Search_Functionl_Area(this.Functionl_Area_Name_Search).subscribe(Rows => {
 this.Functionl_Area_Data=Rows[0];
this.Total_Entries=this.Functionl_Area_Data.length;
// this.Total_Entries=this.Functionl_Area_Data.length;
if(this.Functionl_Area_Data.length==0)
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
Delete_Functionl_Area(Functionl_Area_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;

this.Functionl_Area_Service_.Delete_Functionl_Area(Functionl_Area_Id).subscribe(Delete_status => {

    Delete_status = Delete_status[0];
    // Delete_status = Delete_status[0].DeleteStatus_.data[0];
 if(Delete_status[0].Functionl_Area_Id_>0)
// if(Delete_status==1)
{
this.Functionl_Area_Data.splice(index, 1);
this.Search_Functionl_Area();
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


Save_Functionl_Area()
{
    if (this.Functionl_Area_.Functionl_Area_Name== undefined || this.Functionl_Area_.Functionl_Area_Name == null || this.Functionl_Area_.Functionl_Area_Name == "" ) 
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Functional Area', Type: "3" } });
        return;
    }


this.issLoading=true;
this.Functionl_Area_Service_.Save_Functionl_Area(this.Functionl_Area_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].Functionl_Area_Id_)>0)
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
Edit_Functionl_Area(Functionl_Area_e:Functionl_Area,index)
{
this.Entry_View=true;
this.Functionl_Area_=Functionl_Area_e;
this.Functionl_Area_=Object.assign({},Functionl_Area_e);
}
}

