import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student_Service } from '../../../services/Student.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Student } from '../../../models/Student';
import { Student_Followup } from '../../../models/Student_Followup';
import { Course } from '../../../models/Course';
import { Gender } from '../../../models/Gender';
import { Status } from '../../../models/Status';
import { Users } from '../../../models/Users';
import { Agent } from '../../../models/Agent';
import { Company } from '../../../models/Company';
import { University_Admission_Month } from '../../../models/University_Admission_Month';
import { Student_Course } from '../../../models/Student_Course';
import { University } from '../../../models/University';
import { Student_Course_Subject } from '../../../models/Student_Course_Subject';
import { Student_Course_Part } from '../../../models/Student_Course_Part';
import { Student_Fees_Installment_Master } from '../../../models/Student_Fees_Installment_Master';
import { Student_Fees_Installment_Details } from '../../../models/Student_Fees_Installment_Details';
import { Student_Fees_Installment_Save } from '../../../models/Student_Fees_Installment_Save';
import { Mode } from '../../../models/Mode';
import { Client_Accounts } from '../../../models/Client_Accounts';
import { Receipt_Voucher } from '../../../models/Receipt_Voucher';
import {environment}  from '../../../../environments/environment';
import { Document } from '../../../models/Document';
import { Course_Subject } from '../../../models/Course_Subject';
import { Exam_Status } from '../../../models/Exam_Status';
import {Month_Status} from '../../../models/Month_Status';
import {Year} from '../../../models/Year';
import { Mark_List } from '../../../models/Mark_List';
import { Part_Master } from '../../../models/Part_Master';
import { Part } from '../../../models/Part';
import { Grade } from '../../../models/Grade';
import { Fees_Receipt_Data } from '../../../models/Fees_Receipt_Data';
import { Course_Duration } from '../../../models/Course_Duration';
import { ROUTES, Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatGridTileHeaderCssMatStyler } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { Fees_Type } from '../../../models/Fees_Type';
import { Mark_List_Master } from '../../../models/Mark_List_Master';
import {Activity_Details} from '../../../models/Activity_Details'
import { University_Exam_Month } from '../../../models/University_Exam_Month';
import { THIS_EXPR, ThrowStmt } from '@angular/compiler/src/output/output_ast';
import { NumberValueAccessor } from '@angular/forms';
import { SKP_Status } from 'app/models/SKP_Status';

//import { debug } from 'console';

