import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student_Service } from '../../../services/Student.Service';
import {Agent } from '../../../models/Agent';
// import {Student_Verified_Details } from '../../../models/Student_Verified_Details';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { ROUTES, Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { Student_Verified_Details } from 'app/models/Student_Verified_Details';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: { dateInput: 'DD/MM/YYYY', },
    display: {
        dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'DD/MM/YYYY', monthYearA11yLabel: 'MMMM YYYY',
    },
};
@Component({
selector: 'app-Student_Payment',
templateUrl: './Student_Payment.component.html',
styleUrls: ['./Student_Payment.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class Student_PaymentComponent implements OnInit {
    EditIndex: number;
    Total_Entries: number=0;
    Total_Amount:number=0;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Student_Payment_Edit:boolean;
    Student_Payment_Save:boolean;
    Student_Payment_Delete:boolean;
    myInnerHeight: number;

    year: any;
    month: any;
    day: any;
    date: any;
    Entry_View: boolean = true;
    profile_View:boolean=true;
    
    Login_User: number = 0;
    Student_Payment_EditIndex: number = -1;

    FromDate_: Date = new Date();
    ToDate_: Date = new Date();
    Is_Date:boolean=true;   
    
    Student_Payment_Data:any;

    Agent_:Agent=new Agent;
    Agent_Temp:Agent=new Agent;
    Agent_Data:Agent[];

    Student_Verified_Details_:Student_Verified_Details=new Student_Verified_Details;
    Student_Verified_Details_Temp:Student_Verified_Details=new Student_Verified_Details;
    Student_Verified_Details_Data:Student_Verified_Details[];

    Look_In_Date: boolean = true;
    Search_FromDate: Date = new Date();
    Search_ToDate: Date = new Date();
    Search_Name: "";


    Select_Student:boolean=false;
    Select_View:boolean=false;


constructor(public Student_Service_:Student_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User = Number(localStorage.getItem("Login_User"));
    this.Permissions = Get_Page_Permission(43);
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.Student_Payment_Edit=this.Permissions.Edit;
    this.Student_Payment_Save=this.Permissions.Save;
    this.Student_Payment_Delete=this.Permissions.Delete;
    this.Page_Load()
    }
     
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 200;
    this.Entry_View = false;
    this.Look_In_Date = true;
    this.Search_FromDate = this.New_Date(this.Search_FromDate);
    this.Search_ToDate = this.New_Date(this.Search_ToDate);
    this.Search_Student_Payment();
    
}
isMobileMenu() {
    if ($(window).width() > 991)
    {
        return false;
    }
    return true;
};
isDesktopMenu() 
{
    if ($(window).width() < 991)
    {
        return false;
    }
    return true;
};
trackByFn(index, item) 
{
    return index;
}
New_Date(Date_)
{
         this.date=Date_;
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth() + 1;
        if (this.month < 10) {
        this.month = "0" + this.month;
    }
        this.day = this.date.getDate().toString();
        if (Number.parseInt(this.day) <10) {
        this.day = "0" + this.day;
    }
        this.date = this.year + "-" + this.month + "-" + this.day;
      //  this.date = this.day + "-"+ this.month + "-" + this.year ;
        return this.date;
}
Search_Agent_Typeahead(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = undefined;
    else
        Value = event.target.value;       
     if(this.Agent_Data==undefined || this.Agent_Data.length==0)
           {
            this.issLoading = true;
         this.Student_Service_.Search_Agent_Typeahead('').subscribe(Rows => {
        if (Rows != null) {
            this.Agent_Data = Rows[0];
            this.issLoading = false;
        }
    },
        Rows => {
            this.issLoading = false;
          });
    } 
}
display_Agent(Agent_: Agent)
{     
    if (Agent_) { return Agent_.Agent_Name; }
}
Search_Student_Payment()
{
      var value = 1,  Agent_Id = 0,search_name_ = undefined,look_In_Date_Value = 0;

    if (this.Look_In_Date == true)
        look_In_Date_Value = 1;

    if (this.Search_Name != undefined && this.Search_Name != null && this.Search_Name != '')
        search_name_ = this.Search_Name;

    if (this.Agent_ != undefined && this.Agent_ != null)
        if (this.Agent_.Agent_Id != undefined && this.Agent_.Agent_Id != null)
        Agent_Id = this.Agent_.Agent_Id;
     //this.issLoading = true;
     
    this.Student_Service_.Search_Student_Payment(moment(this.Search_FromDate).format('YYYY-MM-DD'), moment(this.Search_ToDate).format('YYYY-MM-DD'),search_name_, 
     look_In_Date_Value,  this.Login_User).subscribe(Rows =>{
            
        this.Student_Verified_Details_Data = Rows.returnvalue.Activity;
        this.Total_Entries = this.Student_Verified_Details_Data.length;
        this.issLoading = false;
        if(this.Student_Verified_Details_Data.length==0)
        { 
        this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
        }
        this.issLoading=false;
        },
        Rows => 
        { 
        this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        });
        }
Student_View_Click()
{
 for(var i=0;i<this.Student_Verified_Details_Data.length;i++)
{
    if(this.Select_Student==false)
        this.Student_Verified_Details_Data[i].Check_Box_View=true;
    else
        this.Student_Verified_Details_Data[i].Check_Box_View=false;
}
}



// New_Transfer()
// {
//     var Status=false
//     for (var m = 0; m < this.Lead_Report_Data.length; m++)
//     {
//         if (Boolean(this.Lead_Report_Data[m].Check_Box_View) == true)
//             Status=true
//     }
//     if(Status==false){
//         const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Student to Transfer', Type: "3" } });
//         return;
//     }
  
//     this.Course_View=true;
//     this.Entry_View=true;
// }


Verify_Student_Payment()
{
  ////debugger


  var Status=false
  for (var m = 0; m < this.Student_Verified_Details_Data.length; m++)
  {
      if (Boolean(this.Student_Verified_Details_Data[m].Check_Box_View) == true)
          Status=true
  }
  if(Status==false){
      const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Student to Verify', Type: "3" } });
      return;
  }



  var Student_Deatils=[];

                        
  for (var m = 0; m < this.Student_Verified_Details_Data.length; m++)
  {
      if (Boolean(this.Student_Verified_Details_Data[m].Check_Box_View) == true)
      {
          Student_Deatils.push({'Student_Id':this.Student_Verified_Details_Data[m].Student_Id} )
      }
  }




  this.issLoading=true;

  this.Student_Verified_Details_.Student_Selected_Details =Student_Deatils;
  this.Student_Verified_Details_.Verified_By =Number(this.Login_User);
 
  this.Student_Service_.Verify_Student_Payment(this.Student_Verified_Details_).subscribe(Save_status => {
debugger 
  if(Number(Save_status[0].Status_)>0)
  {
   const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Verified Successfully',Type:"false"}});
    

   this.Search_Student_Payment();
              
                
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




}

