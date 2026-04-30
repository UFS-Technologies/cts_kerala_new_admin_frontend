import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate_Service } from '../../../services/Candidate.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Candidate } from '../../../models/Candidate';
import { Course } from '../../../models/Course';
import { Status } from '../../../models/Status';
import { Applied_Candidate } from '../../../models/Applied_Candidate';
import { Specialization } from '../../../models/Specialization';
import { Qualification } from '../../../models/Qualification';
import { Experience } from '../../../models/Experience';
import { Functionl_Area } from '../../../models/Functionl_Area';
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
selector: 'app-Applied_Candidate',
templateUrl: './Applied_Candidate.component.html',
styleUrls: ['./Applied_Candidate.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class Applied_CandidateComponent implements OnInit {
    EditIndex: number;
    Total_Entries: number;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Applied_Candidate_Edit:boolean;
    Applied_Candidate_Save:boolean;
    Applied_Candidate_Delete:boolean;
    myInnerHeight: number;

    year: any;
    month: any;
    day: any;
    date: any;
    Entry_View: boolean = true;
    profile_View:boolean=true;
    
    Applied_Candidate_Id: number = 0;
    Applied_Candidate_Data: []
    Job_Code_Search:string;
    Candidate_Search:string;
    Job_Location_Search:string;
    Job_Title_Search:string;

    Status_Search: Status = new Status;
    Status_Data: Status[];
    Status_:Status=new Status;
    Status_Temp: Status = new Status;

    Save_Call_Status: boolean = false;
    Logo: string;
    Display_Logo_: string;
    ImageFile_Logo: any;

    Total_Rows: number = 0;
    Page_Start:number=1;
    Page_End:number=0;
    Page_Length_:number=2;

    Login_User: number = 0;
    Applied_Candidate_EditIndex: number = -1;

    Specialization_:Specialization=new Specialization;
    Specialization_Temp:Specialization=new Specialization;
    Specialization_Data:Specialization[];

    Experience_Search:Experience=new Experience;
    Experience_:Experience=new Experience;
    Experience_Temp:Experience=new Experience;
    Experience_Data:Experience[];

    Functionl_Area_:Functionl_Area=new Functionl_Area;
    Functionl_Area_Temp:Functionl_Area=new Functionl_Area;
    Functionl_Area_Data:Functionl_Area[];

    Qualification_:Qualification=new Qualification;
    Qualification_Temp:Qualification=new Qualification;
    Qualification_Data:Qualification[];

    FromDate_: Date = new Date();
    ToDate_: Date = new Date();

    Applied_Candidate:Applied_Candidate=new Applied_Candidate;

    Edit_Page_Permission:any;
    Edit_Job_Permission:any;

    
constructor(public Candidate_Service_:Candidate_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User = Number(localStorage.getItem("Login_User"));
    this.Permissions = Get_Page_Permission(31);
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.Applied_Candidate_Edit=this.Permissions.Edit;
    this.Applied_Candidate_Save=this.Permissions.Save;
    this.Applied_Candidate_Delete=this.Permissions.Delete;
    this.Page_Load()
    }
     
}
Page_Load()
{
    this.Page_End = this.Page_Length_;
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 200;
    this.Entry_View = false;
    this.FromDate_=this.New_Date(this.FromDate_)
    this.ToDate_=this.New_Date(this.ToDate_)
    this.Load_Candidate_Search_Dropdowns();
    // this.Load_Job_Posting_Search_Dropdowns();
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
Close_Click()
{
  this.Entry_View=false;
  this.clr_Applied_candidate();
  this.Search_Applied_Candidate();
}
clr_Applied_candidate()
{    
    this.Applied_Candidate.Candidate_Job_Apply_Id=0;
    this.Applied_Candidate.Candidate_Id=0
    this.Applied_Candidate.Candidate_Name="";
    this.Applied_Candidate.Job_Title="";
    this.Applied_Candidate.Job_Location="";
    this.Applied_Candidate.Company_Name="";
    this.Applied_Candidate.Job_Posting_Id=0
    this.Applied_Candidate.Status_Id=0
    this.Applied_Candidate.Status_Name="";
    this.Applied_Candidate.Contact_Name="";
    this.Applied_Candidate.Contact_No='';
    this.Applied_Candidate.Followupdate=new Date;
    this.Applied_Candidate.Followupdate=this.New_Date(this.Applied_Candidate.Followupdate)
}
// Load_Job_Posting_Search_Dropdowns()
// {
//     this.issLoading = true;
//     this.Candidate_Service_.Load_Job_Posting_Search_Dropdowns(3).subscribe(Rows => {
//     if (Rows != null) {
//         this.Status_Data = Rows[0];
//         this.Status_Temp.Status_Id = 0;
//         this.Status_Temp.Status_Name = "All";
//         this.Status_Data.unshift(this.Status_Temp);
//         this.Status_ = this.Status_Data[0];
//         this.Search_Status = this.Status_Data[0];
//         this.issLoading = false;
//     }
// },
//     Rows => {
//         this.issLoading = false;
//     });
// }
Load_Candidate_Search_Dropdowns()
{
    this.issLoading = true;
    this.Candidate_Service_.Load_Candidate_Search_Dropdowns(4).subscribe(Rows => {
    if (Rows != null) {
        this.Status_Data = Rows[0];
        this.Status_Temp.Status_Id = 0;
        this.Status_Temp.Status_Name = "All";
        this.Status_Data.unshift(this.Status_Temp);
        this.Status_ = this.Status_Data[0];
        this.Status_Search=this.Status_Data[0];

        this.issLoading = false;
    }
},
    Rows => {
        this.issLoading = false;
    });
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
        this.Total_Rows = this.Total_Rows - this.Applied_Candidate_Data.length - this.Page_Length_;
        this.Search_Applied_Candidate();
    }
}
Next_Click()
{
   
   if (this.Applied_Candidate_Data.length == this.Page_Length_)
   {
   this.Page_Start = this.Page_Start + this.Page_Length_;
   this.Page_End = this.Page_End + this.Page_Length_;
 
 
       if (this.Applied_Candidate_Data.length > 0)
           {
            this.Search_Applied_Candidate();
           }
   }
}
Search_Applied_Candidate()
{
    var value = 1, Experience_Id = 0, Status_Id = 0, User_Id = 0, search_name_ = undefined;
    
    if (this.Status_Search != undefined && this.Status_Search != null)
    if (this.Status_Search.Status_Id != undefined && this.Status_Search.Status_Id != null)
        Status_Id = this.Status_Search.Status_Id;
    // if (this.Search_Name != undefined && this.Search_Name != null && this.Search_Name != '')
    // search_name_ = this.Search_Name;
    
    // if (this.Experience_Search != undefined && this.Experience_Search != null)
    //     if (this.Experience_Search.Experience_Id != undefined && this.Experience_Search.Experience_Id != null)
    //     Experience_Id = this.Experience_Search.Experience_Id;
    this.issLoading = true;
    this.Candidate_Service_.Search_Applied_Candidate(moment(this.FromDate_).format('YYYY-MM-DD'), moment(this.ToDate_).format('YYYY-MM-DD'),this.Candidate_Search,Status_Id,this.Job_Title_Search,this.Page_Start,this.Page_End,this.Page_Length_).subscribe(Rows =>{


    this.Applied_Candidate_Data = Rows.returnvalue.Applied_Candidate;
    this.Total_Entries = this.Applied_Candidate_Data.length;
    this.issLoading = false;
    if(this.Applied_Candidate_Data.length==0)
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
Edit_Job_Posting(Job_Posting_e:any, index)
{
    this.Entry_View=true;
    this.Applied_Candidate=Object.assign({},Job_Posting_e);

    for (var i = 0; i < this.Status_Data.length; i++)
    {
    if (this.Applied_Candidate.Status_Id == this.Status_Data[i].Status_Id)
    this.Status_=this.Status_Data[i];
    } 
}

Save_Applied_Candidate()
{
    this.issLoading=true;
    this.Applied_Candidate.Status_Id=this.Status_.Status_Id;
    this.Applied_Candidate.Status_Name=this.Status_.Status_Name;
    this.Applied_Candidate.User_Id=this.Login_User;
    this.Applied_Candidate.Followupdate = this.New_Date(new Date(moment(this.Applied_Candidate.Followupdate).format('YYYY-MM-DD')));
     this.Candidate_Service_.Save_Applied_Candidate(this.Applied_Candidate).subscribe(Save_status => {
    Save_status=Save_status[0];
    if(Number(Save_status[0].Candidate_Job_Apply_Id_)>0)
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
Edit_Candidate(Candidate_Id, i) {
        
    localStorage.setItem('Candidate_Id', Candidate_Id);

    this.Edit_Page_Permission = Get_Page_Permission(27);
    if (this.Edit_Page_Permission == undefined) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'No permission to view', Type: "2" } });
    }
    else if (this.Edit_Page_Permission.View == true)
        this.router.navigateByUrl('/Candidate');
    else {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'No permission to view', Type: "2" } });
    }
}
}