const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: { dateInput: 'DD/MM/YYYY', },
    display: {
        dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'DD/MM/YYYY', monthYearA11yLabel: 'MMMM YYYY',
    },
};
@Component({
selector: 'app-Student',
templateUrl: './Student.component.html',
styleUrls: ['./Student.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class StudentComponent implements OnInit {
    EditIndex: number;
    Total_Entries: number;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Student_Edit:boolean;
    Student_Save:boolean;
    Student_Delete:boolean;
    myInnerHeight: number;
    myTotalHeight: number;
        
    Company_:Company= new Company();
    Marklistindex:number;
    company_data_temp:Company []
    ImageFile: any;
    File: string;
    file:File;
    Years_: any;
    year: any;
    Years_Data=[];
    Start_Year_Data=[];
    Ending_Year_Data=[]
 Course_DurationView:string;
    month: any;
    day: any;
    date: any;
    Start_date: any;
    End_date: any;
    Examinationheldon_Date:Date;
    end_year_of:Date;
    new_mydate:string;

    More_Search_Options: boolean = true;
    Entry_View: boolean = true;
    tab_view:boolean=true;
    profile_View:boolean=true;
    button_view:boolean=true;
    Document_View_Option:boolean=true;
    Fees_View:boolean=false;
    Activity_Details_View:boolean=false;
    Fees_tab_Permission: any;
    Fees_tab_View: boolean = false;
    Fees_tab_Edit: boolean = false;
    Course_View: boolean = false;
    Certificate_View:boolean=false;
    Course_Tab_Permission: any;
    Course_Tab_View: boolean = false;
    Course_Tab_Edit: boolean = false;
    Mark_tab_Permission: any;
    Mark_tab_View: boolean = false;
    Mark_tab_Edit: boolean = false;
    Activity_tab_Permission: any;
    Activity_Tab_View: boolean = false;
    Activity_tab_Edit: boolean = false;
    Mark_View:boolean=true;
    Activity_View:boolean=true;
    Show_Followup_History: boolean = true;
    View_Follow_: boolean = true;
    View_Student_: boolean = true;
    Show_FollowUp: boolean = true;
    View_History_: boolean = true;
    Course_Tab:boolean=true;
    Installment_Index:number;

    Mark_List_Print_Blank:Mark_List[]


    Flag_Followup: number = 0;
    Flag_Student: number = 0;
    Student_Id_Edit: number = 0;
    Registration: boolean = false;
    Student_Id: number = 0;
    Part_Id: number = 0;
    Student_Name:string;

    Student_Data: Student[]
    Student_: Student = new Student();
    Student_Name_Search: string;
    SKP_Name:string;

    Student_Followup_: Student_Followup = new Student_Followup;
    Student_Followup_Data: Student_Followup[]

    Gender_: Gender = new Gender;
    Gender_Temp: Gender = new Gender;
    Gender_Data: Gender[]
    Course_: Course = new Course;
    Course_Temp: Course = new Course;
    Course_Data: Course[];

    SKP_: Agent = new Agent;
    SKP_Temp: Agent = new Agent;
    SKP_Data: Agent[]

    Course_Duration_: Course_Duration = new Course_Duration();
    Course_Duration_Temp: Course_Duration = new Course_Duration();
    Course_Duration_Data: Course_Duration[]
    
    Followp_History_Data: Student[];

    Search_Status: Status = new Status;
    Search_Status_Temp: Status = new Status;
    Status_Data: Status[];

    Agent: Agent = new Agent;
    Agent_Temp: Agent = new Agent;
    Agent_Data: Agent[];

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
    Login_User: number = 0;
    Is_Registered: any;
    ImageFile_Photo_view:any;

    Page_Start: number = 1;
    Page_End: number = 0;
    Page_Length_: number =10;
    Black_Start: number = 1;
    Black_Stop: number = 0;
    Red_Start: number = 1;
    Red_Stop: number = 0;
    Total_Rows: number = 0; 
    // missedfollowup_count: number = 1;
    missedfollowup_count: number = 1;
    followup_count: number = 0;
    nextflag: number;
    Search_Name: "";
    Agent_Name:"";

    Look_In_Date: boolean = true;
    Search_FromDate: Date = new Date();
    Search_ToDate: Date = new Date();

    Registration_Visiblility: boolean
    Remove_Registration_Visibility: boolean
    Registration_Permissions: any;
    Remove_Registration_Permissions: any;

    Student_EditIndex: number = -1;

    Student_Course_Subject_: Student_Course_Subject = new Student_Course_Subject;
    Student_Course_Subject_Temp: Student_Course_Subject = new Student_Course_Subject;
    Student_Course_Subject_Data: Student_Course_Subject[];

    Student_Course_Part_:Student_Course_Part=new Student_Course_Part;
    Student_Course_Part_Temp:Student_Course_Part=new Student_Course_Part;
    Student_Course_Part_Data: Student_Course_Part[];
    Student_Fees_Type_Data_Temp:Fees_Type = new Fees_Type();
    Student_Fees_Type_Data : Fees_Type[];
    Fees_Type_Search_: Fees_Type = new Fees_Type();
    Student_Course_Part_Save: Student_Course_Part[];

    Student_Mark_Part_Data: Student_Course_Part[];

    Student_Course_: Student_Course = new Student_Course;
    Student_Course_Temp: Student_Course = new Student_Course;
    certificate_Data: Student_Course[];
    cert_st_year:string;
    cert_end_year:string;
    Student_Course_Data: Student_Course[];
    Examinationheld_Date:Date=new Date();
    Student_Fees_Installment_Master_: Student_Fees_Installment_Master = new Student_Fees_Installment_Master;
    Student_Fees_Installment_Master_Temp: Student_Fees_Installment_Master = new Student_Fees_Installment_Master;
    Student_Fees_Installment_Master_Data: Student_Fees_Installment_Master[];
    Student_Fees_Installment_Master_Data_Temp: Student_Fees_Installment_Master[];

    Part_Master_Temp:Part_Master=new Part_Master();
    Part_Master_Data:Part_Master[];

    Student_Fees_Installment_Details_: Student_Fees_Installment_Details = new Student_Fees_Installment_Details
    Student_Fees_Installment_Details_Temp: Student_Fees_Installment_Details = new Student_Fees_Installment_Details
    Student_Fees_Installment_Details_Data: Student_Fees_Installment_Details[]

    Fees_Master_Id:number=0;
    Student_Fees_Installment_Save_:Student_Fees_Installment_Save=new Student_Fees_Installment_Save;
    Student_Fees_Installment_Save_Data:Student_Fees_Installment_Save[];
    Student_Fees_Installment_Save_Temp:Student_Fees_Installment_Save=new Student_Fees_Installment_Save;

    Course_Click_Status:boolean = false;
    Fees_Click_Status:boolean = false;
    Mark_Click_Status:boolean = false;
    Activity_Click_Status:boolean = false;
    date_Temp:Date=new Date();
    

    Course_Id_Edit: number = 0;
    Student_Course_Id_Edit :number = 0;
    Subject_:Course_Subject=new Course_Subject;
    Course_Subject_Data:Course_Subject[];
    Part_Subject_Data:Course_Subject[];
    Subject_Temp:Course_Subject=new Course_Subject;

    Exam_Status_:Exam_Status=new Exam_Status;
    Exam_Status_Temp:Exam_Status=new Exam_Status;
    Exam_Status_Data:Exam_Status[];


    Month_Status_:Month_Status=new Month_Status;
    Month_Status_Temp:Month_Status=new Month_Status;
    Month_Status_Data:Month_Status[];
    Exam_Month_:Month_Status=new Month_Status;
    Exam_Month_Data_Temp:Month_Status=new Month_Status;
    Exam_Month_Data:Month_Status[];
    Mark_Hidden:boolean=true;
    Add_Mark:boolean=false;
    Year_Hidden:boolean=true;
    // Years_:Years=new Years;
    // Years_Temp:Years=new Years;
    //Years_Data:[];
    Years:number;
    Issue_Date_:Date;


    Part_:Part=new Part;
    Part_Temp:Part=new Part;
    Part_Data:Part[];
    
    Mark_List_:Mark_List=new Mark_List;
    Mark_List_Temp:Mark_List=new Mark_List;
    Mark_List_Data:Mark_List[]
    Mark_List_Index:number=-1;
    Mark_List_Data_1:Mark_List[]
    Mark_List_Master_:Mark_List_Master = new Mark_List_Master();

    Receipt_History_View:boolean=false;
    Mode:Mode=new Mode();
    Mode_Temp:Mode=new Mode();
    Mode_Data:Mode[]

    Receipt_Voucher_:Receipt_Voucher=new Receipt_Voucher;
    Receipt_Voucher_Data:Receipt_Voucher[]

    Receipt_Details_:Fees_Receipt_Data=new Fees_Receipt_Data();

    Client_Accounts_:Client_Accounts=new Client_Accounts;
    Client_Accounts_Temp:Client_Accounts=new Client_Accounts;
    Client_Accounts_Data:Client_Accounts[]
    Receipt_View:boolean=false;
    
    University_: University = new University;
    University_Temp: University = new University;
    University_Data: University[]
    University_Search: University = new University;
    
    Mark_List_Print:Mark_List[]
    Part_Name_Print:string;

    Start_Year:any;
    Start_Month:any;
    End_Year:any;
    End_Month:any;

    University_1:number

    elementType = 'svg';
    // value = 'someValue12340987';
    format = 'CODE128';
    lineColor = '#000000';
    width = 2;
    height = 100;
    displayValue = true;
    fontOptions = '';
    font = 'monospace';
    textAlign = 'center';
    textPosition = 'bottom';
    textMargin = 2;
    fontSize = 20;
    background = '#ffffff';
    margin = 10;
    marginTop = 10;
    marginBottom = 10;
    marginLeft = 10;
    marginRight = 10;
    Registrtion_No_Barcode:string;
    
    Starting_Month_:University_Admission_Month=new University_Admission_Month;
    Starting_Month_Temp:University_Admission_Month=new University_Admission_Month;
    Starting_Month_Data:University_Admission_Month[];
    Ending_Month_:Month_Status=new Month_Status;
    Ending_Month_Temp:Month_Status=new Month_Status;
    Ending_Month_Data:Month_Status[];

    Starting_Year_:Year=new Year;
    strtYear_ : string;
    endmonth_ : string;
    monthstart_:string;
    CenterName:string;
    DistrictName:string;
    CenterCode:string;
    ActivityDetails_:Activity_Details= new Activity_Details;
    ActivityDetails_Datas:Activity_Details[];

    Grade_Data :Grade= new Grade();

    Document_View_Status:boolean=false
    Documewnt_View_Permission:any
 
    Document_Array:Document[];
    Document_File_Array:any[]
    Document_File:Document=new Document();
    Document_Start:number;
    Document_Description:string;
    ImageFile_passport: any;
    ImageFile_Ielts: any;
    ImageFile_Tenth: any;
    ImageFile_Experience: any;
    ImageFile_Aadhaar: any;

    Tenth_Certificate:string;
    Passport_Copy:string;
    IELTS:string;
    Work_Experience:string;
    Aadhaar_:string;
    Passport_Photo:string;
    Display_File_Name_:string;
    Display_passport_:string;
    Display_Ielts_:string;
    Display_Tenth_:string;
    Display_Experience_:string;
    Display_Aadhaar_:string;
    Login_User_Name:string;

    Aadhaar_Back_:string;
    Display_Aadhaar_Back_:string;
    ImageFile_Aadhaar_Back: any;

    SSLC_Certificate_:string;
    Display_SSLC_Certificate_:string;
    ImageFile_SSLC_Certificate: any;

    Plustwo_Certificate_:string;
    Display_Plustwo_Certificate_:string;
    ImageFile_Plustwo_Certificate: any;


    Maximummarks_Print:number;
    Minimummarksforpass_print:number;
    Internalassessment_Total_Print:number;
    Externalassessment_Total_Print:number;
    Skillassessment_Total_Print:number;
    Totalmarks_Total_Print:number;
    print_IssueDate:Date;

    pass:string;
    fail:string;

    SKP_Status_: SKP_Status = new SKP_Status;
    SKP_Status_Temp: SKP_Status = new SKP_Status;
    SKP_Status_Data: SKP_Status[]

constructor(public Student_Service_:Student_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User = Number(localStorage.getItem("Login_User"));
    this.Login_User_Name = localStorage.getItem("uname");
    this.Permissions = Get_Page_Permission(14);
    this.Registration_Permissions = Get_Page_Permission(17);
    this.Remove_Registration_Permissions = Get_Page_Permission(18);
    this.Course_Tab_Permission = Get_Page_Permission(19)
    this.Fees_tab_Permission = Get_Page_Permission(20)
    this.Mark_tab_Permission = Get_Page_Permission(21)
    this.Activity_tab_Permission = Get_Page_Permission(35)
    // this.Documewnt_View_Permission = Get_Page_Permission(49)
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.Search_Lead_button();
    this.Student_Edit=this.Permissions.Edit;
    this.Student_Save=this.Permissions.Save;
    this.Student_Delete=this.Permissions.Delete;
    this.Page_Load()
    if (this.Fees_tab_Permission != undefined && this.Fees_tab_Permission != null)
        {
        this.Fees_tab_Edit=this.Fees_tab_Permission.Edit
        this.Fees_tab_View=this.Fees_tab_Permission.View
        }
    if (this.Course_Tab_Permission != undefined && this.Course_Tab_Permission != null)
        {
        this.Course_Tab_Edit=this.Course_Tab_Permission.Edit;
        this.Course_Tab_View=this.Course_Tab_Permission.View
        }
    if (this.Mark_tab_Permission != undefined && this.Mark_tab_Permission != null)
        {
        this.Mark_tab_View=this.Mark_tab_Permission.View
        this.Mark_tab_Edit=this.Mark_tab_Permission.Edit
        }
    if (this.Activity_tab_Permission != undefined && this.Activity_tab_Permission != null)
        {
        this.Activity_Tab_View=this.Activity_tab_Permission.View
        this.Activity_tab_Edit=this.Activity_tab_Permission.Edit
        }
    // if (this.Documewnt_View_Permission != undefined && this.Documewnt_View_Permission != null)
    //     {
    //     this.Document_View_Status=this.Documewnt_View_Permission.View;
    //     }  
    }
     
}
Page_Load()
{    
    // this.myInnerHeight = (window.innerHeight);
    // this.myInnerHeight = this.myInnerHeight - 200;
    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight;
    this.myTotalHeight=this.myTotalHeight-90;
    this.myInnerHeight = this.myInnerHeight - 370;
    this.Clr_Student();
    this.Clr_Student_Course();
    this.Load_Gender();
    this.Load_Part();
    this.Load_Student_Search_Dropdowns();
    this.Load_Exam_Status();
    this.Load_Month_Status();
    // this.Load_Years();
    this.Load_Mode();
    this.Load_University();
    this.Clr_Receipt_Voucher();
    this.Get_Company();
    
    this.Entry_View = false;
    this.Mark_Hidden=true;
    this.Add_Mark=false;
    this.Year_Hidden=true;
    this.Receipt_History_View=false;
    this.profile_View = true;
    this.button_view = true;
    this.Document_View_Option=true;
    this.tab_view = true;
    this.Fees_View = true;
    this.Activity_Details_View=true;
    this.Certificate_View=true;
    this.Course_View = false;
    this.Course_View = true;
    this.Mark_View=true;
    this.Activity_View=true;
    this.Is_Registered = 1;
    this.Look_In_Date = true;
    this.Search_FromDate = this.New_Date(this.Search_FromDate);
    this.Search_ToDate = this.New_Date(this.Search_ToDate);
    this.Student_Course_Part_.Mark_List_Issue_Date = new Date();
    this.Student_Course_Part_.Mark_List_Issue_Date = this.New_Date(this.Student_Course_Part_.Mark_List_Issue_Date);
    
    // this.Issue_Date_ = new Date();
    // this.Issue_Date_ = this.New_Date(this.Issue_Date_);
    this.date_Temp=this.New_Date(this.date_Temp)
    this.Course_Click_Status=false;
    this.Fees_Click_Status=false;
    this.Mark_Click_Status=false;
    this.Activity_Click_Status=false;
    this.Fees_Master_Id=0;
    this.Black_Stop = this.Page_Length_;
    this.Red_Stop = this.Page_Length_;   
   this.Start_Year=''; 
   this.End_Year='';
}
Tab_Click(Current_tab)
{       
    this.profile_View=false;
    this.button_view = false;
    this.Fees_View=false;
    this.Certificate_View=false;
    this.Course_View=false;
    this.Mark_View=false;
    this.Activity_View=false;
    this.Document_View_Option=false;
    this.Activity_Details_View=false;
    if(Current_tab==1)
    {
        this.profile_View=true;
        this.Document_View_Option=true;
        this.button_view = true;
    }
    else if(Current_tab==2)
    {
        this.Course_View=true;
        if( this.Course_Click_Status==false) 
        {   
            this.Get_Student_Course(this.Student_Id)
            // this.Load_Month_Status_for_Part();
            this.Course_Click_Status=true;
        }
    }
    else if(Current_tab==3)
    {
        this.Fees_View=true;
        this.Receipt_View=false;
        if( this.Fees_Click_Status==false)
        {
            this.Fees_Click_Status=true;
        }              
        this.Get_Receipt_History();
    }
    else if(Current_tab==4)
    {
        this.Year_Hidden=false;
        this.Mark_Hidden=true;
        this.Add_Mark=false;
        this.Mark_View=true; 
        if( this.Mark_Click_Status==false)
        {            
        // this.Get_Student_Mark_List(this.Student_Id)
        this.Mark_Click_Status=true;
        }
        this.Load_Student_Part();
    }
    else if(Current_tab==6)
    {
        this.Certificate_View=true;
        
        this.Get_Grade();
    }

    else if(Current_tab==7)

    {
        
        this.Activity_Details_View=true;
        

        this.Get_Activity_Details(this.Student_Id)
    }
}
isMobileMenu()
{
    if ($(window).width() > 991)
    {
        return false;
    }
    return true;
};

marklist_back()
{
    this.Year_Hidden=false;
        this.Mark_Hidden=true;
        this.Add_Mark=false;
        this.Mark_View=true; 
        if( this.Mark_Click_Status==false)
        {            
        // this.Get_Student_Mark_List(this.Student_Id)
        this.Mark_Click_Status=true;
        }
}

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
    this.Student_Service_.Load_Gender().subscribe(Rows => {
        if (Rows != null) {
            this.Gender_Data = Rows[0];
            this.Gender_Temp.Gender_Id = 0;
            this.Gender_Temp.Gender_Name = "All";
            this.Gender_Data.unshift(this.Gender_Temp);
            this.Gender_ = this.Gender_Data[0];

            this.Course_Duration_Data = Rows[1];
            this.Course_Duration_Temp.Course_Duration_Id = 0;
            this.Course_Duration_Temp.Course_Duration_Name = "All";
            this.Course_Duration_Data.unshift(this.Course_Duration_Temp);
            this.Course_Duration_ = this.Course_Duration_Data[0];

            this.SKP_Data = Rows[2];
            this.SKP_Temp.Agent_Id = 0;
            this.SKP_Temp.Agent_Name = "Select";
            this.SKP_Data.unshift(this.SKP_Temp);
            this.SKP_ = this.SKP_Data[0];

                
            this.SKP_Status_Data = Rows[3];
            this.SKP_Status_Temp.Status_Id = 0;
            this.SKP_Status_Temp.Status_Name = "Select";
            this.SKP_Status_Data.unshift(this.SKP_Status_Temp);
            this.SKP_Status_ = this.SKP_Status_Data[0];

            this.issLoading = false;
        }
    },
        Rows => {
            this.issLoading = false;
        });
}
Load_University()
{
    this.Student_Service_.Load_University().subscribe(Rows => {
        if (Rows != null) {
            this.University_Data = Rows[0];
            // this.University_Temp.University_Id = 0;
            // this.University_Temp.University_Name = "Select";
            // this.University_Data.unshift(this.University_Temp);
            // this.University_ = this.University_Data[0];
            this.University_Search = this.University_Data[0];
            
    }
        this.issLoading = false;
    },
    Rows => {
        this.issLoading = false;
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
    });
}
display_University(University: University)
{     
    if (University) { return University.University_Name; }
}
Get_Grade()
{
    
    this.Student_Service_.Get_Grade(this.Student_.Student_Id).subscribe(Rows => {
        
        if (Rows != null) {
           this.Grade_Data = Rows[0][0];
           var Total =  this.Grade_Data.Maximum_Mark;
           var Obtained = this.Grade_Data.Obtained_mark;
           var percentage = (Number(Obtained)/Number(Total))*100;
           if(percentage>=80)
                this.Student_Course_.Certificate_Grade = 'A+';
            else if(percentage>=60)
                this.Student_Course_.Certificate_Grade = 'A';
            else if(percentage>=50)
                this.Student_Course_.Certificate_Grade = 'B';
            else if(percentage>=40)
                this.Student_Course_.Certificate_Grade = 'B';

            this.issLoading = false;
        }
    },
        Rows => {
            this.issLoading = false;
        });
}
Load_Student_Search_Dropdowns()
{
    this.issLoading = true;
    this.Student_Service_.Load_Student_Search_Dropdowns(3).subscribe(Rows => {
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

Download_Student_File(File_Name)
{
   
    var File_Name_Temp;
    if(File_Name=='Photo')
        File_Name_Temp=this.Student_.Photo;
    if(File_Name=='Aadhaar_')
        File_Name_Temp=this.Student_.Aadhaar;

        if(File_Name=='Aadhaar_Back_')
        File_Name_Temp=this.Student_.Aadhaar_Back;

        if(File_Name=='SSLC_Certificate_')
        File_Name_Temp=this.Student_.SSLC_Certificate;

        if(File_Name=='Plustwo_Certificate_')
        File_Name_Temp=this.Student_.Plustwo_Certificate;

    // var bs='F:/Teena/Dist/backend/Uploads/'
    // var s=bs+File_Name_Temp;            
    // window.open(s,'_blank');

    var bs= environment.FilePath+'/uploads/';
    var s = bs+ File_Name_Temp;
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
New_DateS(Date_)
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
        this.date = this.day + "-" + this.month + "-" + this.year;
      //  this.date = this.day + "-"+ this.month + "-" + this.year ;
        return this.date;
}
get_Year(Date_)
{
         this.date=Date_;
        this.year = this.date.getFullYear();
        return this.year;
}
Create_New()
{
    this.Entry_View = true;
    this.View_Student_ = true;
    this.profile_View = true;
    this.button_view = true;
    this.Fees_View = false;
    this.Activity_Details_View=false;
    this.Course_View = false;     
    this.Certificate_View=false;  
    this.Mark_View = false;
    this.Activity_View=false;
    this.Show_FollowUp = false;
    this.Receipt_History_View=false;
    this.Flag_Followup = 1;
    this.Flag_Student = 1;
    this.View_Follow_ = true;
    this.Course_Tab = false;
    this.Document_View_Option=true;
    this.Student_Id = 0
    this.Part_Id=0;
    this.Student_Id_Edit=0;
    this.Course_Id_Edit=0;
    this.Mark_List_Data=[];
    // if(this.Document_View_Status==true)
    //     this.Document_View_Option=true;

    //this.Mark_List_Details=[];
    this.Clr_Mark_List();
    this.Clr_Mark_List_Master();
    this.Clr_Student();
    this.Clr_Student_Course();
    this.Clr_Receipt_Voucher();
    this.Student_Followup_.Next_FollowUp_Date = new Date();
    this.Student_Followup_.Next_FollowUp_Date = this.New_Date(this.Student_Followup_.Next_FollowUp_Date);    
    this.Get_Last_Followup();
    this.Student_Followup_.Remark="";
    // if(this.Document_View_Status==true)
    //     this.Document_View_Option=true;
}
course_click()
{
    let top = document.getElementById('Topdiv');
    if (top !== null) {
    top.scrollIntoView();
    top = null;
    }
    this.Course_Tab=true;
    this.Tab_Click(2)
}
Close_Click()
{
 
    let top = document.getElementById('Topdiv');
    if (top !== null) {
    top.scrollIntoView();
    top = null;
    }
    this.View_Student_ = true;
    this.Student_EditIndex = -1;
    this.Flag_Followup = 0;
    this.Flag_Student = 0;
    this.Student_Id = 0
    this.Part_Id=0;
    this.Student_Id_Edit=0;
    this.Course_Id_Edit=0;
    this.Entry_View = false;
    this.View_History_ = true; 
    this.Show_Followup_History = true;
    this.View_Follow_ = true;
    this.Clr_Student();
    this.Clr_Student_Course();
    this.Mark_List_Data=[];
    //this.Mark_List_Details=[];
    this.Clr_Mark_List();
    this.Clr_Mark_List_Master();
    this.Clr_Receipt_Voucher();
    //this.Search_Student();
    this.Fees_Master_Id=0;
    this.Course_Click_Status=false;
    this.Fees_Click_Status=false;
    this.Mark_Click_Status=false;
    this.Course_Subject_Data=[];
    this.Issue_Date_ = new Date();
  
}
Clr_Student()
{
    this.Course_Tab=false;
    this.Student_.Student_Id=0;
    this.Student_.Student_Name="";
    this.Student_.Address1="";
    this.Student_.Address2="";
    this.Student_.Address3="";
    this.Student_.Address4="";
    this.Student_.Pincode="";
    this.Student_.Phone="";
    this.Student_.Mobile="";
    this.Student_.Whatsapp="";
    this.Student_.Aadhaar_Image = "";
    // this.Student_.DOB = "";
    this.Student_.DOB = new Date();
    this.Student_.DOB = this.New_Date(this.Student_.DOB);
    // this.Student_.SKP=0;
    this.Student_.Email="";
    this.Student_.Alternative_Email="";
    this.Student_.Passport_No="";
    this.Student_.Passport_Expiry="";
    this.Student_.User_Name="";
    this.Student_.Password = "";
    this.Student_.Role_No = "";
    this.Student_.Registration_No = 0;
    this.Student_.Photo='';
    this.Student_.Aadhaar = "";
    this.Student_.Aadhaar_Back ="";
    this.Student_.SSLC_Certificate ="";
    this.Student_.Plustwo_Certificate ="";

    this.Student_.User_Id=0;    
    this.ImageFile_Photo='';
    this.Display_Photo_='';
    this.ImageFile_Aadhaar='';
    this.Display_Aadhaar_ = '';
    this.Display_Aadhaar_Back_ = '';
    this.Display_Plustwo_Certificate_ = '';
    this.Display_SSLC_Certificate_ = '';

    this.ImageFile_Photo_view='';
    this.Document_Description="";
    this.Display_File_Name_="";
    this.Document_File.File_Name = ""
    this.Document_File_Array=[];
    this.Document_Array=[];
    this.ImageFile=null;
        this.Remove_Registration_Visibility = false
    this.Registration_Visiblility = false

    if(this.Gender_Data!=null && this.Gender_Data != undefined)
    this.Gender_=this.Gender_Data[0];

    if(this.SKP_Data!=null && this.SKP_Data != undefined)
    this.SKP_=this.SKP_Data[0];
   
    if(this.SKP_Status_Data!=null && this.SKP_Status_Data != undefined)
    this.SKP_Status_=this.SKP_Status_Data[0];

}
Clr_Student_Followup()
 {
    this.Student_Followup_.Student_Followup_Id=0;
    this.Student_Followup_.Student_Id=0;
    this.Student_Followup_.Entry_Date = new Date();
    this.Student_Followup_.Entry_Date = this.New_Date(this.Student_Followup_.Entry_Date);
    this.Student_Followup_.Next_FollowUp_Date = new Date();
    this.Student_Followup_.Next_FollowUp_Date = this.New_Date(this.Student_Followup_.Next_FollowUp_Date);
    this.Student_Followup_.FollowUp_Difference=0;
    // this.Student_Followup_.Status=0;
    this.Student_Followup_.By_User_Id=0;
    this.Student_Followup_.Remark="";
    this.Student_Followup_.Remark_Id=0;
    this.Student_Followup_.FollowUp_Type=0;
    this.Student_Followup_.FollowUP_Time="";
    this.Student_Followup_.Actual_FollowUp_Date = new Date();
    this.Student_Followup_.Actual_FollowUp_Date = this.New_Date(this.Student_Followup_.Actual_FollowUp_Date);
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
        this.Student_Service_.Search_Status_Typeahead('',3).subscribe(Rows => {
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
    this.Student_Followup_.Next_FollowUp_Date=new Date();
    this.Student_Followup_.Next_FollowUp_Date=this.New_Date(this.Student_Followup_.Next_FollowUp_Date);
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
         this.Student_Service_.Search_Users_Typeahead('').subscribe(Rows => {
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
To_User_Change(Users)
{
this.Student_Service_.Load_User_Agent_Details(Users.Users_Id).subscribe(Rows => {
    if (Rows != null) {
        
        var Agent_Data= Rows[0];
        
        this.Student_Followup_.Agent_Id = Rows[0][0].Agent_Id;
        this.Student_Followup_.Agent_Name = Rows[0][0].Agent_Name;
        this.Student_Followup_.Agent_Address1 =  Rows[0][0].Address1;
        this.Student_Followup_.Center_Name =  Rows[0][0].Center_Name;
        this.Student_Followup_.Center_Code =  Rows[0][0].Center_Code;
        this.Student_Followup_.Agent_District_Id =  Rows[0][0].District_Id;
        this.issLoading = false;
    }
},
    Rows => {
        this.issLoading = false;
    });
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
display_Agent(Agent: Agent)
{     
    if (Agent) { return Agent.Agent_Name; }
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
    this.missedfollowup_count=0;
    this.Search_Student();
}
Search_Student()
{
    var value = 1, Register_Value = 1, Status_Id = 0, User_Id = 0, search_name_ = undefined,
        look_In_Date_Value = 0, Agent_Id = 0 ;
    // if (this.Search_By_ != undefined && this.Search_By_ != null)
    //     if (this.Search_By_ != undefined && this.Search_By_ != null && this.Search_By_ != '')
    //         value = this.Search_By_;
    if (this.Is_Registered != undefined && this.Is_Registered != null)
        if (this.Is_Registered != undefined && this.Is_Registered != null && this.Is_Registered != '')
            Register_Value = this.Is_Registered;

    if (this.Look_In_Date == true)
        look_In_Date_Value = 1;

    if (this.Search_Name != undefined && this.Search_Name != null && this.Search_Name != '')
        search_name_ = this.Search_Name;

//   if (this.Agent_Name != undefined && this.Agent_Name != null && this.Agent_Name != '')
//         agent_name_ = this.Agent_Name;

    if (this.Agent != undefined && this.Agent != null)
    if (this.Agent.Agent_Id != undefined && this.Agent.Agent_Id != null)
    Agent_Id = this.Agent.Agent_Id;

    if (this.Users_Search != undefined && this.Users_Search != null)
        if (this.Users_Search.Users_Id != undefined && this.Users_Search.Users_Id != null)
            User_Id = this.Users_Search.Users_Id;

    if (this.Search_Status != undefined && this.Search_Status != null)
        if (this.Search_Status.Status_Id != undefined && this.Search_Status.Status_Id != null)
            Status_Id = this.Search_Status.Status_Id;
     this.issLoading = true;
     
    this.Student_Service_.Search_Student(moment(this.Search_FromDate).format('YYYY-MM-DD'), moment(this.Search_ToDate).format('YYYY-MM-DD'),search_name_, 
     User_Id, Status_Id, look_In_Date_Value, this.Black_Start, this.Black_Stop, this.Login_User, this.Red_Start, this.Red_Stop, Register_Value,Agent_Id).subscribe(Rows =>{
            
            this.Student_Data = Rows.returnvalue.Student;           
            this.Total_Entries = this.Student_Data.length;
            this.missedfollowup_count = 0;
            this.followup_count = 0;
            if ( this.Student_Data.length>0)
            {
                if(this.Student_Data[0].User_Status==2){
                    localStorage.clear();
                    this.router.navigateByUrl('/auth/login');
                }
                    
            }

            for (var i = 0; i < this.Student_Data.length; i++) {
                this.Student_Data[i].RowNo = i + 1 + this.Total_Rows;
                if (this.Student_Data[i].tp == 1)
                    this.followup_count = this.followup_count + 1;
                if (this.Student_Data[i].tp == 2)

                    this.missedfollowup_count = this.missedfollowup_count + 1;
            }

            if (this.Student_Data.length > 0)
                this.Total_Rows = this.Total_Rows + this.Student_Data.length;
            this.issLoading = false;
                if(this.Student_Data.length==0)
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
Next_Click()
 {     
     
    if (this.Student_Data.length == this.Page_Length_)
    {
    this.Black_Start = this.Black_Start + this.Page_Length_;
    this.Black_Stop = this.Black_Stop + this.Page_Length_;
    if (this.missedfollowup_count > 0)
    {
        this.Red_Start = this.Red_Start + this.missedfollowup_count ;
        this.Red_Stop = this.Red_Start + this.Page_Length_;   
    }
    this.nextflag = 1;
   
        if (this.Student_Data.length > 0)
            {
                this.Search_Student();
            }
    }
    else
    {
     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No more Details',Type: "3" }});
    }
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
        this.Total_Rows = this.Total_Rows - this.Student_Data.length - this.Page_Length_;
        this.Search_Student();
    }
}
Delete_Student(Student_Id,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
    {
   this.issLoading=true;
    this.Student_Service_.Delete_Student(Student_Id).subscribe(Delete_status => {
        Delete_status = Delete_status[0];
        Delete_status = Delete_status[0].DeleteStatus_;
    if(Delete_status==1)
    {
    this.Student_Data.splice(index, 1);
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
Fill_Student()
{    
    if(this.Flag_Student==1)
    {
        this.Student_.DOB = this.New_Date(new Date(moment(this.Student_.DOB).format('YYYY-MM-DD')));
    // this.Student_.Aadhaar="";
    this.Student_.User_Id=this.Login_User;
    this.Student_.Gender=this.Gender_.Gender_Id;

    debugger
    
    this.Student_.Agent_Id = this.SKP_.Agent_Id;
    this.Student_.Agent_Name =this.SKP_.Agent_Name;

    this.Student_.SKP_Status_Id = this.SKP_Status_.Status_Id;
    this.Student_.SKP_Status_Name = this.SKP_Status_.Status_Name;
    
    return this.Student_;
} 
else
return null;
}
Fill_Followup()
{  
if(this.Flag_Followup==1)

{    
    if (this.Student_Followup_.Next_FollowUp_Date == undefined || this.Student_Followup_.Next_FollowUp_Date==null)
    {
        this.Student_Followup_.Next_FollowUp_Date=new Date();
    } 
    
    this.Student_Followup_.Student_Id=this.Student_Id;
    this.Student_Followup_.Next_FollowUp_Date = this.New_Date(new Date(moment(this.Student_Followup_.Next_FollowUp_Date).format('YYYY-MM-DD')));
    this.Student_Followup_.Status=this.Followup_Status_.Status_Id;
    this.Student_Followup_.Status_Name=this.Followup_Status_.Status_Name;
    // this.Student_Followup_.FollowUp=this.Followup_Status_.FollowUp;
    this.Student_Followup_.FollowUp=true;

    this.Student_Followup_.To_User_Id = this.Followup_Users_.Users_Id;
    this.Student_Followup_.To_User_Name=this.Followup_Users_.Users_Name;

    this.Student_Followup_.By_User_Id=this.Login_User;
    this.Student_Followup_.By_User_Name=this.Login_User_Name;

    

    this.Student_Followup_.Entry_Date = this.New_Date(new Date(moment(this.Student_Followup_.Entry_Date).format('YYYY-MM-DD')));
    this.Student_Followup_.Actual_FollowUp_Date = this.New_Date(new Date(moment(this.Student_Followup_.Actual_FollowUp_Date).format('YYYY-MM-DD')));



    return this.Student_Followup_;
}
else
return null;
}
Save_Student()
{
    if(this.Flag_Student==1)
    {
    if (this.Student_.Student_Name== undefined || this.Student_.Student_Name == null || this.Student_.Student_Name == "" ) 
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Student', Type: "3" } });
        return;
    }
    if (this.Gender_ == undefined || this.Gender_ == null || this.Gender_.Gender_Id == undefined || this.Gender_.Gender_Id==0) 
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Gender', Type: "3" } });
        return;
    }    
    if (this.Student_.Email == undefined || this.Student_.Email == null || this.Student_.Email == "" ) 
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Email', Type: "3" } });
        return;
    }
    if (this.Student_.Mobile == undefined || this.Student_.Mobile == null || this.Student_.Mobile == "" ) 
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Mobile', Type: "3" } });
        return;
    }
    if(this.Student_.Phone!=''&&this.Student_.Phone!=null&&this.Student_.Phone!=undefined)
    { 
if(this.Student_.Phone.toString().length!=10 )
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Enter valid Phone',Type:"3"}});
    return
}
    }
if(this.Student_.Mobile!=''&&this.Student_.Mobile!=null&&this.Student_.Mobile!=undefined)
{
    if(this.Student_.Mobile.toString().length!=10 )
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Enter valid Mobile',Type:"3"}});
        return
    }
}
if(this.Student_.Whatsapp!='' && this.Student_.Whatsapp!=null && this.Student_.Whatsapp!=undefined)
{
    if(this.Student_.Whatsapp.toString().length!=10 )
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Enter valid Whatsap',Type:"3"}});
        return
    }
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
    if (this.Student_Followup_.Remark == undefined || this.Student_Followup_.Remark == null || this.Student_Followup_.Remark == "") {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Remark', Type: "3" } });
        return;
    }
}
    var Main_Array={
        "Student":this.Fill_Student(),
        "Followup":this.Fill_Followup()
    }
    if (Main_Array.Student == null && Main_Array.Followup == null   )
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Saved', Type: "false" } });
        return;
    }

    if (this.Save_Call_Status == true)
        return;
    else
        this.Save_Call_Status = true;
 this.issLoading = true;
 debugger
    this.Student_Service_.Save_Student(Main_Array, this.ImageFile_Photo,this.ImageFile_Aadhaar,this.Document_File_Array,this.Document_Array,this.Document_Description,this.ImageFile
        ,this.Display_File_Name_,this.ImageFile_Aadhaar_Back,this.ImageFile_SSLC_Certificate,this.ImageFile_Plustwo_Certificate).subscribe(Save_status => {
            debugger
        if(Number(Save_status[0][0].Student_Id_)>0)
        {             
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
            this.Save_Call_Status = false;
        if( this.profile_View==true){
            this.Create_New();
            this.Search_Student();
            this.Clr_Student();
            this.Close_Click()
        }
        else
            {
                this.Close_Click()
                this.Search_Student()
            }
        }
        else if(Number(Save_status[0][0].Student_Id_)==-1)
        {  
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'The Phone Number Already Exist for '+Save_status[0][0].Duplicate_Student_Name+' and is handled by '+Save_status[0][0].Duplicate_User_Name,Type:"2"}});
            this.Save_Call_Status = false;
        }
        else if(Number(Save_status[0][0].Student_Id_)==-2)
        {  
            const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:' Email is Already Exist for '+Save_status[0][0].Duplicate_Student_Name+' and is handled by '+Save_status[0][0].Duplicate_User_Name,Type:"2"}});
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

Register_Student()
{         
         const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to Register ?',Type:true,Heading:'Confirm'}});
            dialogRef.afterClosed().subscribe(result =>
        {
        if(result=='Yes')
        {
           this.issLoading = true;
     
                this.Student_Service_.Register_Student(this.Student_.Student_Id,this.Login_User).subscribe(Save_status => {
                    
                    if(Number(Save_status[0][0].Student_Id_)>0)
        { 
            
            
            this.Student_.Registration_No = Save_status[0][0].Registration_No_;
             this.issLoading=true;
            this.Student_Service_.Send_Register_Email(Save_status[0][0].Email_).subscribe(Rows => {
                
                this.issLoading=false;
                },
                Rows => 
                { 
                    this.issLoading=false;
                    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
                });
            this.Remove_Registration_Visibility=false
            this.Registration_Visiblility=false
            if(this.Remove_Registration_Permissions!=undefined &&this.Remove_Registration_Permissions!=null)
                if(this.Remove_Registration_Permissions.View==true)
                     this.Remove_Registration_Visibility=true;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Registered',Type:"false"}});
         this.Search_Student();
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
        this.Student_Service_.Remove_Registration(this.Student_.Student_Id).subscribe(update_status => {  
            
        if(update_status[0][0].Student_Id_>0)
        {
        // this.Student_.Registration_No = 0;
        // this.Student_.Registered_By = 0;
        // this.Student_.Registered_On =new Date();
        // this.Student_.Registered_On = this.New_Date(this.Student_.Registered_On );

        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Registration Removed',Type: "false"}});
        this.Search_Student();
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
    if (this.Fees_View!=undefined)
    {
        this.Fees_View=false;
    }
    this.View_History_=false;
    this.Fees_View=false;   
    this.Document_View_Option=false;

    this.New_Followup(this.Student_Id,this.Student_.Student_Name,this.Student_EditIndex);
   
    //this.Create_New=true;
}
New_Followup(Student_Id,Student_Name,index)
{
    
    this.View_Student_=false;
    this.View_Follow_=true;  
    this.View_History_=false;
    this.Fees_View = false;
    this.Activity_Details_View=false;
    this.Certificate_View=false;
    this.Show_FollowUp = false;
    this.Entry_View = true;
    this.tab_view = false;
    this.profile_View = false;
    this.button_view = true;
    this.Course_View = false;
    this.Mark_View = false;
    this.Activity_View=false;
    this.Next_FollowUp_Date_Visible=true;
    
    this.Student_Id = Student_Id;
    this.Student_EditIndex = index;
    // this.Next_FollowUp_Date_Visible=true;
    this.Get_FollowUp_Details();
    this.Student_Name=Student_Name

    this.Student_Followup_.Student_Id=Student_Id;
    this.Flag_Followup=1;
    this.Flag_Student=0;
    this.Student_Followup_.Next_FollowUp_Date=new Date();
    this.Student_Followup_.Next_FollowUp_Date = this.New_Date(this.Student_Followup_.Next_FollowUp_Date);
    this.Document_View_Option=false;
}
Get_Last_Followup()
{
        this.issLoading = true;
    this.Student_Service_.Get_Last_Followup( this.Login_User).subscribe(Rows => {
        
         
        this.Student_Followup_Data=Rows[0];
        if(this.Student_Followup_Data.length>0)
        {
            this.issLoading = false;
            this.Student_Followup_=this.Student_Followup_Data[0];

            this.Followup_Status_Temp.FollowUp = this.Student_Followup_.FollowUp;

            this.Followup_Status_Temp.Status_Id = this.Student_Followup_.Status;
            this.Followup_Status_Temp.Status_Name = this.Student_Followup_.Status_Name;
            this.Followup_Status_ = this.Followup_Status_Temp;

            this.Followup_Users_Temp.Users_Id = this.Student_Followup_.To_User_Id;
            this.Followup_Users_Temp.Users_Name = this.Student_Followup_.To_User_Name;
            this.Followup_Users_ = this.Followup_Users_Temp;
            
            this.To_User_Change(this.Followup_Users_);


            if (this.Student_Followup_.FollowUp == true)
                this.Next_FollowUp_Date_Visible = false;
            else
                this.Next_FollowUp_Date_Visible = true;

            this.Student_Followup_.Next_FollowUp_Date = new Date();
            this.Student_Followup_.Next_FollowUp_Date = this.New_Date(this.Student_Followup_.Next_FollowUp_Date);


            this.Student_Followup_.Remark="";
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
    
    this.Student_Service_.Get_FollowUp_Details(this.Student_Id).subscribe(Rows => {
        
        
        this.issLoading = false; 
        this.Student_Followup_=Rows[0].FollowUp[0];
        if (this.Student_Followup_ != null && this.Student_Followup_!=undefined)
         {

            this.Followup_Status_Temp.FollowUp = this.Student_Followup_.FollowUp;

             this.Followup_Status_Temp.Status_Id = this.Student_Followup_.Status;
             this.Followup_Status_Temp.Status_Name = this.Student_Followup_.Status_Name;
             this.Followup_Status_ = Object.assign({}, this.Followup_Status_Temp);

             this.Followup_Users_Temp.Users_Id = this.Student_Followup_.To_User_Id;
            this.Followup_Users_Temp.Users_Name = this.Student_Followup_.To_User_Name;
            this.Followup_Users_ = Object.assign({}, this.Followup_Users_Temp);

            this.Student_Followup_.Remark="";
            
            if(this.Student_Followup_.FollowUp==true)
            {
                this.Next_FollowUp_Date_Visible=false;
            }
            else
                this.Next_FollowUp_Date_Visible=true;

             this.Student_Followup_.Next_FollowUp_Date=new Date();
             this.Student_Followup_.Next_FollowUp_Date = this.New_Date(this.Student_Followup_.Next_FollowUp_Date);
        }
         },
       
         Rows => {
              this.issLoading = false;
       const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
  
}
Followup_History()
{
     this.Student_Id=this.Student_Data[this.Student_EditIndex].Student_Id;
    if(this.Show_Followup_History==true)
    {
        this.Show_Followup_History = false;
        this.issLoading = true;

        this.Student_Service_.Followup_History(this.Student_Id).subscribe(Rows =>
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
View_Student_Click_()
{
    let top = document.getElementById('Topdiv');
    if (top !== null) {
    top.scrollIntoView();
    top = null;
    }
    this.Mark_tab_View=false;
    this.View_History_=true;
    this.Document_View_Option=false;
    // this.Show_FollowUp=true;
    this.Show_Followup_History=true;
    
    this.Edit_Student(this.Student_Data[this.Student_EditIndex],this.Student_EditIndex);
    // this.Edit_Student(this.Student_Data[0], this.Student_EditIndex);
}
Edit_Student(Student_e:any,index)
{    
     this.Clr_Student();
    this.Student_EditIndex = index
    this.Flag_Followup = 0;
    this.Flag_Student = 1;
    this.Student_Followup_.Remark = "";
    this.Student_Id = Student_e.Student_Id;
    this.Student_Id_Edit = Student_e.Student_Id;  
    // this.SKP_Name = Student_e.Agent_Name;
    this.Course_Tab=false;
    this.View_Student_=true;
    this.View_Follow_=false;  
    this.Entry_View=true;
    this.profile_View=true;
    this.button_view = true;
    this.Receipt_History_View=false;
    this.tab_view=true;
    this.Course_View=false;
    this.View_History_=false;;
    this.Show_FollowUp = true;
    this.Certificate_View=false;
    this.Fees_View = false;
    this.Activity_Details_View=false;
    this.Mark_View = false;
    this.Activity_View=false;
    this.Course_Click_Status=false;
    this.Fees_Click_Status=false;
    this.Mark_Click_Status=false;
    this.View_Follow_=false; 
    // this.Mark_tab_View=true;
    // this.Save_Agent_.Client_Accounts_Name=Student_e.Client_Accounts_Name;
    // this.Save_Agent_.Client_Accounts_Id=Student_e.Agent_Id;   
    //  if(this.Document_View_Status==true)
     this.Document_View_Option=true; 

    this.issLoading = true;
    this.Student_Service_.Get_Student(Student_e.Student_Id).subscribe(Rows =>{
         
    this.Student_= Object.assign({},Rows[0][0]);
    debugger
    this.CenterName= this.Student_.Center_Name;
    this.DistrictName= this.Student_.District_Name;
    this.CenterCode= this.Student_.Center_Code;

    this.ImageFile_Photo_view=environment.FilePath+'/uploads/'+this.Student_.Photo
    debugger;
    this.Registration=this.Student_.Registered;
    this.Remove_Registration_Visibility=false
    this.Registration_Visiblility=false

    this.Display_Photo_=this.Student_.Photo;
    this.Display_Aadhaar_=this.Student_.Aadhaar;
     
    this.Display_Aadhaar_Back_=this.Student_.Aadhaar_Back;
    this.Display_SSLC_Certificate_=this.Student_.SSLC_Certificate;
    this.Display_Plustwo_Certificate_=this.Student_.Plustwo_Certificate;

    this.Document_Array= Rows[1];
    // if(this.Document_Array.length==0)
    //     this.Document_Array=[];
    this.Document_File_Array=[];
    for(var i=0;i<this.Document_Array.length;i++)
    this.Document_File_Array.push('')

    if (this.Student_.Registered==true)
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
   
    if(this.Student_.Registration_No!=null){
    this.Registrtion_No_Barcode=this.Student_.Registration_No.toString();
         this.Registrtion_No_Barcode.split('\n');
    }
        for (var i = 0; i < this.Gender_Data.length; i++)
        {
        if (this.Student_.Gender == this.Gender_Data[i].Gender_Id)
        this.Gender_=this.Gender_Data[i];
        } 

        debugger

        for (var i = 0; i < this.SKP_Data.length; i++)
        {
        if (this.Student_.Agent_Id == this.SKP_Data[i].Agent_Id)
        this.SKP_=this.SKP_Data[i];
        } 

        for (var i = 0; i < this.SKP_Status_Data.length; i++)
        {
        if (this.Student_.SKP_Status_Id == this.SKP_Status_Data[i].Status_Id)
        this.SKP_Status_=this.SKP_Status_Data[i];
        } 


    this.issLoading = false;
    } ,
    Rows => {
    this.issLoading = false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
}
Clr_Student_Course()
{
    this.Student_Course_.Student_Course_Id=0;
    this.Student_Course_.Student_Id=0;
    this.Student_Course_.Entry_Date = new Date;
    this.Student_Course_.Entry_Date = this.New_Date(this.Student_Course_.Entry_Date);
    this.Student_Course_.Course_Name_Details="";
    this.Student_Course_.Agent_Amount=0;
     this.Student_Course_.Course_Type_Id=0;
     this.Student_Course_.Course_Type_Name = "";
     this.Student_Course_.Duration_Type_Id=0;
     this.Student_Course_.Duration_Type_Name = "";
    //  this.Student_Course_.Duration=0;
    this.Student_Course_.Start_Date = new Date;
    this.Student_Course_.Start_Date = this.New_Date(this.Student_Course_.Start_Date);
    this.Student_Course_.End_Date = new Date;
    this.Student_Course_.End_Date = this.New_Date(this.Student_Course_.End_Date);
    this.Student_Course_.Join_Date = new Date;
    this.Student_Course_.Join_Date = this.New_Date(this.Student_Course_.Join_Date);
    this.Student_Course_.Certificate_Date = new Date;
    this.Student_Course_.Certificate_Date = this.New_Date(this.Student_Course_.Certificate_Date);
    this.Student_Course_.Certificate_Grade="";
    this.Student_Course_.By_User_Id=0;
    this.Student_Course_.Status=0;
    this.Course_=null;

    this.Student_Fees_Installment_Master_Data=[];
    this.Student_Course_Subject_Data=[];
    this.Student_Course_Part_Data=[];
    this.Student_Fees_Type_Data = [];
    this.Fees_Type_Search_ = null

    // if (this.University_Data != undefined && this.University_Data != null)
    // this.University_ = this.University_Data[0];
    this.Course_DurationView=''
    this.University_=null;

    if (this.Starting_Month_Data != undefined && this.Starting_Month_Data != null)
    this.Starting_Month_ = this.Starting_Month_Data[0];
    
    if (this.Month_Status_Data != undefined && this.Month_Status_Data != null)
    this.Ending_Month_ = this.Month_Status_Data[0];

    if (this.Exam_Month_Data != undefined && this.Exam_Month_Data != null)
        this.Exam_Month_ = this.Exam_Month_Data[0];

        if (this.Course_Duration_Data != undefined && this.Course_Duration_Data != null)
        this.Course_Duration_ = this.Course_Duration_Data[0];
    
    this.Student_Course_.Ending_Year=null;
    this.Start_Year_Data=[];
    if (this.Start_Year_Data != undefined && this.Start_Year_Data != null)
    this.Starting_Year_ = this.Start_Year_Data[0];
}
University_Change()
{
    this.Course_ = null;
    this.Course_Data = [];
    this.Course_DurationView = null;
    // this.Student_Course_.Student_Cousrse_Id=0;
    this.Student_Course_.Student_Id=0;
    this.Student_Course_.Entry_Date = new Date;
    this.Student_Course_.Entry_Date = this.New_Date(this.Student_Course_.Entry_Date);
    this.Student_Course_.Course_Name_Details="";
    this.Student_Course_.Agent_Amount=0;
    this.Student_Course_.Course_Type_Id=0;
    this.Student_Course_.Fees_Type_Id=0;
    this.Student_Course_.Course_Type_Name = "";
    this.Student_Course_.Duration = 0;
    this.Student_Course_.Duration_Type_Id = 0;
    this.Student_Course_.Duration_Type_Name = "";

    
    this.Student_Course_.Start_Date = new Date;
    this.Student_Course_.Start_Date = this.New_Date(this.Student_Course_.Start_Date);
    this.Student_Course_.End_Date = new Date;
    this.Student_Course_.End_Date = this.New_Date(this.Student_Course_.End_Date);
    this.Student_Course_.Join_Date = new Date;
    this.Student_Course_.Join_Date = this.New_Date(this.Student_Course_.Join_Date);
    this.Student_Course_.By_User_Id=0;
    this.Student_Course_.Status=0;
    this.Student_Fees_Installment_Master_Data = null;
    this.Student_Course_Subject_Data = []
    this.Student_Course_Part_Data=[];
    this.Student_Fees_Type_Data=[];
    if(this.Course_Duration_Data!=null && this.Course_Duration_Data != undefined)
        this.Course_Duration_=this.Course_Duration_Data[0];

     // this.Student_Course_.Duration=0;
}
Get_University_Changes(University_Id)
{
    this.Start_Year_Data=[];
    this.issLoading = true;
    this.University_1 = University_Id;
    this.Student_Service_.Get_University_Changes(University_Id).subscribe(Rows => {
    
            this.Starting_Month_Data = Rows[0];
            this.Starting_Month_Temp.Month_Status_Id = 0;
            this.Starting_Month_Temp.Month_Status_Name = "All";
            this.Starting_Month_Data.unshift(this.Starting_Month_Temp);
            this.Starting_Month_ = this.Starting_Month_Data[0];
            
                // this.Start_date =this.New_Date( this.Student_Course_.Start_Date);
                // var endyear = this.Student_Course_.Starting_Year;
                // this.end_year_of = new Date(endyear);
                // this.end_year_of.setMonth(this.end_year_of.getFullYear()+this.Student_Course_.Duration);
                //  var dt= this.get_Year(this.end_year_of);
                
               // this.End_Year_Change();
            //     var Start_T= this.get_Year(this.Student_Course_.Ending_Year); 
           // this.Student_Course_.Ending_Year =Number(new Date(this.Student_Course_.Ending_Year+ this.Student_Course_.Duration)); 
                
                var fyear = Rows[1][0].Starting_Year
                var st_date 
                st_date = this.get_Year(new Date(moment(new Date()).format('YYYY-MM-DD')));                
              
                var j=1;
                this.Start_Year_Data=[];
                this.Start_Year_Data.push({'Year_Name':"Select",'Year_Id':0} ) 
                if(Rows[1][0].Back_Status==true){
                    for (var k = fyear; k <= st_date; k++) 
                    {      
                        j++
                        this.Start_Year_Data.push({'Year_Name':k,'Year_Id':j} )   
                    }
                }
                else
                {                    
                    this.Start_Year_Data.push({'Year_Name':st_date} ) 
                }
                
                
            
            this.issLoading = false;
    },
        Rows => {
            this.issLoading = false;
        });
}
Get_Year_Changes()
{
     
    if(this.Fees_Type_Search_== undefined || this.Fees_Type_Search_== null)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Select Fees Type',Type:"3"}});
        return
    }
    
    if(this.Student_Course_.Duration_Type_Id==1)
    {
    //     day=day+this.Student_Course_.Duration
    // this.Student_Course_.End_Date = new Date(year,month,day);

    }
    else if(this.Student_Course_.Duration_Type_Id==2)
    {
        var tempmonth=this.Starting_Month_.Month_Status_Id+this.Student_Course_.Duration;
        if(tempmonth>12 )
        {
            this.Student_Course_.Ending_Year=Number( this.Starting_Year_.Year_Name) + 1;
            tempmonth=tempmonth-12;
        }
        else
         this.Student_Course_.Ending_Year=Number( this.Starting_Year_.Year_Name);
        for(var i=0;i<this.Month_Status_Data.length;i++)
        {
             
                this.Ending_Month_=this.Month_Status_Data[tempmonth];
        }
       
        
        
    }
    else if(this.Student_Course_.Duration_Type_Id==3)
    {
        this.Student_Course_.Ending_Year=Number( this.Starting_Year_.Year_Name) + this.Student_Course_.Duration;
    
    }
     
    //this.Start_Year_Data=[];
    this.issLoading = true;


    this.Student_Service_.Get_Year_Changes(this.Course_.Course_Id,this.Student_Course_.Ending_Year,this.Fees_Type_Search_.Fees_Type_Id).subscribe(Rows => {
   
    this.Student_Fees_Installment_Master_Data = Rows[0];  
      
    for (var i = 0; i < this.Student_Fees_Installment_Master_Data.length;i++)
    {
        
        this.date_Temp=this.Student_Course_.Start_Date;
        this.Student_Fees_Installment_Master_Data[i].Student_Fees_Installment_Details=[]
        for (var j = 0; j < this.Student_Fees_Installment_Master_Data[i].No_Of_Instalment; j++)
        {
       
            this.Student_Fees_Installment_Details_ = new Student_Fees_Installment_Details()
            this.Student_Fees_Installment_Details_.Fees_Amount=this.Student_Fees_Installment_Master_Data[i].Amount/parseInt(this.Student_Fees_Installment_Master_Data[i].No_Of_Instalment.toString());
           
           this.Student_Fees_Installment_Details_.Fees_Amount=Number( this.Student_Fees_Installment_Details_.Fees_Amount.toFixed(2))
           this.Student_Fees_Installment_Details_.Instalment_Date=this.date_Temp;  
            var Start_Temp =  new Date(moment(this.date_Temp).format('YYYY-MM-DD'));

            var year = Start_Temp.getFullYear();
            var month = Start_Temp.getMonth();
            var day = Start_Temp.getDate();            
            if(this.Student_Fees_Installment_Master_Data[i].Instalment_Type_Id==1)
            {
                day=day+parseInt(this.Student_Fees_Installment_Master_Data[i].Instalment_Period.toString())
            this.date_Temp = new Date(year,month,day);
            }
            else if(this.Student_Fees_Installment_Master_Data[i].Instalment_Type_Id==2)
            {
                this.date_Temp = new Date(year,month +parseInt(this.Student_Fees_Installment_Master_Data[i].Instalment_Period.toString()),day);
            }
            else if(this.Student_Fees_Installment_Master_Data[i].Instalment_Type_Id==3)
            {
                this.date_Temp = new Date(year +parseInt(this.Student_Fees_Installment_Master_Data[i].Instalment_Period.toString()),month,day);
            }            
            this.date_Temp = this.New_Date((new Date(moment(this.date_Temp).format('YYYY-MM-DD'))));            
            this.Student_Fees_Installment_Master_Data[i].Student_Fees_Installment_Details.push(Object.assign({}, this.Student_Fees_Installment_Details_));
        }
    }                    
            this.issLoading = false;
    },
        Rows => {
            this.issLoading = false;
        });
}
Search_Course_Typeahead(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = undefined;
    else
        Value = event.target.value;
        
    if (this.University_.University_Id == 0 || this.University_.University_Id == null || this.University_.University_Id==undefined)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select University', Type: "3" } });
        return
    }

    if (this.Course_Duration_.Course_Duration_Id == 0 || this.Course_Duration_.Course_Duration_Id == null || this.Course_Duration_.Course_Duration_Id==undefined)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Please Select Duration', Type: "3" } });
        return
    }

    // if (this.University_.University_Id == 0 || this.University_.University_Id == null || this.University_.University_Id==undefined)
    // {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select University', Type: "3" } });
    //     return
    // }
    {
        this.issLoading = true;
     
        this.Student_Service_.Search_Course_Typeahead_University('',this.University_.University_Id,this.Course_Duration_.Course_Duration_Name).subscribe(Rows => {
            
    if (Rows != null) 
    {
        this.Course_Data = Rows[0];
        this.issLoading = false;
    }
    },
    Rows => {
     this.issLoading = false;
    });
    } 
}
display_Course(Course_: Course)
{     
    if (Course_) { return Course_.Course_Name; }
}
Course_Change()
{
    this.Student_Fees_Installment_Master_Data =[]
    this.Student_Fees_Installment_Details_Data =[]
}
Get_Course_Student(Course_Id)
{
    
    // this.Student_Course_.Entry_Date = new Date;
    // this.Student_Course_.Entry_Date = this.New_Date(this.Student_Course_.Entry_Date);
    // this.Student_Course_.Start_Date = new Date;
    // this.Student_Course_.Start_Date = this.New_Date(this.Student_Course_.Start_Date);
    // this.Student_Course_.End_Date = new Date;
    // this.Student_Course_.End_Date = this.New_Date(this.Student_Course_.End_Date);
    // this.Student_Course_.Join_Date = new Date;
    // this.Student_Course_.Join_Date = this.New_Date(this.Student_Course_.Join_Date);
    this.issLoading = true;
    //console.log(this.University_1)
     
    this.Student_Service_.Get_Course_Student(Course_Id,this.University_.University_Id).subscribe(Rows => {
         
        this.Student_Course_Data = Rows[0];
        this.Exam_Month_Data= Rows[4];
        this.Exam_Month_Data_Temp.Month_Status_Id = 0;
        this.Exam_Month_Data_Temp.Month_Status_Name = "All";
        this.Exam_Month_Data.unshift(this.Exam_Month_Data_Temp);
        this.Exam_Month_ = this.Exam_Month_Data[0];

        // this.Student_Course_.Agent_Amount = this.Student_Course_Data[0].Agent_Amount;
        // this.Student_Course_.Total_Fees = this.Student_Course_Data[0].Total_Fees;
    //    this.Fees_Type_Search_.Fees_Type_Id = this.Student_Course_Data[0].Course_Type_Id;
    //    this.Fees_Type_Search_.Fees_Type_Name  = this.Student_Course_Data[0].Course_Type_Name;
        this.Student_Course_.Duration = this.Student_Course_Data[0].Duration;
        this.Student_Course_.Duration_Type_Id = this.Student_Course_Data[0].Duration_Type_Id;
        this.Student_Course_.Duration_Type_Name = this.Student_Course_Data[0].Duration_Type_Name;
        this.Course_DurationView=this.Student_Course_.Duration + ' ' + this.Student_Course_.Duration_Type_Name
        
        // this.Student_Course_.Entry_Date = this.Student_Course_Data[0].Entry_Date;
        //  this.Student_Course_.Start_Date = this.Student_Course_Data[0].Start_Date;
        // this.Student_Course_.End_Date = this.Student_Course_Data[0].End_Date;
        // this.Student_Course_.Join_Date = this.Student_Course_Data[0].Join_Date;
        
        // if(this.Student_Course_.Entry_Date==null||this.Student_Course_.Entry_Date==undefined)
        //   {                
        //     this.Student_Course_.Entry_Date = new Date;
        //     this.Student_Course_.Entry_Date = this.New_Date(this.Student_Course_.Entry_Date);
        //   }
        //   if(this.Student_Course_.Start_Date==null||this.Student_Course_.Start_Date==undefined)
        //   {                
        //     this.Student_Course_.Start_Date = new Date;
        //     this.Student_Course_.Start_Date = this.New_Date(this.Student_Course_.Start_Date);
        //   }
        //   if(this.Student_Course_.End_Date==null||this.Student_Course_.End_Date==undefined)
        //   { 
                 
        //     this.Student_Course_.End_Date = new Date;
        //     this.Student_Course_.End_Date = this.New_Date(this.Student_Course_.End_Date);
        //   }
        //   if(this.Student_Course_.Join_Date==null||this.Student_Course_.Join_Date==undefined)
        //   {                
        //     this.Student_Course_.Join_Date = new Date;
        //     this.Student_Course_.Join_Date = this.New_Date(this.Student_Course_.Join_Date);
        //   }
        
        this.Student_Course_Subject_Data = Rows[1];
         
        this.Student_Course_Part_Data=Rows[2]
        this.Student_Fees_Type_Data=Rows[3]

        this.date_Temp=this.Student_Course_.Start_Date;
       
        
         this.Start_Date_Change();
         //this.Load_Month_Status_for_Part();
        //this.Student_Course_.Start_Date = this.New_Date(this.Student_Course_.Start_Date);

        // this.Student_Fees_Installment_Master_Data = Rows[2];

    //    this.Student_Fees_Installment_Master_Data = Rows[2]; feesinstallment

        // this.Student_Fees_Installment_Master_Data=this.Student_Fees_Installment_Master_Data_Temp
        // for (var i = 0; i < this.Student_Fees_Installment_Master_Data.length;i++)
        // {
            
        //     this.date_Temp=this.Student_Course_.Start_Date;
        //     this.Student_Fees_Installment_Master_Data[i].Student_Fees_Installment_Details=[]
        //     for (var j = 0; j < this.Student_Fees_Installment_Master_Data[i].No_Of_Instalment; j++)
        //     {
            
        //     //    var A=this.date_Temp.getDate();
        //        //this.date_Temp.setDate( A + this.Student_Fees_Installment_Master_Data[i].Instalment_Period );
        //          this.Student_Fees_Installment_Details_ = new Student_Fees_Installment_Details()
        //         this.Student_Fees_Installment_Details_.Fees_Amount=this.Student_Fees_Installment_Master_Data[i].Amount/parseInt(this.Student_Fees_Installment_Master_Data[i].No_Of_Instalment.toString());
        //        // this.Student_Fees_Installment_Details_.Instalment_Date=this.New_Date(this.date_Temp);  
        //        this.Student_Fees_Installment_Details_.Fees_Amount=Number( this.Student_Fees_Installment_Details_.Fees_Amount.toFixed(2))
        //        this.Student_Fees_Installment_Details_.Instalment_Date=this.date_Temp;  
    
        //         var Start_Temp =  new Date(moment(this.date_Temp).format('YYYY-MM-DD'));
    
        //         var year = Start_Temp.getFullYear();
        //         var month = Start_Temp.getMonth();
        //         var day = Start_Temp.getDate();
                
        //         if(this.Student_Fees_Installment_Master_Data[i].Instalment_Type_Id==1)
        //         {
        //             day=day+parseInt(this.Student_Fees_Installment_Master_Data[i].Instalment_Period.toString())
        //         this.date_Temp = new Date(year,month,day);
        //         }
        //         else if(this.Student_Fees_Installment_Master_Data[i].Instalment_Type_Id==2)
        //         {
        //             this.date_Temp = new Date(year,month +parseInt(this.Student_Fees_Installment_Master_Data[i].Instalment_Period.toString()),day);
        //         }
        //         else if(this.Student_Fees_Installment_Master_Data[i].Instalment_Type_Id==3)
        //         {
        //             this.date_Temp = new Date(year +parseInt(this.Student_Fees_Installment_Master_Data[i].Instalment_Period.toString()),month,day);
        //         }
                
        //         this.date_Temp = this.New_Date((new Date(moment(this.date_Temp).format('YYYY-MM-DD'))));
                
    
        //         //this.date_Temp=this.Add_Date(new Date(moment(this.date_Temp).format('YYYY-MM-DD')),parseInt( this.Student_Fees_Installment_Master_Data[i].Instalment_Period.toString()) ) 
              
        //         // this.Student_Fees_Installment_Details_.Instalment_Date=new Date();
        //         // this.Student_Fees_Installment_Details_.Instalment_Date=this.New_Date(this.date_Temp);
        //         this.Student_Fees_Installment_Master_Data[i].Student_Fees_Installment_Details.push(Object.assign({}, this.Student_Fees_Installment_Details_));
        //     }
        // }
        this.issLoading = false;
    },
        Rows => {
            this.issLoading = false;
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
        });
}

// End_Date_Change()
// {
      
//     var Start_Temp =  new Date(moment(this.Student_Course_.Start_Date).format('YYYY-MM-DD'));
 
//     var year = Start_Temp.getFullYear();
//     var month = Start_Temp.getMonth();
//     var day = Start_Temp.getDate();
    
//     if(this.Student_Course_.Duration_Type_Id==1)
//     {
//         day=day+this.Student_Course_.Duration
//     this.Student_Course_.End_Date = new Date(year,month,day);
//     }
//     else if(this.Student_Course_.Duration_Type_Id==2)
//     {
//     this.Student_Course_.End_Date = new Date(year,month + this.Student_Course_.Duration,day);
//     }
//     else if(this.Student_Course_.Duration_Type_Id==3)
//     {
//     this.Student_Course_.End_Date = new Date(year +this.Student_Course_.Duration,month,day);
//     }
    
//     this.Student_Course_.End_Date  = this.New_Date((new Date(moment(this.Student_Course_.End_Date).format('YYYY-MM-DD'))));
//     this.Fill_Years();
    
// }
set_fees_Date()
{
    
    //this.Student_Fees_Installment_Master_Data=this.Student_Fees_Installment_Master_Data_Temp
    for (var i = 0; i < this.Student_Fees_Installment_Master_Data.length;i++)
    {
        
        this.date_Temp=this.Student_Course_.Start_Date;
        //this.Student_Fees_Installment_Master_Data[i].Student_Fees_Installment_Details=[]
        for (var j = 0; j < this.Student_Fees_Installment_Master_Data[i].No_Of_Instalment; j++)
        {
        
        //    var A=this.date_Temp.getDate();
           //this.date_Temp.setDate( A + this.Student_Fees_Installment_Master_Data[i].Instalment_Period );
            // this.Student_Fees_Installment_Details_ = new Student_Fees_Installment_Details()
            //this.Student_Fees_Installment_Details_.Fees_Amount=this.Student_Fees_Installment_Master_Data[i].Amount/parseInt(this.Student_Fees_Installment_Master_Data[i].No_Of_Instalment.toString());
           // this.Student_Fees_Installment_Details_.Instalment_Date=this.New_Date(this.date_Temp);  
          // this.Student_Fees_Installment_Details_.Fees_Amount=Number( this.Student_Fees_Installment_Details_.Fees_Amount.toFixed(2))
           //this.Student_Fees_Installment_Details_.Instalment_Date=this.date_Temp;  

            var Start_Temp =  new Date(moment(this.date_Temp).format('YYYY-MM-DD'));
            this.Student_Fees_Installment_Master_Data[i].Student_Fees_Installment_Details[j].Instalment_Date=this.date_Temp
            var year = Start_Temp.getFullYear();
            var month = Start_Temp.getMonth();
            var day = Start_Temp.getDate();
            
            if(this.Student_Fees_Installment_Master_Data[i].Instalment_Type_Id==1)
            {
                day=day+parseInt(this.Student_Fees_Installment_Master_Data[i].Instalment_Period.toString())
            this.date_Temp = new Date(year,month,day);
            }
            else if(this.Student_Fees_Installment_Master_Data[i].Instalment_Type_Id==2)
            {
                this.date_Temp = new Date(year,month +parseInt(this.Student_Fees_Installment_Master_Data[i].Instalment_Period.toString()),day);
            }
            else if(this.Student_Fees_Installment_Master_Data[i].Instalment_Type_Id==3)
            {
                this.date_Temp = new Date(year +parseInt(this.Student_Fees_Installment_Master_Data[i].Instalment_Period.toString()),month,day);
            }
            
            this.date_Temp = this.New_Date((new Date(moment(this.date_Temp).format('YYYY-MM-DD'))));
            

            //this.date_Temp=this.Add_Date(new Date(moment(this.date_Temp).format('YYYY-MM-DD')),parseInt( this.Student_Fees_Installment_Master_Data[i].Instalment_Period.toString()) ) 
          
            // this.Student_Fees_Installment_Details_.Instalment_Date=new Date();
            // this.Student_Fees_Installment_Details_.Instalment_Date=this.New_Date(this.date_Temp);
           
        }
    }
}
Start_Date_Change_html()
{
    this.Start_Date_Change()
    this.set_fees_Date();
}
Start_Date_Change()
{
      
    var Start_Temp =  new Date(moment(this.Student_Course_.Start_Date).format('YYYY-MM-DD'));
 
    var year = Start_Temp.getFullYear();
    var month = Start_Temp.getMonth();
    var day = Start_Temp.getDate();
    
    if(this.Student_Course_.Duration_Type_Id==1)
    {
        day=day+this.Student_Course_.Duration
    this.Student_Course_.End_Date = new Date(year,month,day);

    }
    else if(this.Student_Course_.Duration_Type_Id==2)
    {
    this.Student_Course_.End_Date = new Date(year,month + this.Student_Course_.Duration,day);
    }
    else if(this.Student_Course_.Duration_Type_Id==3)
    {
    this.Student_Course_.End_Date = new Date(year +this.Student_Course_.Duration,month,day);
    }
    
    this.Student_Course_.End_Date  = this.New_Date((new Date(moment(this.Student_Course_.End_Date).format('YYYY-MM-DD'))));
    this.Fill_Years();
    
}
// End_Year_Change()
// {
   
//     var Start_Temp = this.get_Year(this.Student_Course_.Ending_Year);
   
//     var year = Start_Temp.getFullYear();
//     var month = Start_Temp.getMonth();
//     var day = Start_Temp.getDate();
    
//     if(this.Student_Course_.Duration_Type_Id==1)
//     {
//         day=day+this.Student_Course_.Duration
//         this.Student_Course_.Ending_Year = Number(new Date(year));

//     }
//     else if(this.Student_Course_.Duration_Type_Id==2)
//     {
//         this.Student_Course_.Ending_Year = Number(new Date(year +  this.Student_Course_.Duration));
//     //this.Student_Course_.End_Date = new Date(year,month + this.Student_Course_.Duration,day);
//     }
//     else if(this.Student_Course_.Duration_Type_Id==3)
//     {
//         this.Student_Course_.Ending_Year = Number(new Date(year +  this.Student_Course_.Duration));
//     this.Student_Course_.End_Date = new Date(year +this.Student_Course_.Duration,month,day);
//     }
    
//     this.Student_Course_.Ending_Year  =this.get_Year(this.Student_Course_.Ending_Year);
 
   
    
// }
Fill_Years() 
{
    
    // this.Start_date =this.New_Date( this.Student_Course_.Start_Date);
    var fyear = this.get_Year(new Date(moment(this.Student_Course_.Start_Date).format('YYYY-MM-DD')));
    var st_date 
    st_date = this.get_Year(new Date(moment(this.Student_Course_.End_Date).format('YYYY-MM-DD')));
    
    var j=0;
    this.Years_Data=[];
    for (var k = fyear; k <= st_date; k++) 
    {      
        j++
        this.Years_Data.push({'Year_Name':k,'Year_Id':j} )   
    }
}
Add_Date(Date_,days)
{
        this.date=new Date(Date_);
        //this.date=new Date();
        
        this.date.setDate( this.date.getDate() + days );         
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
      
        return this.date;
}
// new?()
// {
    
//     this.Student_Fees_Installment_Master_Data = Rows[2];
//     for (var i = 0; i < this.Student_Fees_Installment_Master_Data.length;i++)
//     {
//         this.Student_Fees_Installment_Master_Temp=new Student_Fees_Installment_Master()
//         this.Student_Fees_Installment_Master_Temp.Course_Fees_Id=this.Student_Fees_Installment_Master_Data[i].Course_Fees_Id
//         this.Student_Fees_Installment_Master_Temp.Fees_Type_Id=this.Student_Fees_Installment_Master_Data[i].Fees_Type_Id
//         this.Student_Fees_Installment_Master_Temp.Student_Fees_Installment_Details=[]
//         this.Student_Fees_Installment_Master_Data.push(Object.assign({}, this.Student_Fees_Installment_Master_Temp));
//         this.date_Temp=this.Student_Course_.Start_Date;   
//         var course_amount 
//         for (var j = 0; j < this.Student_Fees_Installment_Master_Data[i].No_Of_Instalment; j++)
//         {
//             this.Student_Fees_Installment_Details_ = new Student_Fees_Installment_Details()
//             this.Student_Fees_Installment_Details_.Fees_Amount=
//             this.Student_Fees_Installment_Master_Data[i].Amount/this.Student_Fees_Installment_Master_Data[i].No_Of_Instalment;
//             this.Student_Fees_Installment_Details_.Fees_Amount = Number(this.Student_Fees_Installment_Details_.Fees_Amount.toFixed(2));
//            this.Student_Fees_Installment_Details_.Tax_Percentage = 18;

//            this.Student_Fees_Installment_Details_.Tax_Percentage = Number(this.Student_Fees_Installment_Details_.Tax_Percentage.toFixed(2));
//            this.Student_Fees_Installment_Details_.Instalment_Date=this.date_Temp;//this.New_Date(new Date(moment(this.date_Temp).format('YYYY-MM-DD')));  
     
//             // this.Student_Fees_Installment_Details_.Instalment_Date=new Date();
//             // this.Student_Fees_Installment_Details_.Instalment_Date=this.New_Date(this.date_Temp);
//             this.Student_Fees_Installment_Master_Data[0].Student_Fees_Installment_Details.push(Object.assign({}, this.Student_Fees_Installment_Details_));
//             // this.date_Temp=this.Add_Date(new Date(moment(this.date_Temp).format('YYYY-MM-DD')),this.Student_Course_.Duration) ;
//         }
//     }    

// }
Get_Student_Course(Student_Id)
{ 
   this.issLoading = true;
    this.Student_Service_.Get_Student_Course(Student_Id).subscribe(Rows => {
         
        this.Mark_tab_View=true;
        this.Student_Course_Data = Rows[0];    
        this.Student_Fees_Installment_Save_Data = Rows[2];
        this.Student_Course_Part_Data = Rows[3];
        this.Starting_Month_Data=Rows[4];
        this.Student_Fees_Type_Data=Rows[6];
        this.certificate_Data= Rows[7];
        if(this.certificate_Data.length!=0)
        {
            this.cert_st_year = Rows[7][0].st_Year;
            this.cert_end_year = Rows[7][0].En_Year; 
        }
        this.Exam_Month_Data=Rows[8];
        //var university_year=Rows[5];
        if(this.Student_Course_Data.length>0)
        {
          this.Student_Course_ = this.Student_Course_Data[0];
          this.Course_DurationView=this.Student_Course_.Duration + ' ' + this.Student_Course_.Duration_Type_Name
          this.Course_Temp.Course_Id=this.Student_Course_.Course_Id
          this.Course_Temp.Course_Name=this.Student_Course_.Course_Name         
          this.Course_=Object.assign(this.Course_Temp)
          
          this.University_Temp.University_Id=this.Student_Course_.University_Id
          this.University_Temp.University_Name=this.Student_Course_.University_Name
          this.University_=Object.assign(this.University_Temp)
          
          for (var i = 0; i < this.Course_Duration_Data.length; i++)
          {
           if (this.Student_Course_.Course_Duration_Id == this.Course_Duration_Data[i].Course_Duration_Id)
              this.Course_Duration_=this.Course_Duration_Data[i];        
          } 
        //     
        //   this.Fees_Type_Search_.Fees_Type_Id = this.Student_Course_.Course_Type_Id
        //   this.Fees_Type_Search_.Fees_Type_Name = this.Student_Course_.Course_Type_Name
         /// this.Fees_Type_Search_=Object.assign(this.Student_Fees_Type_Data)

           this.Course_Id_Edit=this.Student_Course_.Course_Id
           this.Student_Course_Id_Edit=this.Student_Course_.Student_Course_Id

        //    for (var i = 0; i < this.University_Data.length; i++)
        //    {
        //    if (this.Student_Course_.University_Id == this.University_Data[i].University_Id)
        //    this.University_=this.University_Data[i];
        //    } 
           
        for (var i = 0; i < this.Student_Fees_Type_Data.length; i++)
        {
         if (this.Student_Course_.Course_Type_Id == this.Student_Fees_Type_Data[i].Fees_Type_Id)
            this.Fees_Type_Search_=this.Student_Fees_Type_Data[i];        
        } 
       
        for (var i = 0; i < this.Starting_Month_Data.length; i++)
        {
        if (this.Student_Course_.Starting_Month == this.Starting_Month_Data[i].Month_Status_Id)
        this.Starting_Month_=this.Starting_Month_Data[i];
       
        } 
        this.monthstart_= this.Starting_Month_.Month_Status_Name;
           
           for (var i = 0; i < this.Month_Status_Data.length; i++)
           {
           if (this.Student_Course_.Ending_Month == this.Month_Status_Data[i].Month_Status_Id)
           this.Ending_Month_=this.Month_Status_Data[i];
         
           } 
           this.endmonth_ =  this.Ending_Month_.Month_Status_Name;
        
           this.Student_Course_Subject_Data= Rows[1];

           var fyear1 = Rows[5][0].Starting_Year
           var st1_date 
           st1_date = this.get_Year(new Date(moment(new Date()).format('YYYY-MM-DD')));
           
           var m=0;
           this.Start_Year_Data=[];
           //if(.Back_Status==true){
           for (var l = fyear1; l <= st1_date; l++) 
           {      
               m++
               this.Start_Year_Data.push({'Year_Name':l,'Year_Id':m} )   
           }
             for (var i = 0; i < this.Start_Year_Data.length; i++)
              {
              if (this.Student_Course_.Starting_Year == this.Start_Year_Data[i].Year_Name)
              this.Starting_Year_=this.Start_Year_Data[i];
            
              } 
                this.strtYear_ = this.Starting_Year_.Year_Name
        }  

        var Student_Fees_Installment_Master_Id =0
        var Student_Fees_Installment_Master_Id_temp =0
        var Student_Fees_Installment_Master_Index =-1
        this.Student_Fees_Installment_Master_Data=[];
        this.Student_Fees_Installment_Details_Data=[];
        

        var fyear = this.get_Year(new Date(moment(this.Student_Course_.Start_Date).format('YYYY-MM-DD')));
        var st_date 
        st_date = this.get_Year(new Date(moment(this.Student_Course_.End_Date).format('YYYY-MM-DD')));
        
        this.Years_Data=[];
        var j=0;
        for (var k = fyear; k <= st_date; k++) 
        {      
            j++
            this.Years_Data.push({'Year_Name':k,'Year_Id':j} )                          
        }  
        
        // for (var i = 0; i < this.Student_Course_Part_Data.length; i++)
        // {
        //    this.Exam_Month_Data_Temp=this.Student_Course_Part_Data[i].Month_Id

        //     //this.Month_Status_Temp=this.Month_Status_Data[this.Student_Course_Part_Data[i].Month_Id]
        //     this.Student_Course_Part_Data[i].Year = Object.assign(this.Years_Data[this.Student_Course_Part_Data[i].Year_Id-1])
        //    this.Student_Course_Part_Data[i].Month_Status = Object.assign(this.Exam_Month_Data[this.Student_Course_Part_Data[i].Month_Id])
        // } 
        for (var i = 0; i < this.Student_Course_Part_Data.length; i++)
        {
            for(var j=0;j<this.Exam_Month_Data.length;j++)
            {
                if(this.Exam_Month_Data[j].Month_Status_Id==this.Student_Course_Part_Data[i].Month_Id)
                {
                this.Exam_Month_Data_Temp=this.Exam_Month_Data[j]
                break;
                }
            }
            
           
            //this.Month_Status_Temp=this.Month_Status_Data[this.Student_Course_Part_Data[i].Month_Id]
            this.Student_Course_Part_Data[i].Year = Object.assign(this.Years_Data[this.Student_Course_Part_Data[i].Year_Id-1])
            this.Student_Course_Part_Data[i].Month_Status = Object.assign(this.Exam_Month_Data_Temp)
            
        } 
        
        if(this.Student_Course_Part_Data.length!=0)
        {
            this.Student_Course_Part_.Mark_List_Issue_Date=Rows[3][0].Mark_List_Issue_Date;
        }
        for(var i=0;i<this.Student_Fees_Installment_Save_Data.length;i++)
        {
            Student_Fees_Installment_Master_Id_temp= this.Student_Fees_Installment_Save_Data[i].Student_Fees_Installment_Master_Id
            if(Student_Fees_Installment_Master_Id!=Student_Fees_Installment_Master_Id_temp)
            {
                this.Student_Fees_Installment_Master_=new Student_Fees_Installment_Master()
                this.Student_Fees_Installment_Master_.Amount=this.Student_Fees_Installment_Save_Data[i].Amount
                this.Student_Fees_Installment_Master_.Student_Fees_Installment_Master_Id=this.Student_Fees_Installment_Save_Data[i].Student_Fees_Installment_Master_Id
                this.Student_Fees_Installment_Master_.Course_Fees_Id=this.Student_Fees_Installment_Save_Data[i].Course_Fees_Id
                this.Student_Fees_Installment_Master_.Fees_Type_Id=this.Student_Fees_Installment_Save_Data[i].Fees_Type_Id
                this.Student_Fees_Installment_Master_.Fees_Type_Name=this.Student_Fees_Installment_Save_Data[i].Fees_Type_Name
                this.Student_Fees_Installment_Master_.No_Of_Instalment=this.Student_Fees_Installment_Save_Data[i].No_Of_Instalment
                this.Student_Fees_Installment_Master_.Instalment_Period=this.Student_Fees_Installment_Save_Data[i].Instalment_Period
                this.Student_Fees_Installment_Master_.Instalment_Type_Id=this.Student_Fees_Installment_Save_Data[i].Instalment_Type_Id
                this.Student_Fees_Installment_Master_.Instalment_Type_Name=this.Student_Fees_Installment_Save_Data[i].Instalment_Type_Name
                this.Fees_Master_Id=this.Student_Fees_Installment_Master_.Student_Fees_Installment_Master_Id
                this.Student_Fees_Installment_Master_Data.push(Object.assign({},this.Student_Fees_Installment_Master_))
                Student_Fees_Installment_Master_Index=Student_Fees_Installment_Master_Index+1;
                this.Student_Fees_Installment_Master_Data[Student_Fees_Installment_Master_Index].Student_Fees_Installment_Details=this.Student_Fees_Installment_Details_Data;
                
                this.Student_Fees_Installment_Details_Data=[];
                this.Student_Fees_Installment_Details_Temp=new Student_Fees_Installment_Details();  
                this.Student_Fees_Installment_Details_Temp.Student_Fees_Installment_Details_Id=this.Student_Fees_Installment_Save_Data[i].Student_Fees_Installment_Details_Id
                this.Student_Fees_Installment_Details_Temp.Instalment_Date=this.Student_Fees_Installment_Save_Data[i].Instalment_Date
                this.Student_Fees_Installment_Details_Temp.Fees_Amount=this.Student_Fees_Installment_Save_Data[i].Fees_Amount
                this.Student_Fees_Installment_Details_Temp.Balance_Amount=this.Student_Fees_Installment_Save_Data[i].Balance_Amount
                this.Student_Fees_Installment_Details_Temp.Status=this.Student_Fees_Installment_Save_Data[i].Status

                 this.Student_Fees_Installment_Details_Data.push(Object.assign({},this.Student_Fees_Installment_Details_Temp))
                this.Student_Fees_Installment_Master_Data[Student_Fees_Installment_Master_Index].Student_Fees_Installment_Details=this.Student_Fees_Installment_Details_Data;
            }
            else
            {
                this.Student_Fees_Installment_Details_Temp=new Student_Fees_Installment_Details();
                this.Student_Fees_Installment_Details_Temp.Student_Fees_Installment_Details_Id=this.Student_Fees_Installment_Save_Data[i].Student_Fees_Installment_Details_Id
                this.Student_Fees_Installment_Details_Temp.Instalment_Date=this.Student_Fees_Installment_Save_Data[i].Instalment_Date
                this.Student_Fees_Installment_Details_Temp.Fees_Amount=this.Student_Fees_Installment_Save_Data[i].Fees_Amount
                this.Student_Fees_Installment_Details_Temp.Balance_Amount=this.Student_Fees_Installment_Save_Data[i].Balance_Amount
                this.Student_Fees_Installment_Details_Temp.Status=this.Student_Fees_Installment_Save_Data[i].Status
                this.Student_Fees_Installment_Details_Data.push(Object.assign({},this.Student_Fees_Installment_Details_Temp))
                this.Student_Fees_Installment_Master_Data[Student_Fees_Installment_Master_Index].Student_Fees_Installment_Details=this.Student_Fees_Installment_Details_Data;
            }
            Student_Fees_Installment_Master_Id= this.Student_Fees_Installment_Save_Data[i].Student_Fees_Installment_Master_Id
        }

        this.issLoading = false;
    },
        Rows => {
            this.issLoading = false;
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
        });
}
Course_Duration_Change()
{
    this.Course_ = null;
    this.Fees_Type_Search_=null;
    this.Course_Data = [];
    // this.Start_Year_Data=[];
    // this.Student_Fees_Installment_Master_Data =[]
    // this.Student_Fees_Installment_Details_Data =[]
    this.Student_Course_.Course_Type_Name = "";
    this.Student_Course_Subject_Data = []
    this.Student_Fees_Type_Data=[];
    this.Student_Course_Part_Data=[];
    // this.Student_Course_.Start_Date = new Date;
    // this.Student_Course_.Start_Date = this.New_Date(this.Student_Course_.Start_Date);
    // this.Student_Course_.End_Date = new Date;
    // this.Student_Course_.End_Date = this.New_Date(this.Student_Course_.End_Date);
    // this.Student_Course_.Join_Date = new Date;
    // this.Student_Course_.Join_Date = this.New_Date(this.Student_Course_.Join_Date);
}
Save_Student_Course()
{ 
    if (this.Course_Duration_ == undefined || this.Course_Duration_==null || this.Course_Duration_.Course_Duration_Id==0 || this.Course_Duration_.Course_Duration_Id==undefined)
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Select Duration',Type:"3"}});
    return;
    }
   
    if (this.Course_ == undefined || this.Course_==null)
        {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Select Course',Type:"3"}});
        return;
        }
    if (this.Course_.Course_Id == null || this.Course_.Course_Id == undefined || this.Course_.Course_Id ==0) {
        
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Select Course',Type:"3"}});
        return;
    }
    if (this.Starting_Month_ == undefined || this.Starting_Month_==null)
        {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Select Starting Month',Type:"3"}});
        return;
        }
    if (this.Starting_Month_.Month_Status_Id == null || this.Starting_Month_.Month_Status_Id == undefined || this.Starting_Month_.Month_Status_Id ==0) {
        
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Select Starting Month',Type:"3"}});
        return;
    }
    if (this.Ending_Month_ == undefined || this.Ending_Month_==null)
        {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Select Ending Month',Type:"3"}});
        return;
        }
    if (this.Ending_Month_.Month_Status_Id == null || this.Ending_Month_.Month_Status_Id == undefined || this.Ending_Month_.Month_Status_Id ==0) {
        
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Select Ending Month',Type:"3"}});
        return;
    }
    
    if (this.Starting_Year_ == undefined || this.Starting_Year_==null || this.Starting_Year_.Year_Id==0)
        {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Select Starting Year',Type:"3"}});
        return;
        }
    if (this.Starting_Year_.Year_Name == null || this.Starting_Year_.Year_Name == undefined ) {
        
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Select Starting Year',Type:"3"}});
        return;
    }
    debugger;
    for (var j = 0; j < this.Student_Course_Part_Data.length; j++) {
       
            if (this.Student_Course_Part_Data[j].Month_Status == undefined||this.Student_Course_Part_Data[j].Month_Status == null||this.Student_Course_Part_Data[j].Month_Status.Month_Status_Id == undefined||this.Student_Course_Part_Data[j].Month_Status.Month_Status_Id == 0)
            {
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Month', Type: "3" } });
                return
            }
            if (this.Student_Course_Part_Data[j].Year == undefined||this.Student_Course_Part_Data[j].Year == null||this.Student_Course_Part_Data[j].Year.Year_Id == undefined||this.Student_Course_Part_Data[j].Year.Year_Id == 0)
            {
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Year', Type: "3" } });
                return
            }
    }
    this.issLoading=true;
    var temp_Student_Fees_Installment_Master_Id=0;
    //  if(this.Student_Fees_Installment_Save_Data==undefined)
      this.Student_Fees_Installment_Save_Data=[];
      
      for(var i=0;i<Number(this.Student_Fees_Installment_Master_Data.length);i++)
      {
          this.Student_Fees_Installment_Save_Temp=new Student_Fees_Installment_Save();

          this.Student_Fees_Installment_Save_Temp.Student_Fees_Installment_Master_Id=i  
          this.Student_Fees_Installment_Save_Temp.Amount = this.Student_Fees_Installment_Master_Data[i].Amount;
          this.Student_Fees_Installment_Save_Temp.Course_Fees_Id = this.Student_Fees_Installment_Master_Data[i].Course_Fees_Id;
          this.Student_Fees_Installment_Save_Temp.Fees_Type_Id = this.Student_Fees_Installment_Master_Data[i].Fees_Type_Id;
          this.Student_Fees_Installment_Save_Temp.Fees_Type_Name = this.Student_Fees_Installment_Master_Data[i].Fees_Type_Name;
          this.Student_Fees_Installment_Save_Temp.No_Of_Instalment = this.Student_Fees_Installment_Master_Data[i].No_Of_Instalment;
          this.Student_Fees_Installment_Save_Temp.Instalment_Period = this.Student_Fees_Installment_Master_Data[i].Instalment_Period;
          this.Student_Fees_Installment_Save_Temp.Instalment_Type_Id = this.Student_Fees_Installment_Master_Data[i].Instalment_Type_Id;
          this.Student_Fees_Installment_Save_Temp.Instalment_Type_Name = this.Student_Fees_Installment_Master_Data[i].Instalment_Type_Name;
             
        //   this.Student_Fees_Installment_Save_Temp.Delivery_Date=this.New_Date(new Date(moment(this.Student_Fees_Installment_Master_Data[i].Delivery_Date).format('YYYY-MM-DD')));  
          this.Student_Fees_Installment_Save_Data.push(Object.assign({}, this.Student_Fees_Installment_Save_Temp))
          for(var j=0;j<Number(this.Student_Fees_Installment_Master_Data[i].Student_Fees_Installment_Details.length);j++)
          {
              this.Student_Fees_Installment_Save_Temp.Student_Fees_Installment_Master_Id=i
              this.Student_Fees_Installment_Save_Temp.Instalment_Date=this.New_Date(new Date(moment(this.Student_Fees_Installment_Master_Data[i].Student_Fees_Installment_Details[j].Instalment_Date).format('YYYY-MM-DD')));  
               this.Student_Fees_Installment_Save_Temp.Fees_Amount = this.Student_Fees_Installment_Master_Data[i].Student_Fees_Installment_Details[j].Fees_Amount
              this.Student_Fees_Installment_Save_Data.push(Object.assign({}, this.Student_Fees_Installment_Save_Temp))
          }
      }
     
      if(this.Student_Fees_Installment_Save_Data.length==0)
      {
          this.Student_Fees_Installment_Save_Temp=new Student_Fees_Installment_Save();
          this.Student_Fees_Installment_Save_Temp.Student_Fees_Installment_Master_Id=-1
          this.Student_Fees_Installment_Save_Data.push(Object.assign({}, this.Student_Fees_Installment_Save_Temp))
      }
      
  this.Student_Course_.Student_Fees_Installment_Save=this.Student_Fees_Installment_Save_Data;
  
    this.Student_Course_.Student_Id = this.Student_Id;
    this.Student_Course_.Course_Id = this.Course_.Course_Id;
    this.Student_Course_.Course_Name = this.Course_.Course_Name;
    this.Student_Course_.Course_Type_Id = this.Fees_Type_Search_.Fees_Type_Id;
    this.Student_Course_.Course_Type_Name = this.Fees_Type_Search_.Fees_Type_Name;
    this.Student_Course_.Duration = this.Course_.Duration;
    this.Student_Course_.Course_Duration_Id = this.Course_Duration_.Course_Duration_Id;
    this.Student_Course_.University_Id = this.University_.University_Id;
    this.Student_Course_.By_User_Id = Number(this.Login_User);
    
    this.Student_Course_.Student_Course_Subject = this.Student_Course_Subject_Data;
     
    
    this.Student_Course_.Starting_Year = Number(this.Starting_Year_.Year_Name);    
    //this.Student_Course_.Ending_Year = Number(this.Starting_Year_.Year_Name);      
    this.Student_Course_.Starting_Month = this.Starting_Month_.Month_Status_Id;      
    this.Student_Course_.Ending_Month = this.Ending_Month_.Month_Status_Id;    


    this.Student_Course_Part_Save=[];
    
    for(var i=0;i<this.Student_Course_Part_Data.length;i++)
    {
        
        //this.Student_Course_Part_Temp=this.Student_Course_Part_Data[i]
        this.Student_Course_Part_Data[i].Month_Id=this.Student_Course_Part_Data[i].Month_Status.Month_Status_Id
        this.Student_Course_Part_Data[i].Month_Name=this.Student_Course_Part_Data[i].Month_Status.Month_Status_Name
        this.Student_Course_Part_Data[i].Year_Id=this.Student_Course_Part_Data[i].Year.Year_Id
        this.Student_Course_Part_Data[i].Year_Name=this.Student_Course_Part_Data[i].Year.Year_Name
        //this.Student_Course_Part_Save.push(Object.assign({}, this.Student_Course_Part_Temp))
    }
    
    this.Student_Course_.Student_Course_Part = this.Student_Course_Part_Data;
    // this.Student_Course_.Student_Fees_Installment_Master = this.Student_Fees_Installment_Master_Data;
    this.issLoading=true;
    
    this.Student_Course_.Entry_Date = this.New_Date(new Date(moment(this.Student_Course_.Entry_Date).format('YYYY-MM-DD')));;
    this.Student_Course_.Start_Date = this.New_Date(new Date(moment(this.Student_Course_.Start_Date).format('YYYY-MM-DD')));;
    this.Student_Course_.Join_Date = this.New_Date(new Date(moment(this.Student_Course_.Join_Date).format('YYYY-MM-DD')));;
    this.Student_Course_.End_Date = this.New_Date(new Date(moment(this.Student_Course_.End_Date).format('YYYY-MM-DD')));;
   
    this.Student_Course_.Certificate_Date = this.New_Date(new Date(moment(this.Student_Course_.Certificate_Date).format('YYYY-MM-DD')));;
    

    if (this.Save_Call_Status == true)
        return;
    else
        this.Save_Call_Status = true;

    this.Student_Service_.Save_Student_Course(this.Student_Course_).subscribe(Save_status => {
         
          
    if (Number(Save_status[0].Student_Course_Id_)>0)
    {
        this.Student_Service_.Send_Course_Email(this.Student_.Email).subscribe(Rows => {
                
            this.issLoading=false;
            },
            Rows => 
            { 
                this.issLoading=false;
                const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
            });
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
        this.Get_Student_Course(this.Student_Id)
        this.Close_Click();
        this.Save_Call_Status = false;
        this.Course_Subject_Data=[];
    }
    else
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        this.Save_Call_Status = false;
    }
    this.issLoading=false;
    },
    Rows => { 
        this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:Rows.error.error,Type:"2"}});
        this.Save_Call_Status = false;
    });
}
Fees_Tab_Click(Fees_Type_Id,Fees_Installment:any,index)
{
    let top = document.getElementById('Topdiv');
    if (top !== null) {
    top.scrollIntoView();
    top = null;
    }
    this.profile_View=false;
    this.button_view = false;
    this.Course_View=false;
    this.Mark_View=false;
    this.Activity_View=false;
    this.Fees_View=true;
    this.Activity_Details_View=false;    
    this.Receipt_View=true;
    this.Receipt_Voucher_.Fees_Type_Id=Fees_Type_Id;
    this.Receipt_Voucher_.Student_Fees_Installment_Details_Id=Fees_Installment.Student_Fees_Installment_Details_Id;
    this.Receipt_Voucher_.Amount=Fees_Installment.Balance_Amount;
    // this.Receipt_Voucher_.Amount=Fees_Installment.Fees_Amount;
    this.Receipt_Voucher_.Date=Fees_Installment.Instalment_Date;
    this.Installment_Index=index;
    this.Get_Receipt_History();
}

// Search_Subject_Course_Typeahead(event: any)
// {     
//     var Value = "";
//     if (event.target.value == "")
//         Value = undefined;
//     else
//         Value = event.target.value;
//     if (this.Course_Subject_Data == undefined || this.Course_Subject_Data.length==0)
//     {
//         this.issLoading = true;
//         this.Student_Service_.Search_Subject_Course_Typeahead('',this.Course_Id_Edit).subscribe(Rows => {
//     if (Rows != null) 
//     {
//         this.Course_Subject_Data = Rows[0];
//         this.issLoading = false;
//     }
//     },
//     Rows => {
//      this.issLoading = false;
//     });
//     } 
// }
// display_Subject(Course_Subject: Course_Subject)
// {     
//     if (Course_Subject) { return Course_Subject.Subject_Name; }
// }
Part_Change()
{
    
    this.Part_Subject_Data = [];
    this.Mark_List_.Internal_Mark = null;
    this.Mark_List_.Maximum_Mark = null;
    this.Mark_List_.Minimum_Mark = null;
    this.Mark_List_.Mark_Obtained = null;
    this.Subject_ = null;
    this.Mark_List_.Mark_Obtained = null;
    this.Mark_List_.External_Mark = null;
    this.Mark_List_.Technical_Skill = null;
    this.Exam_Status_ = null;
    this.Month_Status_ = null;
        
    if (this.Exam_Status_Data != undefined && this.Exam_Status_Data != null)
    this.Exam_Status_ = this.Exam_Status_Data[0];

    if (this.Month_Status_Data != undefined && this.Month_Status_Data != null)
    this.Month_Status_ = this.Month_Status_Data[0];

    if (this.Exam_Month_Data != undefined && this.Exam_Month_Data != null)
        this.Exam_Month_ = this.Exam_Month_Data[0];

    // if (this.Years_Data != undefined && this.Years_Data != null)
    // this.Years_ = this.Years_Data[0];

}
Search_Part_Subject_Typeahead(event: any)
{     
    
    var Value = "";
    if (event.target.value == "")
        Value = undefined;
    else
        Value = event.target.value;
        
    if (this.Part_Subject_Data == undefined || this.Part_Subject_Data.length==0)
    {
    
        this.issLoading = true;
        this.Student_Service_.Search_Part_Subject_Typeahead(this.Student_Id_Edit,this.Course_Id_Edit,this.Mark_List_.Part_Id,'').subscribe(Rows => {
            
    if (Rows != null) 
    {
        this.Part_Subject_Data = Rows[0];
        this.issLoading = false;
    }
    },
    Rows => {
     this.issLoading = false;
    });
    } 
}
display_Part_Subject(Course_Subject: Course_Subject)
{     
    if (Course_Subject) { return Course_Subject.Subject_Name; }
}
Course_Subject_Click(Subject)
{
    // this.Mark_List_ = Subject
    this.Mark_List_.Minimum_Mark=Subject.Minimum_Mark;
    this.Mark_List_.Maximum_Mark=Subject.Maximum_Mark;
}

Load_Exam_Status()
{
    this.issLoading = true;
    this.Student_Service_.Load_Exam_Status().subscribe(Rows => {
        if (Rows != null) {
            this.Exam_Status_Data = Rows[0];
            this.Exam_Status_Temp.Exam_Status_Id = 0;
            this.Exam_Status_Temp.Exam_Status_Name = "Select";
            this.Exam_Status_Data.unshift(this.Exam_Status_Temp);
            // this.Mark_List_Data.Exam_Status_ = this.Exam_Status_Data[0];
            this.issLoading = false;
        }
    },
        Rows => {
            this.issLoading = false;
        });
}

Load_Month_Status()
{
    this.issLoading = true;
    this.Student_Service_.Load_Month_Status().subscribe(Rows => {
        if (Rows != null) {
            this.Month_Status_Data = Rows[0];
            this.Month_Status_Temp.Month_Status_Id = 0;
            this.Month_Status_Temp.Month_Status_Name = "All";
            this.Month_Status_Data.unshift(this.Month_Status_Temp);
            this.Month_Status_ = this.Month_Status_Data[0];
            this.issLoading = false;
            this.Ending_Month_= this.Month_Status_Data[0];
        }
    },
        Rows => {
            this.issLoading = false;
        });
}
// Load_Month_Status_for_Part()
// {
//     
//     this.issLoading = true;
//     this.Student_Service_.Load_Month_Status_for_Part(this.Student_Course_.University_Id).subscribe(Rows => {
//         
//         if (Rows != null) {
//             this.Exam_Month_Data= Rows[0];
//             this.Exam_Month_Data_Temp.Month_Status_Id = 0;
//             this.Exam_Month_Data_Temp.Month_Status_Name = "All";
//             this.Exam_Month_Data.unshift(this.Exam_Month_Data_Temp);
//             this.Exam_Month_ = this.Exam_Month_Data[0];
//             this.issLoading = false;
//             //this.Ending_Month_= this.Month_Status_Data[0];
//         }
//     },
//         Rows => {
//             this.issLoading = false;
//         });
// }


// Load_Years()
// {
//     this.issLoading = true;
//     this.Student_Service_.Load_Years().subscribe(Rows => {
//         if (Rows != null) {
//             this.Years_Data = Rows[0];
//             this.Years_Temp.Year_Id = 0;
//             this.Years_Temp.Year_Name = "All";
//             this.Years_Data.unshift(this.Years_Temp);
//             this.Years_ = this.Years_Data[0];
//             this.issLoading = false;
//         }
//     },
//         Rows => {
//             this.issLoading = false;
//         });
// }

Load_Part()
{
       this.issLoading = true;
    this.Student_Service_.Load_Part().subscribe(Rows => {
        
        if (Rows != null) {
            this.Part_Data = Rows[0];
            this.Part_Temp.Part_Id = 0;
            this.Part_Temp.Part_Name = "All";
            this.Part_Data.unshift(this.Part_Temp);
            this.Part_ = this.Part_Data[0];
            this.issLoading = false;
        }
    },
        Rows => {
            this.issLoading = false;
        });
}
Clr_Mark_List()
{
    this.Mark_List_.Mark_List_Id=0;
    this.Mark_List_.Minimum_Mark="";
    this.Mark_List_.Maximum_Mark="";
    this.Mark_List_.Mark_Obtained="";
    this.Mark_List_.Internal_Mark="";
    this.Mark_List_.External_Mark="";
    this.Mark_List_.Technical_Skill="";
    this.Mark_List_.Course_Subject_Id=0;
    this.Subject_=null;

    if (this.Exam_Status_Data != undefined && this.Exam_Status_Data != null)
    this.Exam_Status_ = this.Exam_Status_Data[0];
    
    this.Mark_List_.Student_Id=0;
    this.Mark_List_.User_Id=0;
}
Clr_Mark_List_Master()
{
    this.Mark_List_.Student_Course_Part_Id=0;
  //  this.Mark_List_Master_.Mark_List_Master_Id=0;
    this.Mark_List_.Part_Id=0;
    this.Mark_List_.Part_Name="";
    this.Mark_List_.Month_Id=0;
    this.Mark_List_.Month_Name="";
    this.Mark_List_.Year_Id=0;
    this.Mark_List_.Year_Name="";
    this.Clr_Mark_List();
}
Get_Course_Part_Mark_Div(Part_Id)
{
    if(this.Add_Mark==false)
    {
        this.Add_Mark = true;
        this.Get_Course_Part_Mark(Part_Id)
    }
    else
    this.Add_Mark=false
}
Get_Course_Part_Mark(Part_Id)
{
    
   // this.Student_Course_Part_.Mark_List_Issue_Date =this.New_Date(new Date(moment(this.Student_Mark_Part_Data[Part_Id].Mark_List_Issue_Date).format('YYYY-MM-DD'))); 
    this.issLoading = true;
    this.Student_Service_.Get_Course_Part_Mark(this.Student_Id_Edit,this.Course_Id_Edit,Part_Id).subscribe(Rows => {
        
        if (Rows != null) {
            
            this.Mark_List_Data = Rows[0];
          // var t = Rows[0].Mark_List_Issue_Date;
            
        //  this.Student_Course_Part_.Mark_List_Issue_Date = this.New_Date(Rows[0].Mark_List_Issue_Date);
            for (var i = 0; i < this.Mark_List_Data.length; i++)
        {
            this.Exam_Status_Temp=this.Exam_Status_Data[this.Mark_List_Data[i].Exam_Status_Id]
             this.Mark_List_Data[i].Exam_Status_ = Object.assign(this.Exam_Status_Temp)
        } 
            this.issLoading = false;
        }
    },
        Rows => {
            this.issLoading = false;
        });
}
Save_Mark_List()
{
    var internallimit=0,intmark=20,externallimit=0,skilllimit=0;
    for (var j = 0; j < this.Mark_List_Data.length; j++) 
    {
        // if (this.Mark_List_Data[j].Exam_Status_ == undefined||this.Mark_List_Data[j].Exam_Status_ == null||this.Mark_List_Data[j].Exam_Status_.Exam_Status_Id == undefined||this.Mark_List_Data[j].Exam_Status_.Exam_Status_Id == 0)
        // {
        //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Exam Status', Type: "3" } });
        //     return
        // }
        if (this.Mark_List_Data[j].Internal_Mark=="")
        this.Mark_List_Data[j].Internal_Mark ="0";
        internallimit=Number(this.Mark_List_Data[j].Internal_Mark)


        if (this.Mark_List_Data[j].External_Mark=="")
        this.Mark_List_Data[j].External_Mark ="0";
        externallimit=Number(this.Mark_List_Data[j].External_Mark)

        
        if (this.Mark_List_Data[j].Technical_Skill=="")
        this.Mark_List_Data[j].Technical_Skill ="0";
        skilllimit=Number(this.Mark_List_Data[j].Technical_Skill)

        if(this.Mark_List_Data[j].Online_Exam_Mark==null || this.Mark_List_Data[j].Online_Exam_Mark==undefined )
        {
            this.Mark_List_Data[j].Online_Exam_Mark="";
        }
        if (this.Mark_List_Data[j].Exam_Status_.Exam_Status_Id !=3)
        {
            if (this.Mark_List_Data[j].Internal_Mark == undefined || this.Mark_List_Data[j].Internal_Mark == null )
            {
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Internal Mark',Type:"3"}});
                return
            }
            else if (internallimit>intmark)
            {
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Internal Mark upto 20',Type:"3"}});
                return
            }
            else if (this.Mark_List_Data[j].Technical_Skill == undefined || this.Mark_List_Data[j].Technical_Skill == null || this.Mark_List_Data[j].Technical_Skill == "")
            {
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Technical Skill',Type:"3"}});
                return
            }  
            else if (skilllimit>40)
            {
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Technical Skill upto 40',Type:"3"}});
                return
            }
            else if (this.Mark_List_Data[j].External_Mark == undefined || this.Mark_List_Data[j].External_Mark == null || this.Mark_List_Data[j].External_Mark == "")
            {
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter External Mark',Type:"3"}});
                return
            }
            else  if (externallimit>40)
            {
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter External Mark upto 40',Type:"3"}});
                return
            } 
            else if (this.Mark_List_Data[j].Mark_Obtained == undefined || this.Mark_List_Data[j].Mark_Obtained == null || this.Mark_List_Data[j].Mark_Obtained == "")
            {
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Total Mark',Type:"3"}});
                return
            }
        }
        this.Mark_List_Data[j].Exam_Status_Id=this.Mark_List_Data[j].Exam_Status_.Exam_Status_Id
    }
    this.issLoading=true;
        this.Mark_List_.User_Id = this.Login_User;
        this.Mark_List_.Student_Id = this.Student_Id;
        
        this.Mark_List_.Mark_List_Data = this.Mark_List_Data;
       // if()
       this.Mark_List_.Issue_Date = this.New_Date(new Date(moment(this.Student_Course_Part_.Mark_List_Issue_Date).format('YYYY-MM-DD')));;
        if (this.Save_Call_Status == true)
        return;
        else
        this.Save_Call_Status = true;
         
        this.Student_Service_.Save_Mark_List_Master(this.Mark_List_).subscribe(Save_status => {
          
        // Save_status=Save_status[0];
        
            if(Number(Save_status[0].Mark_List_Id_)>0)
            {
                this.Student_Mark_Part_Data[this.Marklistindex].Mark_List_Issue_Date=this.Mark_List_.Issue_Date;
                this.Student_Mark_Part_Data[this.Marklistindex].Mark_List_Issue_Date_T=Save_status[0].Mark_List_Issue_Date_T;
                this.print_IssueDate=Save_status[0].Mark_List_Issue_Date_T;
  
                this.Mark_List_.Mark_List_Id=Number(Save_status[0].Mark_List_Id_);
                const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
                // this.Clr_Mark_List();
               // this.print_MarkList(this.Part_Name_Print);
                this.Save_Call_Status = false;
                // this.Get_Student_Mark_List(this.Student_.Student_Id)
              
               
            }
            else
            {
                const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
                        this.Save_Call_Status = false;
            }
            this.issLoading=false;
            },
            Rows => { 
            this.issLoading=false;
            const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:Rows.error.error,Type:"2"}});
             this.Save_Call_Status = false;
         });
}
Print_Mark_List()
{
    var Maximummarks_Print_=0,Minimummarksforpass_print_=0,Internalassessment_Total_Print_=0,
    Externalassessment_Total_Print_=0,Skillassessment_Total_Print_=0,Totalmarks_Total_Print_=0;

    var Maximummarks_Print_T=0,Minimummarksforpass_print_T=0,Internalassessment_Total_Print_T=0,
    Externalassessment_Total_Print_T=0,Skillassessment_Total_Print_T=0,Totalmarks_Total_Print_T=0;

    var internallimit=0,externallimit=0,skilllimit=0;

    var numbertemp=0;
    for (var j = 0; j < this.Mark_List_Data.length; j++) 
    {
        // if (this.Mark_List_Data[j].Exam_Status_ == undefined||this.Mark_List_Data[j].Exam_Status_ == null||this.Mark_List_Data[j].Exam_Status_.Exam_Status_Id == undefined||this.Mark_List_Data[j].Exam_Status_.Exam_Status_Id == 0)
        // {
        //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Exam Status', Type: "3" } });
        //     return
        // }
        if (this.Mark_List_Data[j].Internal_Mark=="")
        this.Mark_List_Data[j].Internal_Mark ="0";
        internallimit=Number(this.Mark_List_Data[j].Internal_Mark)

        if (this.Mark_List_Data[j].External_Mark=="")
        this.Mark_List_Data[j].External_Mark ="0";
        externallimit=Number(this.Mark_List_Data[j].External_Mark)

        
        if (this.Mark_List_Data[j].Technical_Skill=="")
        this.Mark_List_Data[j].Technical_Skill ="0";
        skilllimit=Number(this.Mark_List_Data[j].Technical_Skill)
        
        if (this.Mark_List_Data[j].Exam_Status_.Exam_Status_Id !=3)
        {
            if (this.Mark_List_Data[j].Internal_Mark == undefined || this.Mark_List_Data[j].Internal_Mark == null )
            {
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Internal Mark',Type:"3"}});
                return
            }
            if (internallimit>20)
            {
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Internal Mark upto 20',Type:"3"}});
                return
            }
            else if (this.Mark_List_Data[j].Technical_Skill == undefined || this.Mark_List_Data[j].Technical_Skill == null || this.Mark_List_Data[j].Technical_Skill == "")
            {
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Technical Skill',Type:"3"}});
                return
            } 
            else if (skilllimit>40)
            {
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Technical Skill upto 40',Type:"3"}});
                return
            }  
            else if (this.Mark_List_Data[j].External_Mark == undefined || this.Mark_List_Data[j].External_Mark == null || this.Mark_List_Data[j].External_Mark == "")
            {
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter External Mark',Type:"3"}});
                return
            }
            else  if (externallimit>40)
            {
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter External Mark upto 40',Type:"3"}});
                return
            } 
            else if (this.Mark_List_Data[j].Mark_Obtained == undefined || this.Mark_List_Data[j].Mark_Obtained == null || this.Mark_List_Data[j].Mark_Obtained == "")
            {
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Total Mark',Type:"3"}});
                return
            }
        }
        this.Mark_List_Data[j].Exam_Status_Id=this.Mark_List_Data[j].Exam_Status_.Exam_Status_Id
         

        Maximummarks_Print_T=Number(this.Mark_List_Data[j].Maximum_Mark);
        if(isNaN(Maximummarks_Print_T))
        Maximummarks_Print_T=0;
        Maximummarks_Print_+= Maximummarks_Print_T;


        Minimummarksforpass_print_T= Number(this.Mark_List_Data[j].Minimum_Mark);
        if(isNaN(Minimummarksforpass_print_T))
        Minimummarksforpass_print_T=0;
        Minimummarksforpass_print_+= Minimummarksforpass_print_T;
        

        Internalassessment_Total_Print_T= Number(this.Mark_List_Data[j].Internal_Mark);
        if(isNaN(Internalassessment_Total_Print_T))
        Internalassessment_Total_Print_T=0;
        Internalassessment_Total_Print_+= Internalassessment_Total_Print_T;

    
        Externalassessment_Total_Print_T= Number(this.Mark_List_Data[j].External_Mark);
        if(isNaN(Externalassessment_Total_Print_T))
        Externalassessment_Total_Print_T=0;
        Externalassessment_Total_Print_+= Externalassessment_Total_Print_T;
    

        Skillassessment_Total_Print_T=Number(this.Mark_List_Data[j].Technical_Skill);
        // numbertemp=Number(Skillassessment_Total_Print_)
        // if(isNaN(numbertemp))
        // Skillassessment_Total_Print_=0;
        if(isNaN(Skillassessment_Total_Print_T))
        Skillassessment_Total_Print_T=0;
        Skillassessment_Total_Print_+= Skillassessment_Total_Print_T;



        // Totalmarks_Total_Print_+=Number(this.Mark_List_Data[j].Mark_Obtained);
        Totalmarks_Total_Print_T= Number(this.Mark_List_Data[j].Mark_Obtained);
        if(isNaN(Totalmarks_Total_Print_T))
        Totalmarks_Total_Print_T=0;
        Totalmarks_Total_Print_+= Totalmarks_Total_Print_T;

        var pass="";
        
        if(Number(this.Mark_List_Data[j].Mark_Obtained)>=Number(this.Mark_List_Data[j].Minimum_Mark))
        {        
        //    var pass=this.Mark_List_Data[j].Exam_Status_Name
            pass='PA'
             this.Mark_List_Data[j].Exam_Status_Name='PA'     
        }
        else
        {     
         this.Mark_List_Data[j].Exam_Status_Name='FA'   
         pass='FA'
        }
    }  
 this.Maximummarks_Print=Maximummarks_Print_;
 this.Minimummarksforpass_print=Minimummarksforpass_print_;
 this.Internalassessment_Total_Print=Internalassessment_Total_Print_;
 this.Externalassessment_Total_Print=Externalassessment_Total_Print_;
 this.Skillassessment_Total_Print=Skillassessment_Total_Print_;
 this.Totalmarks_Total_Print=Totalmarks_Total_Print_; 
 var percentate_Mark=this.Totalmarks_Total_Print*100/this.Maximummarks_Print;   
    
if (percentate_Mark>80 && pass=='PA')  
{
    this.Mark_List_.Grade='GradeA+'
}
else if (percentate_Mark>60 && percentate_Mark<80  && pass=='PA')
{
    this.Mark_List_.Grade='GradeA'
}
else if (percentate_Mark>50 && percentate_Mark<60  && pass=='PA')
{
    this.Mark_List_.Grade='GradeB'
}
else if (percentate_Mark>40 && percentate_Mark<50  && pass=='PA')
{
    this.Mark_List_.Grade='GradeC'
}
else if ( percentate_Mark<40 && pass=='FA')
{
    this.Mark_List_.Grade=''
}
        this.Mark_List_.User_Id = this.Login_User;
        this.Mark_List_.Student_Id = this.Student_Id;        
        this.Mark_List_.Mark_List_Data = this.Mark_List_Data;
       this.Mark_List_.Issue_Date = this.New_Date(new Date(moment(this.Student_Course_Part_.Mark_List_Issue_Date).format('YYYY-MM-DD')));;
        if (this.Save_Call_Status == true)
        return;
        else
        this.Save_Call_Status = true;
        this.issLoading=true;
        this.Student_Service_.Save_Mark_List_Master(this.Mark_List_).subscribe(Save_status => {
        // Save_status=Save_status[0];
        
            if(Number(Save_status[0].Mark_List_Id_)>0)
            {
                
                this.Student_Mark_Part_Data[this.Marklistindex].Mark_List_Issue_Date=this.Mark_List_.Issue_Date;
                this.Student_Mark_Part_Data[this.Marklistindex].Mark_List_Issue_Date_T=Save_status[0].Mark_List_Issue_Date_T;
               this.print_IssueDate=Save_status[0].Mark_List_Issue_Date_T;
                this.issLoading=false;
                this.Save_Call_Status = false;
                this.Mark_List_.Mark_List_Id=Number(Save_status[0].Mark_List_Id_);
                this.print_MarkList(this.Part_Name_Print);                
            }
            else
            {
                const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
                 this.Save_Call_Status = false;
            }
            this.issLoading=false;
            },
            Rows => { 
            this.issLoading=false;
            const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:Rows.error.error,Type:"2"}});
             this.Save_Call_Status = false;
         });
}
Calculate_Total_Mark(i)
{
    
    var External_Mark_="",Internal_Mark_="",Technical_skill_="",Obtained_=0;
   
    if(this.Mark_List_Data[i].Mark_Obtained ==undefined||this.Mark_List_Data[i].Mark_Obtained ==null)
    this.Mark_List_Data[i].Mark_Obtained="";

    if(this.Mark_List_Data[i].External_Mark ==undefined||this.Mark_List_Data[i].External_Mark ==null)
    External_Mark_="";
    else
    External_Mark_= this.Mark_List_Data[i].External_Mark ;
 
var numbertemp=Number(External_Mark_)
    if(isNaN(numbertemp))
    {
        External_Mark_='0';
        // this.Mark_List_Data[i].External_Mark =numbertemp.toString();
       
    }

    if(this.Mark_List_Data[i].Internal_Mark ==undefined||this.Mark_List_Data[i].Internal_Mark ==null)
    Internal_Mark_="";
    else
    Internal_Mark_= this.Mark_List_Data[i].Internal_Mark ;

    var numbertempinteral=Number(Internal_Mark_)
    if(isNaN(numbertempinteral))
    {
        Internal_Mark_='0';
       
    }

    if(this.Mark_List_Data[i].Technical_Skill ==undefined||this.Mark_List_Data[i].Technical_Skill ==null)
    Technical_skill_="";
    else
    Technical_skill_= this.Mark_List_Data[i].Technical_Skill;
    var numbertemptechnical=Number(Technical_skill_)
    if(isNaN(numbertemptechnical))
    {
        Technical_skill_='0';
       
    }

     Obtained_ = Number(External_Mark_) + Number(Internal_Mark_) + Number(Technical_skill_);
     this.Mark_List_Data[i].Mark_Obtained = Number(Obtained_).toFixed();
}
Get_Student_Mark(Part,i)
{
    this.Marklistindex=i;
    this.Mark_Hidden=false;
    this.Add_Mark=true;
    this.Year_Hidden=true;
    this.Part_Subject_Data=[];
 
    if(Part.Mark_List_Issue_Date==null || Part.Mark_List_Issue_Date==undefined)
    {
        this.Student_Course_Part_.Mark_List_Issue_Date=new Date();
        this.Student_Course_Part_.Mark_List_Issue_Date=this.New_Date(this.Student_Course_Part_.Mark_List_Issue_Date);
    }
    else
       {
        this.Student_Course_Part_.Mark_List_Issue_Date = Part.Mark_List_Issue_Date;  
      
        this.print_IssueDate  = Part.Mark_List_Issue_Date_T;  
       }
        // 
    // this.Mark_List_.=Part
    this.Mark_List_.Part_Id=Part.Part_Id
    this.Mark_List_.Part_Name=Part.Part_Name
    this.Mark_List_.Student_Course_Part_Id=Part.Student_Course_Part_Id
    this.Mark_List_.Year_Id=Part.Year_Id
    this.Mark_List_.Year_Name=Part.Year_Name
    this.Mark_List_.Month_Id=Part.Month_Id
    this.Mark_List_.Month_Name=Part.Month_Name
    this.Part_Id=this.Mark_List_.Part_Id
    this.Get_Course_Part_Mark(this.Part_Id)
}
Load_Student_Part()
{
    
    this.issLoading = true;
this.Student_Service_.Load_Student_Part(this.Student_Id).subscribe(Rows => {
    
    if (Rows != null) {
        this.Student_Mark_Part_Data = Rows[0];
        this.issLoading = false;
    }
},
    Rows => {
        this.issLoading = false;
    });
}
Get_Student_Mark_List(Student_Id)
{
    this.issLoading = true;
    this.Student_Service_.Get_Student_Mark_List(Student_Id,this.Part_Id).subscribe(Rows => {
        this.Part_Master_Data=[]
        this.Mark_List_Data = Rows[0];   
        //this.Issue_Date_ = Rows[0].Mark_List_Issue_Date
     
        // if(this.Mark_List_Data.length>0)
        // {
        //     var part_id_temp=0;//this.Mark_List_Data[0].Part_Id
        //     for (var i = 0; i < this.Mark_List_Data.length;i++)
        //     {
        //         if(part_id_temp!=this.Mark_List_Data[i].Part_Id)
        //         {
        //             j++;
        //             this.Part_Master_Temp=new Part_Master()
        //             this.Part_Master_Temp.Part_Id=this.Mark_List_Data[i].Part_Id;
        //             this.Part_Master_Temp.Part_Name=this.Mark_List_Data[i].Part_Name;
        //             this.Part_Master_Temp.Mark_List_Details=[];
        //             this.Part_Master_Data.push (Object.assign({}, this.Part_Master_Temp));
        //             this.Mark_List_Temp=this.Mark_List_Data[i];
        //             this.Part_Master_Data[j].Mark_List_Details.push(Object.assign({}, this.Mark_List_Temp));
        //         }
        //         else
        //         {
        //             // this.Mark_List_Temp.External_Mark=this.Mark_List_Data[0].External_Mark;
        //             // this.Mark_List_Temp.Internal_Mark=this.Mark_List_Data[0].Internal_Mark;
        //             // this.Mark_List_Temp.Technical_Skill=this.Mark_List_Data[0].Technical_Skill;
        //             // this.Mark_List_Temp.Mark_Obtained=this.Mark_List_Data[0].Mark_Obtained;
        //             // this.Mark_List_Temp.Maximum_Mark=this.Mark_List_Data[0].Maximum_Mark;
        //             //this.Mark_List_Temp.Minimum_Mark=this.Mark_List_Data[0].Minimum_Mark;
        //             this.Mark_List_Temp=this.Mark_List_Data[i];

        //             this.Part_Master_Data[j].Mark_List_Details.push(Object.assign({}, this.Mark_List_Temp));
        //         }
        //         part_id_temp=this.Mark_List_Data[i].Part_Id
        //         // this.date_Temp=this.Student_Course_.Start_Date;
        //         // this.Student_Fees_Installment_Master_Data[i].Student_Fees_Installment_Details=[]
               
        //     }    
        // }
        this.issLoading = false;
    },
        Rows => {
            this.issLoading = false;
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
        });
}
Edit_Mark_List(Mark_List_e:Mark_List,index)
{           
    this.Mark_List_Index=index;
    this.Mark_List_ = Object.assign({}, Mark_List_e); 

    this.Subject_Temp.Subject_Id = this.Mark_List_.Subject_Id;
    this.Subject_Temp.Subject_Name = this.Mark_List_.Subject_Name;
    this.Subject_ = Object.assign({}, this.Subject_Temp);

    for (var i = 0; i < this.Exam_Status_Data.length; i++) 
    {
        if (this.Exam_Status_Data[i].Exam_Status_Id == this.Mark_List_.Exam_Status_Id) 
        {
            this.Exam_Status_ = this.Exam_Status_Data[i];
        }
    }
}
Delete_Mark_List(Mark_List:Mark_List,index)
{
    
    this.Mark_List_Data.splice(index, 1);
    this.Clr_Mark_List();
}
Delete_Student_Mark_Details(Mark_List_Master_Id,index)
{
    
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
    {
        this.issLoading=true;
        this.Student_Service_.Delete_Student_Mark_Details(Mark_List_Master_Id).subscribe(Delete_status => {
            
            // Delete_status = Delete_status[0];
            // Delete_status = Delete_status[0].DeleteStatus_;
        if(Delete_status[0][0].Mark_List_Id_>0)
        {
        this.Mark_List_Data.splice(index, 1);
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type: "false"}});
        this.Clr_Mark_List();
        this.Get_Student_Mark_List(this.Student_.Student_Id)
        //this.Get_Course(this.Course_.Course_Id);
        }
        else
        {
        this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        }
        this.issLoading=false;
        },
    //this.Course_Subject_Data.splice(index, 1);
        
    Rows => { 
        this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        });
        }
        });
}
Load_Mode()
    {
        this.Student_Service_.Load_Mode().subscribe(Rows =>
    {
    this.Mode_Data= Rows[0];        
    this.Mode_Temp.Mode_Id = 0;
    this.Mode_Temp.Mode_Name = "Select";
    this.Mode_Data.unshift(this.Mode_Temp);
    this.Mode=this.Mode_Data[0]; 
    },
        Rows => {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); });
}
Accounts_Typeahead(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = undefined;
    else
        Value = event.target.value;
    if (this.Client_Accounts_Data == undefined || this.Client_Accounts_Data.length==0)
    {
        this.issLoading = true;
        this.Student_Service_.Accounts_Typeahead('4,5,11',Value).subscribe(Rows => {
    if (Rows != null) 
    {
        this.Client_Accounts_Data = Rows[0];
        this.issLoading = false;
    }
    },
    Rows => {
     this.issLoading = false;
    });
    } 
}
display_Accounts(Client_Accounts_: Client_Accounts)
{     
    if (Client_Accounts_) { return Client_Accounts_.Client_Accounts_Name; }
}
Clr_Receipt_Voucher()
{
   this.Receipt_Voucher_.Receipt_Voucher_Id=0;
   this.Receipt_Voucher_.Date=new Date();
   this.Receipt_Voucher_.Date=this.New_Date(this.Receipt_Voucher_.Date);
   this.Receipt_Voucher_.Voucher_No=0;
   this.Receipt_Voucher_.From_Account_Id=0;
   this.Receipt_Voucher_.Amount=null;
   this.Receipt_Voucher_.To_Account_Id=0;
   this.Receipt_Voucher_.Payment_Mode=0;
   this.Receipt_Voucher_.User_Id=0;
   this.Receipt_Voucher_.Agent_Id=0;
   this.Receipt_Voucher_.Description="";
   this.Receipt_Voucher_.Address1="";
   this.Client_Accounts_=null;
   if(this.Mode_Data!=null && this.Mode_Data != undefined)
   this.Mode=this.Mode_Data[0];
   this.Receipt_Voucher_.Payment_Status=0;
}
Save_Receipt_Voucher_old()
{
     if(this.Receipt_Voucher_.Amount==undefined||this.Receipt_Voucher_.Amount==null||this.Receipt_Voucher_.Amount==undefined||this.Receipt_Voucher_.Amount==0)
        {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter the Amount', Type: "3" } });
        }       
        else if (this.Mode == null || this.Mode == undefined || this.Mode.Mode_Id == undefined || this.Mode.Mode_Id == 0) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Mode', Type: "3" } });
        }
else
{
        this.Receipt_Voucher_.User_Id=Number(this.Login_User);
        this.Receipt_Voucher_.From_Account_Id=this.Student_Id;
        this.Receipt_Voucher_.Student_Course_Id=this.Student_Course_Id_Edit;
        this.Receipt_Voucher_.Payment_Status=0;
        this.Receipt_Voucher_.To_Account_Id=3;
        this.Receipt_Voucher_.Payment_Mode=this.Mode.Mode_Id;
       // this.Receipt_Voucher_.Agent_Id = 
        
        this.Receipt_Voucher_.Date=this.New_Date(new Date(moment(this.Receipt_Voucher_.Date).format('YYYY-MM-DD')));
    this.issLoading=true;
    
    if (this.Save_Call_Status == true)
        return;
    else
        this.Save_Call_Status = true;


        
    this.Student_Service_.Save_Student_Receipt_Voucher(this.Receipt_Voucher_).subscribe(Save_status => {
        
    Save_status=Save_status[0];
    if(Number(Save_status[0].Receipt_Voucher_Id_)>0)
    {
        this.issLoading=true;
        
            this.Student_Service_.Send_Receipt_Email(this.Student_.Email).subscribe(Rows => {
                
                
                this.issLoading=false;
                },
                Rows => 
                { 
                    this.issLoading=false;
                    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
                });
        if(Number.parseFloat( this.Receipt_Voucher_.Amount.toString())>=Number.parseFloat( this.Student_Fees_Installment_Master_Data[0].Student_Fees_Installment_Details[this.Installment_Index].Balance_Amount.toString()))
        this.Student_Fees_Installment_Master_Data[0].Student_Fees_Installment_Details[this.Installment_Index].Status=1;
        this.Student_Fees_Installment_Master_Data[0].Student_Fees_Installment_Details[this.Installment_Index].Balance_Amount=this.Student_Fees_Installment_Master_Data[0].Student_Fees_Installment_Details[this.Installment_Index].Balance_Amount-this.Receipt_Voucher_.Amount;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
        this.Save_Call_Status = false;
        this.Clr_Receipt_Voucher();
        this.Receipt_View=false;
        this.Get_Receipt_History();
        this.Get_Student_Course(this.Student_Id);
        // this.Receipt_History_View=false;
    //  this.Receipt_Voucher_.Voucher_No=Save_status[0].Voucher_No_;
    }
    else
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
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
}
Save_Receipt_Voucher()
{
     if(this.Receipt_Voucher_.Amount==undefined||this.Receipt_Voucher_.Amount==null||this.Receipt_Voucher_.Amount==undefined||this.Receipt_Voucher_.Amount==0)
        {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter the Amount', Type: "3" } });
        }       
        else if (this.Mode == null || this.Mode == undefined || this.Mode.Mode_Id == undefined || this.Mode.Mode_Id == 0) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Mode', Type: "3" } });
        }
else
{
        this.Receipt_Voucher_.User_Id=Number(this.Login_User);
        this.Receipt_Voucher_.From_Account_Id=this.Student_Id;
        this.Receipt_Voucher_.Student_Course_Id=this.Student_Course_Id_Edit;
        this.Receipt_Voucher_.Payment_Status=0;
        this.Receipt_Voucher_.To_Account_Id=3;
        this.Receipt_Voucher_.Payment_Mode=this.Mode.Mode_Id;
        this.Receipt_Voucher_.Agent_Id=this.Student_.Agent_Id;
        this.Receipt_Voucher_.Date=this.New_Date(new Date(moment(this.Receipt_Voucher_.Date).format('YYYY-MM-DD')));
    this.issLoading=true;
    
    if (this.Save_Call_Status == true)
        return;
    else
        this.Save_Call_Status = true;


        
    this.Student_Service_.Save_Student_Receipt_Voucher(this.Receipt_Voucher_).subscribe(Save_status => {
        
    Save_status=Save_status[0];
    if(Number(Save_status[0].Receipt_Voucher_Id_)>0)
    {
        
        this.issLoading=true;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to save and send fees receipt ?',Type:true,Heading:'Confirm'}});
        dialogRef.afterClosed().subscribe(result =>
            {
            if(result=='Yes')
            {
                // this.Receipt_Details_.Receipt_Array=Fees_Receipt_;
                
                this.Receipt_Details_.Student_Name = this.Student_.Student_Name;
                this.Receipt_Details_.Student_Email = this.Student_.Email;
                this.Receipt_Details_.Amount = Save_status[0].Amount_;
                this.Receipt_Details_.Date = Save_status[0].Date_;
                this.Receipt_Details_.Voucher_No = Save_status[0].Voucher_No_;
                this.Receipt_Details_.Description = Save_status[0].Description_;
                this.Receipt_Details_.Mode_Name = Save_status[0].Mode_Name_;

                this.Student_Service_.Send_Receipt_Email(this.Receipt_Details_).subscribe(Rows => {
                
                    
                    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'sent',Type:"false"}});
                    this.issLoading=false;
                    },
                    Rows => 
                    { 
                        this.issLoading=false;
                        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
                    });
            }
            else
            {
                if(Number.parseFloat( this.Receipt_Voucher_.Amount.toString())>=Number.parseFloat( this.Student_Fees_Installment_Master_Data[0].Student_Fees_Installment_Details[this.Installment_Index].Balance_Amount.toString()))
                this.Student_Fees_Installment_Master_Data[0].Student_Fees_Installment_Details[this.Installment_Index].Status=1;
                this.Student_Fees_Installment_Master_Data[0].Student_Fees_Installment_Details[this.Installment_Index].Balance_Amount=this.Student_Fees_Installment_Master_Data[0].Student_Fees_Installment_Details[this.Installment_Index].Balance_Amount-this.Receipt_Voucher_.Amount;
                const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
               
            }

            this.Save_Call_Status = false;
            this.Clr_Receipt_Voucher();
            this.Receipt_View=false;
            this.Get_Receipt_History();
            this.Get_Student_Course(this.Student_Id);
        });
        // this.Receipt_History_View=false;
    //  this.Receipt_Voucher_.Voucher_No=Save_status[0].Voucher_No_;
    }
    else
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
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
}
Save_Receipt_Voucher2()
{
    
  
            this.issLoading=true;
            this.Student_Service_.Save_Student_Receipt_Voucher(this.Receipt_Voucher_).subscribe(Save_status => {
                Save_status=Save_status[0];
                 
                if(Number(Save_status[0].Receipt_Voucher_Id_)>0)
                {
                    this.issLoading=true;

                    

                    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to mail fees receipt ?',Type:true,Heading:'Confirm'}});
                    dialogRef.afterClosed().subscribe(result =>
                        {
                        if(result=='Yes')
                        {
                              
                            this.Student_Service_.Send_Receipt_Email(this.Student_.Email).subscribe(Rows => {
                                
                            
                                const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:' sent',Type:"2"}});
                                this.issLoading=false;
                                },
                                Rows => 
                                { 
                                    this.issLoading=false;
                                    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
                                });
                        }
                        else
                        {
                            if(Number.parseFloat( this.Receipt_Voucher_.Amount.toString())>=Number.parseFloat( this.Student_Fees_Installment_Master_Data[0].Student_Fees_Installment_Details[this.Installment_Index].Balance_Amount.toString()))
                            this.Student_Fees_Installment_Master_Data[0].Student_Fees_Installment_Details[this.Installment_Index].Status=1;
                            this.Student_Fees_Installment_Master_Data[0].Student_Fees_Installment_Details[this.Installment_Index].Balance_Amount=this.Student_Fees_Installment_Master_Data[0].Student_Fees_Installment_Details[this.Installment_Index].Balance_Amount-this.Receipt_Voucher_.Amount;
                            const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
                           
                        }

                        this.Save_Call_Status = false;
                        this.Clr_Receipt_Voucher();
                        this.Receipt_View=false;
                        this.Get_Receipt_History();
                        this.Get_Student_Course(this.Student_Id);
                    });


                    
                    // this.Receipt_History_View=false;
                //  this.Receipt_Voucher_.Voucher_No=Save_status[0].Voucher_No_;
                }
                else
                {
                  
                    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
                }
                this.issLoading=false;
                },
            
        Rows => { 
            this.issLoading=false;
            const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
            });
           
    }






Get_Receipt_History()
{
    // if(this.Receipt_History_View==false)
    // {
    //     this.Receipt_History_View = true;
        this.issLoading = true;
        this.Student_Service_.Get_Student_Receipt_History(this.Student_Id).subscribe(Rows =>
             {                 
            this.issLoading = false;
                this.Receipt_Voucher_Data = Rows[0];
        },
            Rows => {
                this.issLoading = false;
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: false } });
            });
    // }
    // else
    // this.Receipt_History_View=false
}
Edit_Receipt_Voucher(Receipt_Voucher_e:Receipt_Voucher,index)
{
this.Receipt_Voucher_=Receipt_Voucher_e;

this.Receipt_View=true;
this.Receipt_Voucher_=Object.assign({},Receipt_Voucher_e);

this.Client_Accounts_Temp.Client_Accounts_Id=Receipt_Voucher_e.To_Account_Id;
this.Client_Accounts_Temp.Client_Accounts_Name=Receipt_Voucher_e.ToAccount_Name;
this.Client_Accounts_=this.Client_Accounts_Temp;
 
 
for (var i = 0; i < this.Mode_Data.length; i++) {
    if (Receipt_Voucher_e.Payment_Mode == this.Mode_Data[i].Mode_Id)
    this.Mode = this.Mode_Data[i];
}
}


Delete_Receipt_Voucher(Receipt_Voucher_Id,index)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
    {
    this.issLoading=true;
    this.Student_Service_.Delete_Receipt_Voucher(Receipt_Voucher_Id).subscribe(Delete_status => {
         
    if(Delete_status[0][0].Receipt_Voucher_Id_>0){
    this.Receipt_Voucher_Data.splice(index, 1);
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
     this.Get_Student_Course(this.Student_Id);
    }
    else
    {
    //this.Receipt_Voucher_Data.splice(index, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
    }
    this.issLoading=false;
    },
    Rows => { 
        this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); });
    }
 });
}

