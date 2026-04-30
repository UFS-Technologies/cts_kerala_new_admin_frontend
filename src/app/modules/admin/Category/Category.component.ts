import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category_Service } from '../../../services/Category.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Category } from '../../../models/Category';
import {MatDialog} from '@angular/material';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
@Component({
    selector: 'app-Category',
    templateUrl: './Category.component.html',
    styleUrls: ['./Category.component.css']
})
export class CategoryComponent implements OnInit {
    Category_Data:Category[]
    Category_:Category= new Category();
    Category_Name_Search:string;
    Entry_View:boolean=true;
    EditIndex: number;
    Total_Entries: number;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Category_Edit:boolean;
    Category_Save:boolean;
    Category_Delete:boolean;
    myInnerHeight: number;
    myTotalHeight: number;
    Login_User_Id:number=0;
constructor(public Category_Service_:Category_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User_Id = Number(localStorage.getItem('Login_User'));
    this.Permissions = Get_Page_Permission(2);
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.Category_Edit=this.Permissions.Edit;
    this.Category_Save=this.Permissions.Save;
    this.Category_Delete=this.Permissions.Delete;
    this.Page_Load()
    }
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 600;
    this.myTotalHeight=this.myTotalHeight-350;
    this.Clr_Category();
    this.Search_Category();
    this.Entry_View=false;
}
Create_New()
{
    this.Entry_View = true;
    this.Clr_Category();
}
Close_Click()
{
    this.Search_Category();
    this.Clr_Category();
    this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

Clr_Category()
{
    this.Category_.Category_Id=0;
    this.Category_.Category_Name="";
    this.Category_.Commision_Percentage=0;
    this.Category_.User_Id=0;
}
Search_Category()
{
    this.issLoading=true;
    this.Category_Service_.Search_Category(this.Category_Name_Search).subscribe(Rows => {
    this.Category_Data=Rows[0];
    this.Total_Entries=this.Category_Data.length;
    if(this.Category_Data.length==0)
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
Delete_Category(Category_Id,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
        {
        this.issLoading=true;
        this.Category_Service_.Delete_Category(Category_Id).subscribe(Delete_status => {
            
        
        Delete_status = Delete_status[0];
        Delete_status = Delete_status[0].DeleteStatus_.data[0];
        if(Delete_status==1){
        this.Category_Data.splice(index, 1);
        this.Search_Category();
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
Save_Category()
{
    if(this.Category_.Category_Name===undefined || this.Category_.Category_Name==null || this.Category_.Category_Name=="")
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Category ',Type: "3" }});
    return  
    }
    this.issLoading=true;
    this.Category_.User_Id = this.Login_User_Id;
    this.Category_Service_.Save_Category(this.Category_).subscribe(Save_status => {
    Save_status=Save_status[0];
    if(Number(Save_status[0].Category_Id_)>0)
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
Edit_Category(Category_e:Category,index)
{
    this.Entry_View=true;
    this.Category_=Category_e;
    this.Category_=Object.assign({},Category_e);
}
}

