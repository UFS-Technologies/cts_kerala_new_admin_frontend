import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student_Service } from '../../../services/Student.service';
import {Agent } from '../../../models/Agent';
import {Activity_Details } from '../../../models/Activity_Details';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { ROUTES, Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: { dateInput: 'DD/MM/YYYY', },
    display: {
        dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'DD/MM/YYYY', monthYearA11yLabel: 'MMMM YYYY',
    },
};
@Component({
selector: 'app-Activity_Report',
templateUrl: './Activity_Report.component.html',
styleUrls: ['./Activity_Report.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class Activity_ReportComponent implements OnInit {
    EditIndex: number;
    Total_Entries: number=0;
    Total_Amount:number=0;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Activity_Report_Edit:boolean;
    Activity_Report_Save:boolean;
    Activity_Report_Delete:boolean;
    myInnerHeight: number;

    year: any;
    month: any;
    day: any;
    date: any;
    Entry_View: boolean = true;
    profile_View:boolean=true;
    
    Login_User: number = 0;
    Activity_Report_EditIndex: number = -1;

    FromDate_: Date = new Date();
    ToDate_: Date = new Date();
    Is_Date:boolean=true;   
    
    Activity_Report_Data:any;

    Agent_:Agent=new Agent;
    Agent_Temp:Agent=new Agent;
    Agent_Data:Agent[];

    Activity_Details_:Activity_Details=new Activity_Details;
    Activity_Details_Temp:Activity_Details=new Activity_Details;
    Activity_Details_Data:Activity_Details[];

    Look_In_Date: boolean = true;
    Search_FromDate: Date = new Date();
    Search_ToDate: Date = new Date();
    Search_Name: "";
constructor(public Student_Service_:Student_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User = Number(localStorage.getItem("Login_User"));
    this.Permissions = Get_Page_Permission(36);
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.Activity_Report_Edit=this.Permissions.Edit;
    this.Activity_Report_Save=this.Permissions.Save;
    this.Activity_Report_Delete=this.Permissions.Delete;
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
    this.Search_Activity_Report();
    
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
Search_Activity_Report()
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
     
    this.Student_Service_.Search_Activity_Report(moment(this.Search_FromDate).format('YYYY-MM-DD'), moment(this.Search_ToDate).format('YYYY-MM-DD'),search_name_, 
     Agent_Id, look_In_Date_Value,  this.Login_User).subscribe(Rows =>{
            
        this.Activity_Details_Data = Rows.returnvalue.Activity;
        this.Total_Entries = this.Activity_Details_Data.length;
        this.issLoading = false;
        if(this.Activity_Details_Data.length==0)
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
}