Get_Activities_Details_History()
{
        this.issLoading = true;
        this.Student_Service_.Get_Activities_Details_History(this.Student_Id).subscribe(Rows =>
             {                 
            this.issLoading = false;
                this.Receipt_Voucher_Data = Rows[0];
        },
            Rows => {
                this.issLoading = false;
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: false } });
            });
}
print_MarkList(Part_Name)
{     
    
    this.Part_Name_Print=Part_Name;
    this.Mark_List_Print=this.Mark_List_Data;
    this.Mark_List_Print_Blank=[];
    var Blank_Rows=8-this.Mark_List_Data.length;
    var i;
    for (i=0;i<=Blank_Rows;i++)
    {
        this.Mark_List_Print_Blank.push(this.Mark_List_)
    }
    var Start_Temp =  new Date(moment(this.Student_Course_.Start_Date).format('YYYY-MM-DD'));
    var End_Temp =  new Date(moment(this.Student_Course_.End_Date).format('YYYY-MM-DD'));
    this.Start_Year = Start_Temp.getFullYear();
    this.End_Year = End_Temp.getFullYear();

    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"  ];
  
  this.Start_Month =monthNames[Start_Temp.getMonth()];
  this.End_Month =monthNames[End_Temp.getMonth()];
  
    // this.Mark_List_Print=this.Part_Master_Data[i].Mark_List_Details;
    //     var intervalID = setInterval(alert, 1000); 
    // setTimeout(alert, 1000); 
    // setInterval(function()
    // {
    // }, 2000);

    // this.Maximummarks_Print=Number(this.Mark_List_Data.length)*100;
    // this.Minimummarksforpass_print=Number(this.Mark_List_Data.length)*40;
    // this.Internalassessment_Total_Print

    setTimeout(function() {
        // this.print_Mark()
        let popupWinindow
        let innerContents = document.getElementById("Print_Div").innerHTML;
        popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><style>@page { size: auto;  margin: 0mm; } </style><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
        popupWinindow.document.close();   
      }, 1000);     
}
print_Mark()
{     
    let popupWinindow
    let innerContents = document.getElementById("Print_Div").innerHTML;
    popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    popupWinindow.document.open();
    popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
    popupWinindow.document.close();      
}
print_Certificate()
{     
    this.Update_Certificate_Date();
    this.ExaminationheldDate();
    // setTimeout(function() {
    // let popupWinindow
    // let innerContents = document.getElementById("Certificate_Div").innerHTML;
    // popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    // popupWinindow.document.open();
    // popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
    // popupWinindow.document.close();  
    //  }, 1000);     
}
// ExaminationheldDate()
// {
//     debugger;
//     var myDate = this.Student_Course_.End_Date;
//     var new_mydate=
//     this.Examinationheldon_Date = new Date(myDate);
// // this.Examinationheldon_Date.setMonth(this.Examinationheldon_Date.getMonth()+1);
//     this.Examinationheldon_Date.setMonth(this.Examinationheldon_Date.getMonth()+1);
// // this.month_date= this.Student_Course_.End_Date; 
// //   var Examheldon = this.month_date;
// //   var Heldon = new Date(Examheldon);
// //   Heldon.setMonth(this.month_date.getMonth()+1)
// //   this.Examinationheld_Date=Heldon;

