import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student_Service } from '../../../services/Student.service';
import { University_Service } from '../../../services/University.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { University } from '../../../models/University';
import { University_Admission_Month } from '../../../models/University_Admission_Month';
import { University_Exam_Month } from '../../../models/University_Exam_Month';
import {MatDialog} from '@angular/material';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { GeneralFunctions_Service } from '../../../services/GeneralFunctions.service';
import { Activity } from '../../../models/Activity';
@Component({
// import { GeneralFunctions_Service } from '../../../services/GeneralFunctions.service';


selector: 'app-University',
templateUrl: './University.component.html',
styleUrls: ['./University.component.css']
})
export class UniversityComponent implements OnInit {
University_Data:University[]
University_:University= new University();
University_Name_Search:string;
Entry_View:boolean=true;
EditIndex: number;
Total_Entries: number;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
University_Edit:boolean;
University_Save:boolean;
University_Delete:boolean;
myInnerHeight: number;
Login_User: string = "0";

Page_Start:number=1;
Page_End:number=0;
Page_Length_:number=10;
Total_Rows: number = 0;
myTotalHeight:number;

Back_Status: boolean = true;

Activity_Data : Activity[];

University_Id_Edit:number=0;

University_Exam_Month_Data:University_Exam_Month[];
University_Admission_Month_Data:University_Admission_Month[];
constructor(public Student_Service_:Student_Service,public GeneralFunctions_Service_:GeneralFunctions_Service ,public University_Service_:University_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    
this.Login_User = localStorage.getItem("Login_User");
// this.Permissions = Get_Page_Permission(13);
// if(this.Permissions==undefined || this.Permissions==null)
// {
// localStorage.removeItem('token');
// this.router.navigateByUrl('/auth/login');
// }
// else
{
// this.University_Edit=this.Permissions.Edit;
// this.University_Save=this.Permissions.Save;
// this.University_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
    this.Search_Activity();
    this.Page_End = this.Page_Length_;
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 200;
    this.Clr_University();
    this.Search_University();
    this.Load_Month_Status();
    this.Entry_View=false;
    this.Get_Menu_Status(13,this.Login_User); 
    this.University_Id_Edit=0;
    this.myInnerHeight = (window.innerHeight);
        this.myTotalHeight=this.myInnerHeight
        this.myTotalHeight=this.myTotalHeight-150;
        this.myInnerHeight = this.myInnerHeight - 250;

        this.Back_Status = true;
}
Load_Month_Status()
{
    this.issLoading = true;
    this.Student_Service_.Load_Month_Status().subscribe(Rows => {
        if (Rows != null) {
            this.University_Admission_Month_Data = Rows[0];
            this.University_Exam_Month_Data = Rows[0];
            this.issLoading = false;
        }
    },
        Rows => {
            this.issLoading = false;
        });
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
        if(Menu_id==13)
        {
            this.Permissions=Rows[0][0];
            if(this.Permissions==undefined || this.Permissions==null)
                {
                    localStorage.removeItem('token');
                    this.router.navigateByUrl('Home_Page');
                }
               
                this.University_Edit=this.Permissions.Edit;
                this.University_Save=this.Permissions.Save;
                this.University_Delete=this.Permissions.Delete;
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
    this.Clr_University();
    this.University_Id_Edit=0
}
Close_Click()
{
    this.Entry_View = false;
    this.Clr_University();
    this.University_Id_Edit=0
    this.Search_University();
}
trackByFn(index, item) 
{
    return index;
}
Clr_University()
{
    this.University_.University_Id=0;
    this.University_.University_Name="";
    this.University_.Address1="";
    this.University_.Address2="";
    this.University_.Address3="";
    this.University_.Address4="";
    this.University_.Pincode="";
    this.University_.Phone="";
    this.University_.Mobile="";
    this.University_.Email="";
    this.University_.User_Id=0;
    this.University_.Website="";
    this.University_.Description1="";
    this.University_.Description2="";
    this.University_.Description3="";
    this.University_.Activity="";
    this.University_.Starting_Year=null;
    this.University_.Amount=null;
    this.University_.Back_Status=false;

    if(this.Activity_Data!= undefined)
    for(var i=0;i<this.Activity_Data.length;i++)
    {
    this.Activity_Data[i].Check_Box=false
    }
    if(this.Activity_Data!= undefined)
       for(var i=0;i<this.Activity_Data.length;i++)
       {
       this.Activity_Data[i].Amount=0
       }
       
    if(this.University_Admission_Month_Data!= undefined)
    for(var i=0;i<this.University_Admission_Month_Data.length;i++)
    {
    this.University_Admission_Month_Data[i].Check_Box1=false
    }
    
    if(this.University_Exam_Month_Data!= undefined)
    for(var i=0;i<this.University_Exam_Month_Data.length;i++)
    {
    this.University_Exam_Month_Data[i].Check_Box=false
    }

}
previous_Click()
{
    if (this.Page_Start > 1) {
        {
            this.Page_Start = this.Page_Start - this.Page_Length_;
            this.Page_End = this.Page_End - this.Page_Length_;
        }
        // if (this.missedfollowup_count > 0 || this.Red_Start > 1) {
        //     this.Red_Start = this.Red_Start - this.Page_Length_;
        //     if (this.Red_Start <= 0)
        //         this.Red_Start = 1;
        //     this.Red_Stop = this.Red_Start + this.Page_Length_;
        // }
        this.Total_Rows = this.Total_Rows - this.University_Data.length - this.Page_Length_;
        this.Search_University();
    }
}
Next_Click()
{
   if (this.University_Data.length == this.Page_Length_)
   {
   this.Page_Start = this.Page_Start + this.Page_Length_;
   this.Page_End = this.Page_End + this.Page_Length_;
       if (this.University_Data.length > 0)
           {
            this.Search_University();
           }
   }
}
Search_Activity()
{
    
    this.issLoading=true;
    this.University_Service_.Search_Activity_For_University().subscribe(Rows => {
        
    this.Activity_Data=Rows[0];
    this.Total_Entries=this.Activity_Data.length;
    if(this.Activity_Data.length==0)
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
Search_University()
{
    this.issLoading=true;
    this.University_Service_.Search_University(this.University_Name_Search,this.Page_Start,this.Page_End,this.Page_Length_).subscribe(Rows => {
    
    this.University_Data=Rows[0];
    this.Total_Entries=this.University_Data.length;
    if(this.University_Data.length==0)
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

Delete_University(University_Id,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
    {
    this.issLoading=true;
    this.University_Service_.Delete_University(University_Id).subscribe(Delete_status => {
    Delete_status = Delete_status[0];
    Delete_status = Delete_status[0].DeleteStatus_;
    if(Delete_status==1)
    {
    this.University_Data.splice(index, 1);
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

Save_University()
{var value = 1,  Agent_Id = 0,search_name_ = undefined,Back_Status_Value = false;
  
    if (this.University_.Back_Status == true)
    Back_Status_Value = true;

   if (this.University_.University_Name== undefined || this.University_.University_Name == null || this.University_.University_Name == "" ) 
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter University', Type: "3" } });
        return;
    }
    if (this.University_.Mobile == undefined || this.University_.Mobile == null || this.University_.Mobile == "" ) 
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Mobile', Type: "3" } });
        return;
    }
    if (this.University_.Email == undefined || this.University_.Email == null || this.University_.Email == "" ) 
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Email', Type: "3" } });
        return;
    }
    if (this.University_.Starting_Year == undefined || this.University_.Starting_Year == null || this.University_.Starting_Year == 0) 
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Starting Year', Type: "3" } });
        return;
    }
    var Course_Type_Status=false;
    for (var j = 0; j < this.Activity_Data.length; j++)
    {
        if(this.Activity_Data[j].Check_Box== true)
        Course_Type_Status=true
    }
    if (Course_Type_Status==false)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select  Activity', Type: "3" } });
        return
    }
    
    for (var j = 0; j < this.Activity_Data.length; j++) {
        if (this.Activity_Data[j].Check_Box == true)
        {
            if (this.Activity_Data[j].Amount == 0||this.Activity_Data[j].Amount == 0||this.Activity_Data[j].Amount == undefined)
            {
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Activity Amount', Type: "3" } });
                return
            }
        }
    }
    
    var Adm_Status=false;
    for (var j = 0; j < this.University_Admission_Month_Data.length; j++)
    {
        if(this.University_Admission_Month_Data[j].Check_Box1== true)
        Adm_Status=true
    }
    if (Adm_Status==false)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Admission Month', Type: "3" } });
        return
    }
    
    var Exam_Status=false;
    for (var j = 0; j < this.University_Exam_Month_Data.length; j++)
    {
        if(this.University_Exam_Month_Data[j].Check_Box== true)
        Exam_Status=true
    }
    if (Exam_Status==false)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Exam Month', Type: "3" } });
        return
    }
        var Selected_Activities = [];
        for(var i=0;i<this.Activity_Data.length;i++)
        {
        if (this.Activity_Data[i].Check_Box==true)
        {
            Selected_Activities.push(Object.assign({}, this.Activity_Data[i]));            
        }
        }
        var Selected_Admission = [];
        for(var i=0;i<this.University_Admission_Month_Data.length;i++)
        {
        if (this.University_Admission_Month_Data[i].Check_Box1==true)
        {
            Selected_Admission.push(Object.assign({}, this.University_Admission_Month_Data[i]));            
        }
        }
        var Selected_Exam = [];
        for(var i=0;i<this.University_Exam_Month_Data.length;i++)
        {
        if (this.University_Exam_Month_Data[i].Check_Box==true)
        {
            Selected_Exam.push(Object.assign({}, this.University_Exam_Month_Data[i]));            
        }
        }
    this.issLoading=true;

    this.University_.User_Id=Number(this.Login_User);
    this.University_.Activities_Selected=Selected_Activities;
    this.University_.University_Admission_Month=Selected_Admission;
    this.University_.University_Exam_Month=Selected_Exam;
    
    this.University_.Back_Status=Back_Status_Value;

    this.University_Service_.Save_University(this.University_).subscribe(Save_status => {


    Save_status=Save_status[0];
    if(Number(Save_status[0].University_Id_)>0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
    this.Close_Click();}
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
Get_Activity_Selection_Edit(University_Id) {



  
       
 
    this.issLoading=true;
  this.University_Service_.Get_Activity_Selection_Edit(University_Id).subscribe(Rows => {
    
  this.Activity_Data = Rows[0];
  this.University_Admission_Month_Data = Rows[1];
  this.University_Exam_Month_Data = Rows[2];
  
  for(var i=0;i<this.Activity_Data.length;i++)
  {
    if (this.Activity_Data[i].Check_Box.toString()=='1')
    {
        this.Activity_Data[i].Check_Box=true
    }
    else 
    {
     this.Activity_Data[i].Check_Box=false
    }
  }
  
  for(var i=0;i<this.University_Admission_Month_Data.length;i++)
  {
    if (this.University_Admission_Month_Data[i].Check_Box1.toString()=='1')
    {
        this.University_Admission_Month_Data[i].Check_Box1=true
    }
    else 
    {
     this.University_Admission_Month_Data[i].Check_Box1=false
    }
  }
  for(var i=0;i<this.University_Exam_Month_Data.length;i++)
  {
    if (this.University_Exam_Month_Data[i].Check_Box.toString()=='1')
    {
        this.University_Exam_Month_Data[i].Check_Box=true
    }
    else 
    {
     this.University_Exam_Month_Data[i].Check_Box=false
    }
  }
  if (this.Activity_Data.length == 0) 
  {
  this.issLoading=false;
  }
  },
  Rows => {
   const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
  });
  this.issLoading=false;
  }
Edit_University(University_e:University,index)
{ 
    
    this.Entry_View=true;
    this.University_=University_e;
    this.University_=Object.assign({},University_e);
    this.University_Id_Edit=this.University_.University_Id;
//     if (this.University_.Back_Status == true)
//   Back_Status_Value = true;
  
    this.Get_Activity_Selection_Edit(University_e.University_Id);
}
}

