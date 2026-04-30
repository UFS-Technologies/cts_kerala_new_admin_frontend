import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate_Service } from '../../../services/Candidate.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Candidate } from '../../../models/Candidate';
import { Candidate_Followup } from '../../../models/Candidate_Followup';
import { Course } from '../../../models/Course';
import { Gender } from '../../../models/Gender';
import { Status } from '../../../models/Status';
import { Users } from '../../../models/Users';
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
selector: 'app-Candidate',
templateUrl: './Candidate.component.html',
styleUrls: ['./Candidate.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class CandidateComponent implements OnInit {
    EditIndex: number;
    Total_Entries: number;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Candidate_Edit:boolean;
    Candidate_Save:boolean;
    Candidate_Delete:boolean;
    myInnerHeight: number;
    myTotalHeight:number;
    file:File;
    year: any;
    month: any;
    day: any;
    date: any;
    More_Search_Options: boolean = true;
    Entry_View: boolean = true;
    tab_view:boolean=true;
    profile_View:boolean=true;
    Show_Followup_History: boolean = true;
    View_Follow_: boolean = true;
    View_Candidate_: boolean = true;
    Show_FollowUp: boolean = true;
    View_History_: boolean = true;

    Flag_Followup: number = 0;
    Flag_Candidate: number = 0;
    Candidate_Id_Edit: number = 0;
    Registration: boolean = false;
    Candidate_Id: number = 0;
    Candidate_Name:string;

    Candidate_Data: Candidate[]
    Candidate_: Candidate = new Candidate();
    Candidate_Name_Search: string;

    Candidate_Followup_: Candidate_Followup = new Candidate_Followup;
    Candidate_Followup_Data: Candidate_Followup[]

    Gender_: Gender = new Gender;
    Gender_Temp: Gender = new Gender;
    Gender_Data: Gender[]

    Course_: Course = new Course;
    Course_Temp: Course = new Course;
    Course_Data: Course[];
    
    Followp_History_Data: Candidate[];

    Search_Status: Status = new Status;
    Search_Status_Temp: Status = new Status;
    Status_Data: Status[];

    Followup_Status_:Status=new Status;
    Followup_Status_Data:Status[];
    Followup_Status_Temp: Status = new Status;
    Next_FollowUp_Date_Visible:boolean=true;

    Users_Search: Users = new Users;
    Users_Search_Temp: Users = new Users;
    Users_Data: Users[];

    Followup_Users_: Users = new Users;
    Followup_Users_Data: Users[];
    Followup_Users_Temp: Users = new Users;

    Save_Call_Status: boolean = false;
    Photo: string;
    Display_Photo_: string;
    ImageFile_Photo: any;
    Resume:string;
    Display_Resume_: string;
    ImageFile_Resume: any;
    Login_User: number = 0;
    Is_Registered: any

    Page_Start: number = 1;
    Page_End: number = 0;
    Page_Length: number = 4;
    Page_Length_: number = 4;
    Black_Start: number = 1;
    Black_Stop: number = 0;
    Red_Start: number = 1;
    Red_Stop: number = 0;
    Total_Rows: number = 0; 
    missedfollowup_count: number = 1;
    followup_count: number = 0;
    nextflag: number;
    Search_Name: "";

    Look_In_Date: boolean = true;
    Search_FromDate: Date = new Date();
    Search_ToDate: Date = new Date();

    Registration_Visiblility: boolean
    Remove_Registration_Visibility: boolean
    Registration_Permissions: any;
    Remove_Registration_Permissions: any;

    Candidate_EditIndex: number = -1;
    date_Temp:Date=new Date();
    Course_Id_Edit: number = 0;

    Specialization_:Specialization=new Specialization;
    Specialization_Temp:Specialization=new Specialization;
    Specialization_Data:Specialization[];

    Experience_:Experience=new Experience;
    Experience_Temp:Experience=new Experience;
    Experience_Data:Experience[];

    Functionl_Area_:Functionl_Area=new Functionl_Area;
    Functionl_Area_Temp:Functionl_Area=new Functionl_Area;
    Functionl_Area_Data:Functionl_Area[];

    Qualification_:Qualification=new Qualification;
    Qualification_Temp:Qualification=new Qualification;
    Qualification_Data:Qualification[];

    Candidate_Id_localStorage:string="0";
constructor(public Candidate_Service_:Candidate_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User = Number(localStorage.getItem("Login_User"));
    this.Permissions = Get_Page_Permission(27);
    this.Registration_Permissions = Get_Page_Permission(28);
    this.Remove_Registration_Permissions = Get_Page_Permission(29);
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.Search_Lead_button();
    this.Candidate_Edit=this.Permissions.Edit;
    this.Candidate_Save=this.Permissions.Save;
    this.Candidate_Delete=this.Permissions.Delete;
    this.Page_Load()
    // if (this.Fees_tab_Permission != undefined && this.Fees_tab_Permission != null)
    //     {
    //     this.Fees_tab_Edit=this.Fees_tab_Permission.Edit
    //     this.Fees_tab_View=this.Fees_tab_Permission.View
    //     }
    //     if (this.Course_Tab_Permission != undefined && this.Course_Tab_Permission != null)
    //     {
    //     this.Course_Tab_Edit=this.Course_Tab_Permission.Edit;
    //     this.Course_Tab_View=this.Course_Tab_Permission.View
    //     }
    //     if (this.Mark_tab_Permission != undefined && this.Mark_tab_Permission != null)
    //     {
    //     this.Mark_tab_View=this.Mark_tab_Permission.View
    //     this.Mark_tab_Edit=this.Mark_tab_Permission.Edit
    //     }
    }
     
}
Page_Load()
{
   
    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight
    this.myTotalHeight=this.myTotalHeight-100;
    this.myInnerHeight = this.myInnerHeight - 450;
    this.Clr_Candidate();
    this.Load_Gender();
    this.Load_Candidate_Dropdowns();
    this.Load_Candidate_Search_Dropdowns();
    this.Entry_View = false;
    this.profile_View = true;
    this.tab_view = true;
    this.Is_Registered = 1;
    this.Look_In_Date = true;
    this.Search_FromDate = this.New_Date(this.Search_FromDate);
    this.Search_ToDate = this.New_Date(this.Search_ToDate);
    this.date_Temp=this.New_Date(this.date_Temp)
    this.Candidate_Id_localStorage = localStorage.getItem('Candidate_Id');
    this.Black_Stop = this.Page_Length_;
    this.Red_Stop = this.Page_Length_;
   
    if (this.Candidate_Id_localStorage > "0") {
         
        this.Candidate_Id = Number(this.Candidate_Id_localStorage) ;
        localStorage.setItem('Candidate_Id', "0");
        this.Get_Candidate(this.Candidate_Id)
    }
}
Tab_Click(Current_tab)
{       
    this.profile_View=false;

    if(Current_tab==1)
    this.profile_View=true;

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
Load_Gender()
{
    this.issLoading = true;
    this.Candidate_Service_.Load_Gender().subscribe(Rows => {
        if (Rows != null) {
            this.Gender_Data = Rows[0];
            this.Gender_Temp.Gender_Id = 0;
            this.Gender_Temp.Gender_Name = "Select";
            this.Gender_Data.unshift(this.Gender_Temp);
            this.Gender_ = this.Gender_Data[0];
            this.issLoading = false;
        }
    },
        Rows => {
            this.issLoading = false;
        });
}
Load_Candidate_Search_Dropdowns()
{
    this.issLoading = true;
    this.Candidate_Service_.Load_Candidate_Search_Dropdowns(3).subscribe(Rows => {
    if (Rows != null) {
        this.Status_Data = Rows[0];
        this.Search_Status_Temp.Status_Id = 0;
        this.Search_Status_Temp.Status_Name = "All";
        this.Status_Data.unshift(this.Search_Status_Temp);
        this.Search_Status = this.Status_Data[0];

        this.Users_Data = Rows[1];
        this.Users_Search_Temp.Users_Id = 0;
        this.Users_Search_Temp.Users_Name = "All";
        this.Users_Data.unshift(this.Users_Search_Temp);
        this.Users_Search = this.Users_Data[0];

        this.issLoading = false;
    }
},
    Rows => {
        this.issLoading = false;
    });
}
Load_Candidate_Dropdowns()
{
    
    this.issLoading = true;
    this.Candidate_Service_.Load_Candidate_Dropdowns().subscribe(Rows => {
    if (Rows != null) {
        
        this.Functionl_Area_Data = Rows[0];
        this.Functionl_Area_Temp.Functionl_Area_Id = 0;
        this.Functionl_Area_Temp.Functionl_Area_Name = "All";
        this.Functionl_Area_Data.unshift(this.Functionl_Area_Temp);
        this.Functionl_Area_ = this.Functionl_Area_Data[0];

        this.Specialization_Data = Rows[1];
        this.Specialization_Temp.Specialization_Id = 0;
        this.Specialization_Temp.Specialization_Name = "All";
        this.Specialization_Data.unshift(this.Specialization_Temp);
        this.Specialization_ = this.Specialization_Data[0];

        this.Experience_Data = Rows[2];
        this.Experience_Temp.Experience_Id = 0;
        this.Experience_Temp.Experience_Name = "All";
        this.Experience_Data.unshift(this.Experience_Temp);
        this.Experience_ = this.Experience_Data[0];

        this.Qualification_Data = Rows[3];
        this.Qualification_Temp.Qualification_Id = 0;
        this.Qualification_Temp.Qualification_Name = "All";
        this.Qualification_Data.unshift(this.Qualification_Temp);
        this.Qualification_ = this.Qualification_Data[0];

        this.issLoading = false;
    }
},
    Rows => {
        this.issLoading = false;
    });
}
// File_Change_Photo(event: Event) 
// {    
//     const file = (event.target as HTMLInputElement).files;
//     this.ImageFile_Photo = file;
//     this.Photo = this.ImageFile_Photo[0].name;
// }
// File_Change_Resume(event: Event) 
// {    
//     const file = (event.target as HTMLInputElement).files;
//     this.ImageFile_Resume = file;
//     this.Resume = this.ImageFile_Resume[0].name;
// }
File_Change_Photo(event) 
{    
  this.file = event.target.files;
    this.ImageFile_Photo = this.file;
    this.Candidate_.Photo= this.ImageFile_Photo[0].name;
}
File_Change_Resume(event) 
{    
    this.file = event.target.files;
    this.ImageFile_Resume =this.file;
    
    this.Candidate_.Resume = this.ImageFile_Resume[0].name;
}
Download_Candidate_File(File_Name)
{
    var File_Name_Temp;
    if(File_Name=='Photo')
    File_Name_Temp=this.Candidate_.Photo;
    var bs='F:/Teena/Dist/backend/Uploads/'
    var s=bs+File_Name_Temp;            
    window.open(s,'_blank');
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
Create_New()
{
    this.Entry_View = true;
    this.View_Candidate_ = true;
    this.profile_View = true;
    this.Show_FollowUp = false;
    this.Flag_Followup = 1;
    this.Flag_Candidate = 1;
    this.View_Follow_ = true;
    this.Candidate_Id = 0
    this.Candidate_Id_Edit=0;
    this.Clr_Candidate();
    this.Get_Last_Followup();
    
    this.Candidate_Followup_.Next_FollowUp_Date = new Date();
    this.Candidate_Followup_.Next_FollowUp_Date = this.New_Date(this.Candidate_Followup_.Next_FollowUp_Date);    
    this.Candidate_Followup_.Remark="";
}
Close_Click()
{
    let top = document.getElementById('Topdiv');
    if (top !== null) {
    top.scrollIntoView();
    top = null;
    }
    this.View_Candidate_ = true;
    this.Candidate_EditIndex = -1;
    this.Flag_Followup = 0;
    this.Flag_Candidate = 0;
    this.Candidate_Id = 0
    this.Candidate_Id_Edit=0;
    this.Course_Id_Edit=0;
    this.Entry_View = false;
    this.View_History_ = true;
    this.Show_Followup_History = true;
    this.View_Follow_ = true;
    this.Clr_Candidate();
    this.Search_Candidate();
}
Clr_Candidate()
{
    this.Candidate_.Candidate_Id=0;
    this.Candidate_.Candidate_Name="";
    this.Candidate_.Address1="";
    this.Candidate_.Address2="";
    this.Candidate_.Address3="";
    this.Candidate_.Address4="";
    this.Candidate_.Pincode="";
    this.Candidate_.Phone="";
    this.Candidate_.Mobile="";
    this.Candidate_.Whatsapp="";
    // this.Candidate_.DOB = "";
    this.Candidate_.DOB = new Date();
    this.Candidate_.DOB = this.New_Date(this.Candidate_.DOB);
    // this.Candidate_.Gender=0;
    this.Candidate_.Email="";
    this.Candidate_.Alternative_Email="";
    this.Candidate_.Passport_No="";
    this.Candidate_.Passport_Expiry="";
    this.Candidate_.User_Name="";
    this.Candidate_.Password = "";
    this.Candidate_.Photo="";
    this.Candidate_.Postlookingfor="";    
    this.Candidate_.User_Id=0;    
    this.ImageFile_Photo='';
    this.Display_Photo_='';
    this.Candidate_.Resume="";  
    this.ImageFile_Resume='';
    this.Display_Resume_='';

    this.Remove_Registration_Visibility = false
    this.Registration_Visiblility = false

    if(this.Gender_Data!=null && this.Gender_Data != undefined)
    this.Gender_=this.Gender_Data[0];
    if(this.Specialization_Data!=null && this.Specialization_Data != undefined)
    this.Specialization_=this.Specialization_Data[0];
    if(this.Experience_Data!=null && this.Experience_Data != undefined)
    this.Experience_=this.Experience_Data[0];
    if(this.Functionl_Area_Data!=null && this.Functionl_Area_Data != undefined)
    this.Functionl_Area_=this.Functionl_Area_Data[0];
    if(this.Qualification_Data!=null && this.Qualification_Data != undefined)
    this.Qualification_=this.Qualification_Data[0];

}
Clr_Candidate_Followup()
 {
    this.Candidate_Followup_.Candidate_Followup_Id=0;
    this.Candidate_Followup_.Candidate_Id=0;
    this.Candidate_Followup_.Entry_Date = new Date();
    this.Candidate_Followup_.Entry_Date = this.New_Date(this.Candidate_Followup_.Entry_Date);
    this.Candidate_Followup_.Next_FollowUp_Date = new Date();
    this.Candidate_Followup_.Next_FollowUp_Date = this.New_Date(this.Candidate_Followup_.Next_FollowUp_Date);
    this.Candidate_Followup_.FollowUp_Difference=0;
    // this.Candidate_Followup_.Status=0;
    this.Candidate_Followup_.By_User_Id=0;
    this.Candidate_Followup_.Remark="";
    this.Candidate_Followup_.Remark_Id=0;
    this.Candidate_Followup_.FollowUp_Type=0;
    this.Candidate_Followup_.FollowUP_Time="";
    this.Candidate_Followup_.Actual_FollowUp_Date = new Date();
    this.Candidate_Followup_.Actual_FollowUp_Date = this.New_Date(this.Candidate_Followup_.Actual_FollowUp_Date);
    this.Followup_Status_=null;
    this.Followup_Users_=null;
}
Search_Status_Typeahead(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = undefined;
    else
        Value = event.target.value;
    if (this.Followup_Status_Data == undefined || this.Followup_Status_Data.length==0)
    {
        this.issLoading = true;
        this.Candidate_Service_.Search_Status_Typeahead('',3).subscribe(Rows => {
    if (Rows != null) 
    {
        this.Followup_Status_Data = Rows[0];
        this.issLoading = false;
    }
    },
    Rows => {
     this.issLoading = false;
    });
    } 
}
display_Followup_Status(Status_: Status)
{     
    if (Status_) { return Status_.Status_Name; }
}
Status_Change(Status)
{
   this.Followup_Status_= Status;
    if(this.Followup_Status_.FollowUp==true)
    this.Next_FollowUp_Date_Visible=false;
    else
    this.Next_FollowUp_Date_Visible=true;
    this.Candidate_Followup_.Next_FollowUp_Date=new Date();
    this.Candidate_Followup_.Next_FollowUp_Date=this.New_Date(this.Candidate_Followup_.Next_FollowUp_Date);
}
Search_User_Typeahead(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = undefined;
    else
        Value = event.target.value;       
     if(this.Followup_Users_Data==undefined || this.Followup_Users_Data.length==0)
           {
            this.issLoading = true;
         this.Candidate_Service_.Search_Users_Typeahead('').subscribe(Rows => {
        if (Rows != null) {
            this.Followup_Users_Data = Rows[0];
            this.issLoading = false;
        }
    },
        Rows => {
            this.issLoading = false;
          });
    } 
}
display_Followup_Users(Users_: Users)
{     
    if (Users_) { return Users_.Users_Name; }
}
Search_More_Options()
{
    if (this.More_Search_Options == true)
    this.More_Search_Options = false;
    else
    this.More_Search_Options = true;
}
Search_Lead_button() 
{
    this.Black_Start =1;
    this.Black_Stop = this.Page_Length_;
    this.Red_Start = 1;
    this.Total_Rows=0;
    this.Red_Stop = this.Page_Length_;
    this.Search_Candidate();
}
Search_Candidate()
{
    var value = 1, Register_Value = 1, Status_Id = 0, User_Id = 0, search_name_ = undefined,
        look_In_Date_Value = 0;

    if (this.Is_Registered != undefined && this.Is_Registered != null)
        if (this.Is_Registered != undefined && this.Is_Registered != null && this.Is_Registered != '')
            Register_Value = this.Is_Registered;

    if (this.Look_In_Date == true)
        look_In_Date_Value = 1;

    if (this.Search_Name != undefined && this.Search_Name != null && this.Search_Name != '')
        search_name_ = this.Search_Name;

    if (this.Users_Search != undefined && this.Users_Search != null)
        if (this.Users_Search.Users_Id != undefined && this.Users_Search.Users_Id != null)
            User_Id = this.Users_Search.Users_Id;

    if (this.Search_Status != undefined && this.Search_Status != null)
        if (this.Search_Status.Status_Id != undefined && this.Search_Status.Status_Id != null)
            Status_Id = this.Search_Status.Status_Id;
     this.issLoading = true;
    this.Candidate_Service_.Search_Candidate(moment(this.Search_FromDate).format('YYYY-MM-DD'), moment(this.Search_ToDate).format('YYYY-MM-DD'),  search_name_, 
     User_Id, Status_Id, look_In_Date_Value, this.Black_Start, this.Black_Stop, this.Login_User, this.Red_Start, this.Red_Stop, Register_Value).subscribe(Rows =>{
            
  this.Candidate_Data = Rows.returnvalue.Candidate;
            this.Total_Entries = this.Candidate_Data.length;
            this.missedfollowup_count = 0;
            this.followup_count = 0;
            if ( this.Candidate_Data.length>0)
            {
                if(this.Candidate_Data[0].User_Status==2){
                    localStorage.clear();
                    this.router.navigateByUrl('/auth/login');
                }
                    
            }

            for (var i = 0; i < this.Candidate_Data.length; i++) {
                this.Candidate_Data[i].RowNo = i + 1 + this.Total_Rows;
                if (this.Candidate_Data[i].tp == 1)
                    this.followup_count = this.followup_count + 1;
                if (this.Candidate_Data[i].tp == 2)

                    this.missedfollowup_count = this.missedfollowup_count + 1;
            }

            if (this.Candidate_Data.length > 0)
                this.Total_Rows = this.Total_Rows + this.Candidate_Data.length;
            this.issLoading = false;
                if(this.Candidate_Data.length==0)
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
// Next_Click ()
//  {     
//     if (this.Candidate_Data.length == this.Page_Length_)
//     {
//     this.Black_Start = this.Black_Start + this.Page_Length_;
//     this.Black_Stop = this.Black_Stop + this.Page_Length_;
//     if (this.missedfollowup_count > 0)
//     {
//         this.Red_Start = this.Red_Start + this.missedfollowup_count ;
//         this.Red_Stop = this.Red_Start + this.Page_Length_;   
//     }
//     this.nextflag = 1;
   
//         if (this.Candidate_Data.length > 0)
//             {
//                 this.Search_Candidate();
//             }
//     }
//  }
// previous_Click  () 
// {        
//     if (this.Black_Start > 1) {
//         {
//             this.Black_Start = this.Black_Start - this.Page_Length_;
//             this.Black_Stop = this.Black_Stop - this.Page_Length_;
//         }
//         if (this.missedfollowup_count > 0 || this.Red_Start > 1) {
//             this.Red_Start = this.Red_Start - this.Page_Length_;
//             if (this.Red_Start <= 0)
//                 this.Red_Start = 1;
//             this.Red_Stop = this.Red_Start + this.Page_Length_;
//         }
//         this.Total_Rows = this.Total_Rows - this.Candidate_Data.length - this.Page_Length_;
//         this.Search_Candidate();
//     }
// }



Next_Click()
 {     
     
    if (this.Candidate_Data.length == this.Page_Length_)
    {
    this.Black_Start = this.Black_Start + this.Page_Length_;
    this.Black_Stop = this.Black_Stop + this.Page_Length_;
    if (this.missedfollowup_count > 0)
    {
        this.Red_Start = this.Red_Start + this.missedfollowup_count ;
        this.Red_Stop = this.Red_Start + this.Page_Length_;   
    }
    this.nextflag = 1;
   
        if (this.Candidate_Data.length > 0)
            {
                this.Search_Candidate();
            }
    }
    // else
    // {
    //     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No ',Type:true,Heading:'Confirm'}});  
    // }
 }
previous_Click  () 
{       
      
    if (this.Black_Start > 1) {
        {
            this.Black_Start = this.Black_Start - this.Page_Length_;
            this.Black_Stop = this.Black_Stop - this.Page_Length_;
        }
        if (this.missedfollowup_count > 0 || this.Red_Start > 1) {
            this.Red_Start = this.Red_Start - this.Page_Length_;
            if (this.Red_Start <= 0)
                this.Red_Start = 1;
            this.Red_Stop = this.Red_Start + this.Page_Length_;
        }
        this.Total_Rows = this.Total_Rows - this.Candidate_Data.length - this.Page_Length_;
        this.Search_Candidate();
    }
}
Delete_Candidate(Candidate_Id,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
    {
   this.issLoading=true;
    this.Candidate_Service_.Delete_Candidate(Candidate_Id).subscribe(Delete_status => {
        Delete_status = Delete_status[0];
        Delete_status = Delete_status[0].DeleteStatus_;
    if(Delete_status==1)
    {
    this.Candidate_Data.splice(index, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type: "false"}});
    this.Close_Click();
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
Fill_Candidate()
{    
    if(this.Flag_Candidate==1)
    {
        this.Candidate_.DOB = this.New_Date(new Date(moment(this.Candidate_.DOB).format('YYYY-MM-DD')));
    // this.Candidate_.Candidate_Id=0;
    this.Candidate_.User_Id=this.Login_User;
    this.Candidate_.User_Name=this.Candidate_.Email;
    this.Candidate_.Gender=this.Gender_.Gender_Id;
    this.Candidate_.Functional_Area_Id=this.Functionl_Area_.Functionl_Area_Id;
    this.Candidate_.Functional_Area_Name=this.Functionl_Area_.Functionl_Area_Name;
    this.Candidate_.Specialization_Id=this.Specialization_.Specialization_Id;
    this.Candidate_.Specialization_Name=this.Specialization_.Specialization_Name;
    this.Candidate_.Qualification_Id=this.Qualification_.Qualification_Id;
    this.Candidate_.Qualification_Name=this.Qualification_.Qualification_Name;
    this.Candidate_.Experience_Id=this.Experience_.Experience_Id;
    this.Candidate_.Experience_Name=this.Experience_.Experience_Name;

    return this.Candidate_;
}
else
return null;
}
Fill_Followup()
{  
if(this.Flag_Followup==1)
{    
    if (this.Candidate_Followup_.Next_FollowUp_Date == undefined || this.Candidate_Followup_.Next_FollowUp_Date==null)
    {
        this.Candidate_Followup_.Next_FollowUp_Date=new Date();
    } 
    
    this.Candidate_Followup_.Candidate_Id=this.Candidate_Id;
    this.Candidate_Followup_.Next_FollowUp_Date = this.New_Date(new Date(moment(this.Candidate_Followup_.Next_FollowUp_Date).format('YYYY-MM-DD')));
    this.Candidate_Followup_.Status=this.Followup_Status_.Status_Id;
    this.Candidate_Followup_.To_User_Id = this.Followup_Users_.Users_Id;
    this.Candidate_Followup_.By_User_Id=this.Login_User;
    this.Candidate_Followup_.Entry_Date = this.New_Date(new Date(moment(this.Candidate_Followup_.Entry_Date).format('YYYY-MM-DD')));
    this.Candidate_Followup_.Actual_FollowUp_Date = this.New_Date(new Date(moment(this.Candidate_Followup_.Actual_FollowUp_Date).format('YYYY-MM-DD')));

    return this.Candidate_Followup_;
}
else
return null;
}
Save_Candidate()
{
    
    if(this.Flag_Candidate==1)
    {
    if (this.Candidate_.Candidate_Name== undefined || this.Candidate_.Candidate_Name == null || this.Candidate_.Candidate_Name == "" ) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Candidate', Type: "3" } });
        return;
    }
    if (this.Candidate_.Mobile == undefined || this.Candidate_.Mobile == null || this.Candidate_.Mobile == "" ) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Mobile', Type: "3" } });
        return;
    }
    if (this.Gender_ == undefined || this.Gender_ == null || this.Gender_.Gender_Id == undefined || this.Gender_.Gender_Id==0) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Gender', Type: "3" } });
        return;
    }    
    if (this.Candidate_.Email == undefined || this.Candidate_.Email == null || this.Candidate_.Email == "" ) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Email', Type: "3" } });
        return;
    }
    if (this.Candidate_.Password == undefined || this.Candidate_.Password == null || this.Candidate_.Password == "" ) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Password', Type: "3" } });
        return;
    }
    
}
if(this.Flag_Followup==1)
{
     if(this.Followup_Status_==null || this.Followup_Status_== undefined || this.Followup_Status_.Status_Id==undefined ||  this.Followup_Status_.Status_Id==null)
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Select Status',Type:"3"}});   
        return;
    }  
    if (this.Followup_Users_ == null || this.Followup_Users_ == undefined || this.Followup_Users_.Users_Id==undefined ||  this.Followup_Users_.Users_Id==null)
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Select To Staff',Type:"3"}});   
        return;
    }  
    if (this.Candidate_Followup_.Remark == undefined || this.Candidate_Followup_.Remark == null || this.Candidate_Followup_.Remark == "") {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Remark', Type: "3" } });
        return;
    }
}
    var Main_Array={
        "Candidate":this.Fill_Candidate(),
        "Followup":this.Fill_Followup()
    }
    if (Main_Array.Candidate == null && Main_Array.Followup == null   )
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Saved', Type: "false" } });
        return;
    }


    if (this.Save_Call_Status == true)
        return;
    else
        this.Save_Call_Status = true;
 this.issLoading = true;
    this.Candidate_Service_.Save_Candidate(Main_Array, this.ImageFile_Photo, this.ImageFile_Resume).subscribe(Save_status => {
        
        if(Number(Save_status[0][0].Candidate_Id_)>0)
        { 
            
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
            this.Save_Call_Status = false;
        if( this.profile_View==true){
            this.Create_New();
            this.Search_Candidate();
            this.Clr_Candidate();
        }
        else
            {
                this.Close_Click()
                this.Search_Candidate()
            }
        }
        else if(Number(Save_status[0][0].Candidate_Id_)==-1)
        {  
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'The Phone Number Already Exist for '+Save_status[0][0].Duplicate_Candidate_Name+' and is handled by '+Save_status[0][0].Duplicate_User_Name,Type:"2"}});
            this.Save_Call_Status = false;
        }
        else if(Number(Save_status[0][0].Candidate_Id_)==-2)
        {  
            const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:' Email is Already Exist for '+Save_status[0][0].Duplicate_Candidate_Name+' and is handled by '+Save_status[0][0].Duplicate_User_Name,Type:"2"}});
                this.Save_Call_Status = false;
        }
        else 
        {  
            
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error ',Type:"2"}});
            this.Save_Call_Status = false;
    }
        this.issLoading=false;
        },
        Rows => { 
            
        this.issLoading=false;
        
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
            this.Save_Call_Status = false;
    });
}