// }
Update_Certificate_Date()
{
    this.Student_Course_.Student_Id = this.Student_Id;
    this.Student_Course_.Student_Course_Id = this.Student_Course_Id_Edit;
    if(this.Student_Course_.Certificate_Grade=="" || this.Student_Course_.Certificate_Grade==undefined || this.Student_Course_.Certificate_Grade==null)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Grade', Type: "3" } });
        return;
    }
    ;
    // this.Examinationheld_Date.setMonth((new Date(moment(this.Student_Course_.End_Date).format('YYYY-MM-DD'))).getMonth()+1);
    //  this.Examinationheld_Date.setMonth(this.Student_Course_.End_Date.getMonth()+1)
    // this.Student_Course_.Student_Fees_Installment_Master = this.Student_Fees_Installment_Master_Data;
    this.issLoading=true;
    this.Student_Course_.Certificate_Date = this.New_Date(new Date(moment(this.Student_Course_.Certificate_Date).format('YYYY-MM-DD')));;
    this.Student_Course_.Certificate_Date_Search =  this.New_Date(new Date(moment(this.Student_Course_.Certificate_Date).format('YYYY-MM-DD')));;

    this.Student_Service_.Update_Certificate_Date(this.Student_Course_).subscribe(Save_status => {
        
    if (Number(Save_status[0].Student_Course_Id_)>0)
    {
        //const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
        let popupWinindow
    let innerContents = document.getElementById("Certificate_Div").innerHTML;
        popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    popupWinindow.document.open();
    popupWinindow.document.write('<html><head><style>@page { size: auto;  margin: 0mm; } </style>'+
    '<link rel="stylesheet" type="text/css" href="style.css" />'+
    '<link href="https://fonts.googleapis.com/css2?family=Libre+Barcode+39&display=swap" rel="stylesheet">'+
    '</head><body onload="window.print()">' + innerContents + '</html>');
 
    
    }
    else
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    }
    this.issLoading=false;
    },
    Rows => { 
        this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:Rows.error.error,Type:"2"}});
    });
}
Get_Company()
{
    

    // this.issLoading=true;
    
    this.Student_Service_.Get_Company().subscribe(Rows =>
        {
            
            // this.Company_=Rows[0];
            // this.Company_=Rows[0].Company_Data;
            
            this.company_data_temp =Rows['Company_Data']

            if(this.company_data_temp[0]!=undefined){
                this.Company_=this.company_data_temp[0];
                this.Company_.Logo='';
            }
           else{
            this.Company_.Company_Id=0;
           }
      
            this.issLoading=false;
        },
        Rows => { 
            
        this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}})
    })
}
Fees_Type_Change()
{
    this.Starting_Year_ = null;
}
Add_Document()
{
   
    if(this.Document_Array==null || this.Document_Array==undefined)
        this.Document_Array=[];
    if(this.Document_File_Array==null || this.Document_File_Array==undefined)
    this.Document_File_Array=[];

   // this.Document_Array.push(this.Document_Description)
    this.Document_File.Document_Name=this.Document_Description;
    this.Document_File.Document_File_Name=this.Display_File_Name_;
    this.Document_File.New_Entry=1;
   
    if (this.ImageFile != null && this.ImageFile != undefined && this.ImageFile !="")
    {
       
        this.Document_File.File_Name=this.ImageFile[0].name
        this.Document_Array.push(Object.assign({},this.Document_File));
        this.Document_File_Array.push(this.ImageFile[0]);
        this.Document_Description="";
        this.Display_File_Name_="";
        this.ImageFile = null

    }
    else{
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Select File',Type:"3"}});
            return;
    }

}

File_Change(event: Event) {
    ;
    const file = (event.target as HTMLInputElement).files;
    this.ImageFile = file;
    this.Display_File_Name_ = this.ImageFile[0].name;
}


File_Change_Aadhaar(event: Event) {
    
    const file = (event.target as HTMLInputElement).files;
    this.ImageFile_Aadhaar = file;
    this.Display_Aadhaar_ = this.ImageFile_Aadhaar[0].name;
}

File_Change_Photo(event: Event) {
    
        const file = (event.target as HTMLInputElement).files;
        this.ImageFile_Photo= file;
        this.Display_Photo_ = this.ImageFile_Photo[0].name;
    }


    File_Change_Aadhaar_Back(event: Event) {
    
        const file = (event.target as HTMLInputElement).files;
        this.ImageFile_Aadhaar_Back = file;
        this.Display_Aadhaar_Back_ = this.ImageFile_Aadhaar_Back[0].name;
    }

    File_Change_SSLC_Certificate(event: Event) {
    
        const file = (event.target as HTMLInputElement).files;
        this.ImageFile_SSLC_Certificate = file;
        this.Display_SSLC_Certificate_ = this.ImageFile_SSLC_Certificate[0].name;
    }

    File_Change_Plustwo_Certificate(event: Event) {
    
        const file = (event.target as HTMLInputElement).files;
        this.ImageFile_Plustwo_Certificate = file;
        this.Display_Plustwo_Certificate_ = this.ImageFile_Plustwo_Certificate[0].name;
    }