Register_Candidate()
{         
         const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to Register ?',Type:true,Heading:'Confirm'}});
            dialogRef.afterClosed().subscribe(result =>
        {
        if(result=='Yes')
        {
            this.issLoading = true;
     
                this.Candidate_Service_.Register_Candidate(this.Candidate_.Candidate_Id,this.Login_User).subscribe(Save_status => {

        if(Number(Save_status[0][0].Candidate_Id_)>0)
        { 
            this.Remove_Registration_Visibility=false
            this.Registration_Visiblility=false
            if(this.Remove_Registration_Permissions!=undefined &&this.Remove_Registration_Permissions!=null)
                if(this.Remove_Registration_Permissions.View==true)
                     this.Remove_Registration_Visibility=true;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Registered',Type:"false"}});
         this.Search_Candidate();
        }
        else{  
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
Remove_Registration()
{    
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to Remove Registration ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
        {
    // this.issLoading=true;
        this.Candidate_Service_.Remove_Registration(this.Candidate_.Candidate_Id).subscribe(update_status => {  
        if(update_status[0][0].Candidate_Id_>0)
        {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Registration Removed',Type: "false"}});
        this.Search_Candidate();
        this.Remove_Registration_Visibility=false
        this.Registration_Visiblility=false
        
        if(this.Remove_Registration_Permissions!=undefined &&this.Remove_Registration_Permissions!=null)
            if(this.Registration_Permissions.View==true)
                this.Registration_Visiblility=true;
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
View_Follow_Click_()
{     
    // if (this.Fees_View!=undefined)
    // {
    //     this.Fees_View=false;
    // }
    this.View_History_=false;
    this.Remove_Registration_Visibility=false
    this.Registration_Visiblility=false
    // this.Fees_View=false;   
    this.New_Followup(this.Candidate_Id,this.Candidate_.Candidate_Name,this.Candidate_EditIndex);
}
New_Followup(Candidate_Id,Candidate_Name,index)
{
    
    this.View_Candidate_=false;
    this.View_Follow_=true;  
    this.View_History_=false;
    this.Show_FollowUp = false;
    this.Entry_View = true;
    this.tab_view = false;
    this.profile_View = false;
    this.Next_FollowUp_Date_Visible=true;

    this.Candidate_Id = Candidate_Id;
    this.Candidate_EditIndex = index;
    // this.Next_FollowUp_Date_Visible=true;
    this.Get_FollowUp_Details();
    this.Candidate_Name=Candidate_Name
    
    this.Candidate_Followup_.Candidate_Id=Candidate_Id;
    this.Flag_Followup=1;
    this.Flag_Candidate=0;
    this.Candidate_Followup_.Next_FollowUp_Date=new Date();
    this.Candidate_Followup_.Next_FollowUp_Date = this.New_Date(this.Candidate_Followup_.Next_FollowUp_Date);
}
Get_Last_Followup()
{
        this.issLoading = true;
    this.Candidate_Service_.Get_Last_Followup( this.Login_User).subscribe(Rows => {
         this.Candidate_Followup_Data=Rows[0];
        if(this.Candidate_Followup_Data.length>0)
        {
            this.issLoading = false;
            this.Candidate_Followup_=this.Candidate_Followup_Data[0];


            this.Followup_Status_Temp.Status_Id = this.Candidate_Followup_.Status;
            this.Followup_Status_Temp.Status_Name = this.Candidate_Followup_.Status_Name;
            this.Followup_Status_ = this.Followup_Status_Temp;

            this.Followup_Users_Temp.Users_Id = this.Candidate_Followup_.To_User_Id;
            this.Followup_Users_Temp.Users_Name = this.Candidate_Followup_.To_User_Name;
            this.Followup_Users_ = this.Followup_Users_Temp;

            if (this.Candidate_Followup_.FollowUp == true)
                this.Next_FollowUp_Date_Visible = false;
            else
                this.Next_FollowUp_Date_Visible = true;

            this.Candidate_Followup_.Next_FollowUp_Date = new Date();
            this.Candidate_Followup_.Next_FollowUp_Date = this.New_Date(this.Candidate_Followup_.Next_FollowUp_Date);


            this.Candidate_Followup_.Remark="";
        }
        this.issLoading = false;
     },
     Rows => {
        this.issLoading = false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
     });  
}

Get_FollowUp_Details()
{
    this.issLoading = true;
    
    this.Candidate_Service_.Get_FollowUp_Details(this.Candidate_Id).subscribe(Rows => {
        
        this.issLoading = false; 
        this.Candidate_Followup_=Rows[0].FollowUp[0];
        if (this.Candidate_Followup_ != null && this.Candidate_Followup_!=undefined)
         {
             this.Followup_Status_Temp.Status_Id = this.Candidate_Followup_.Status;
             this.Followup_Status_Temp.Status_Name = this.Candidate_Followup_.Status_Name;
             this.Followup_Status_ = Object.assign({}, this.Followup_Status_Temp);

             this.Followup_Users_Temp.Users_Id = this.Candidate_Followup_.To_User_Id;
            this.Followup_Users_Temp.Users_Name = this.Candidate_Followup_.To_User_Name;
            this.Followup_Users_ = Object.assign({}, this.Followup_Users_Temp);

            this.Candidate_Followup_.Remark="";
            
            if(this.Candidate_Followup_.FollowUp==true)
            {
                this.Next_FollowUp_Date_Visible=false;
            }
            else
                this.Next_FollowUp_Date_Visible=true;

             this.Candidate_Followup_.Next_FollowUp_Date=new Date();
             this.Candidate_Followup_.Next_FollowUp_Date = this.New_Date(this.Candidate_Followup_.Next_FollowUp_Date);
        }
         },
       
         Rows => {
              this.issLoading = false;
       const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
  
}
Followup_History()
{
     this.Candidate_Id=this.Candidate_Data[this.Candidate_EditIndex].Candidate_Id;
    if(this.Show_Followup_History==true)
    {
        this.Show_Followup_History = false;
        this.issLoading = true;

        this.Candidate_Service_.Followup_History(this.Candidate_Id).subscribe(Rows =>
             {                               
            this.issLoading = false;
            if (Rows[0].FollowUp.length > 0)
                this.Followp_History_Data = Rows[0].FollowUp;
                

        },
            Rows => {
                this.issLoading = false;
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: false } });
            });
    }
   
    else
    this.Show_Followup_History=true

}
View_Candidate_Click_()
{
    this.View_History_=true;
    this.Show_FollowUp=true;
    this.Show_Followup_History=true;    
    this.Remove_Registration_Visibility=true;
    this.Registration_Visiblility=true;
    this.Edit_Candidate(this.Candidate_Data[this.Candidate_EditIndex],this.Candidate_EditIndex);
    // this.Edit_Candidate(this.Candidate_Data[0], this.Candidate_EditIndex);
}
Edit_Candidate(Candidate_e:any,index)
{

     this.Clr_Candidate();
     
    this.Candidate_EditIndex = index
    this.Flag_Followup = 0;
    this.Flag_Candidate = 1

    this.Candidate_Followup_.Remark = "";
    this.Candidate_Id = Candidate_e.Candidate_Id;
    this.Candidate_Id_Edit = Candidate_e.Candidate_Id;

    this.View_Candidate_=true;
    this.View_Follow_=false;  
    this.Entry_View=true;
    this.profile_View=true;
    this.tab_view=true;
    this.View_History_=false;;
    this.Show_FollowUp = true;
 this.Get_Candidate(Candidate_e.Candidate_Id);
}
Get_Candidate(Candidate_Id)
{ 
    
    this.Flag_Followup = 0;
    this.Flag_Candidate = 1

    this.Candidate_Followup_.Remark = "";
    this.Candidate_Id = Candidate_Id;
    this.Candidate_Id_Edit = Candidate_Id;

    this.View_Candidate_=true;
    this.View_Follow_=false;  
    this.Entry_View=true;
    this.profile_View=true;
    this.tab_view=true;
    this.View_History_=false;;
    this.Show_FollowUp = true;
    this.issLoading = true;
    this.Candidate_Service_.Get_Candidate(Candidate_Id).subscribe(Rows =>{
        
    this.Candidate_= Object.assign({},Rows[0][0]);
    // this.Registration=this.Candidate_.Registered;
    this.Remove_Registration_Visibility=false
    this.Registration_Visiblility=false

    if (this.Candidate_.Registered==true)
    {
        if(this.Remove_Registration_Permissions!=undefined && this.Remove_Registration_Permissions!=null)
            if(this.Remove_Registration_Permissions.View==true)
                this.Remove_Registration_Visibility=true;
    }
    else
    {
        if(this.Registration_Permissions!=undefined &&this.Registration_Permissions!=null)
            if(this.Registration_Permissions.View==true)
                this.Registration_Visiblility=true;
    }
    this.Display_Photo_=this.Candidate_.Photo;
    this.Display_Resume_=this.Candidate_.Resume;

        for (var i = 0; i < this.Gender_Data.length; i++)
        {
        if (this.Candidate_.Gender == this.Gender_Data[i].Gender_Id)
        this.Gender_=this.Gender_Data[i];
        } 

        for (var i = 0; i < this.Experience_Data.length; i++)
        {
        if (this.Candidate_.Experience_Id == this.Experience_Data[i].Experience_Id)
        this.Experience_=this.Experience_Data[i];
        } 

        for (var i = 0; i < this.Specialization_Data.length; i++)
        {
        if (this.Candidate_.Specialization_Id == this.Specialization_Data[i].Specialization_Id)
        this.Specialization_=this.Specialization_Data[i];
        } 
        
        for (var i = 0; i < this.Qualification_Data.length; i++)
        {
        if (this.Candidate_.Qualification_Id == this.Qualification_Data[i].Qualification_Id)
        this.Qualification_=this.Qualification_Data[i];
        }

        for (var i = 0; i < this.Functionl_Area_Data.length; i++)
        {
        if (this.Candidate_.Functional_Area_Id == this.Functionl_Area_Data[i].Functionl_Area_Id)
        this.Functionl_Area_=this.Functionl_Area_Data[i];
        } 
    this.issLoading = false;
    } ,
    Rows => {
    this.issLoading = false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
}
}