Download_Photo(Photo)
{

        //var bs= 'http://newapi.mik.net.in/uploads/'
        var bs= environment.FilePath+'/uploads/';
            var s = bs+ Photo;
           
            window.open(s,'_blank');  
}
Delete_Student_File(File_Name)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
   
    {
    if(result=='Yes')
    {
   
    this.Delete_Student_File_Function(File_Name)
    }
    });
}


Delete_Student_File_Function(File_Name)
{
    var is_apicall=0;
    
    if(File_Name=='Photo')
    {
        this.Photo=null
        this.Display_Photo_='';
        if(this.Student_.Photo!='')
            is_apicall=1
    }
    else if(File_Name=='Aadhaar_')
    {
        this.Aadhaar_=null
        this.Display_Aadhaar_='';
        if(this.Student_.Aadhaar!='')
            is_apicall=1
    }

    else if(File_Name=='Aadhaar_Back_')
    {
        this.Aadhaar_Back_=null
        this.Display_Aadhaar_Back_='';
        if(this.Student_.Aadhaar_Back!='')
            is_apicall=1
    }
    else if(File_Name=='SSLC_Certificate_')
    {
        this.SSLC_Certificate_=null
        this.Display_SSLC_Certificate_='';
        if(this.Student_.SSLC_Certificate!='')
            is_apicall=1
    }
    else if(File_Name=='Plustwo_Certificate_')
    {
        this.Plustwo_Certificate_=null
        this.Display_Plustwo_Certificate_='';
        if(this.Student_.Plustwo_Certificate!='')
            is_apicall=1
    }


    if(is_apicall==1)
    {
        this.issLoading=true
        this.Student_Service_.Delete_Student_File(this.Student_.Student_Id,File_Name).subscribe(Delete_status => {
            
           
            this.issLoading=false
            if(Delete_status[0][0].Student_Id_>0)
            {
                if(File_Name=='Photo')
                    this.Student_.Photo=''
                 else if(File_Name=='Aadhaar_')
                    this.Student_.Aadhaar=''     

                    else if(File_Name=='Aadhaar_Back_')
                    this.Student_.Aadhaar_Back=''  
                    else if(File_Name=='SSLC_Certificate_')
                    this.Student_.SSLC_Certificate=''  
                    else if(File_Name=='Plustwo_Certificate_')
                    this.Student_.Plustwo_Certificate=''  



            const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type: "false"}});
            }});
         
    }

}

Delete_Student_Document(index,Student_Document_Id)
{
    
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>

{
if(result=='Yes')
{
this.issLoading=true;

if(Student_Document_Id>0)
{
this.Student_Service_.Delete_Student_Document(Student_Document_Id).subscribe(Delete_status => {

    
if(Delete_status[0][0].Student_Document_Id_>0){
    this.Document_Array.splice(index ,1);
    this.Document_File_Array.splice(index ,1);
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
else
{
this.Document_Array.splice(index ,1);
this.Document_File_Array.splice(index ,1);
this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type: "false"}});
}

}
});
}
Delete_File1(index){

 
   
}

Remove_Document(i)
{
    this.Document_Array.splice(i)
    this.Document_File_Array.splice(i)
}

Get_Activity_Details(Student_Id)

{
    
  this.Student_Service_.Get_Activity_Details(Student_Id).subscribe(Rows => {
    
    
    if (Rows != null) {
      
         this.ActivityDetails_Datas=Rows[0];
      }
       
     },
   Rows => {
  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
  });
}

ExaminationheldDate()
{
    debugger;
    var myDate = this.Student_Course_.End_Date;
    //var new_mydate="";
    this.Examinationheldon_Date = new Date(myDate);
this.Examinationheldon_Date.setMonth(this.Examinationheldon_Date.getMonth()+1);
var months="",years="";
for(var im=0;im<this.Student_Course_Part_Data.length;im++)
{
    months=this.Student_Course_Part_Data[im].Month_Name;
    years=this.Student_Course_Part_Data[im].Year_Name;
}
this.new_mydate=months + '  '+years;
//this.Examinationheldon_Date.setMonth(this.Examinationheldon_Date.getMonth());this.Student_Course_.Certificate_Date;//
// this.month_date= this.Student_Course_.End_Date; 
//   var Examheldon = this.month_date;
//   var Heldon = new Date(Examheldon);
//   Heldon.setMonth(this.month_date.getMonth()+1)
//   this.Examinationheld_Date=Heldon;

}


}

