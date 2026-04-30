import { Duration_Type } from './../../../models/Duration_Type';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course_Service } from '../../../services/Course.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Course } from '../../../models/Course';
import { Course_Fees } from '../../../models/Course_Fees';
import { Course_Subject } from '../../../models/Course_Subject';
import { Study_Materials } from '../../../models/Study_Materials';
import { Fees_Type } from '../../../models/Fees_Type';
import { University } from '../../../models/University';
import { Course_Type } from '../../../models/Course_Type';
import { Part } from '../../../models/Part';
import { Online_Exam_Status } from '../../../models/Online_Exam_Status';
import { Subject } from '../../../models/Subject';
import {Course_Mode} from '../../../models/Course_Mode'
import {Course_Term} from '../../../models/Course_Term'
import {MatDialog} from '@angular/material';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
// import { CourseStatusPipe } from '../../../components/pipes/course-status.pipe';

@Component({
    selector: 'app-Course',
    templateUrl: './Course.component.html',
    styleUrls: ['./Course.component.css']
})
export class CourseComponent implements OnInit {
    message: any;
    Entry_View:boolean=true;
    EditIndex: number;
    Total_Entries: number;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Course_Edit:boolean;
    Course_Save:boolean;
    Course_Delete:boolean;
    myInnerHeight: number;

    Course_: Course = new Course();
    Course_Data: Course[]
    
    Course_Name_Search: string;

    Course_Subject: Course_Subject = new Course_Subject();
    Course_Subject_Data: Course_Subject[]
    Course_Subject_Data_1: Course_Subject[]

    Course_Fees: Course_Fees = new Course_Fees();
    Course_Fees_Data: Course_Fees[]
    Course_Fees_Data_1: Course_Fees[]

    Study_Materials: Study_Materials=new Study_Materials;
    Study_Materials_Data: Study_Materials[];

    Course_Type: Course_Type = new Course_Type;
    Course_Type_Search: Course_Type = new Course_Type;
    Course_Type_Temp: Course_Type = new Course_Type;
    Course_Type_Data: Course_Type[]

    Fees_Type: Fees_Type = new Fees_Type;
    Fees_Type_Temp: Fees_Type = new Fees_Type;
    Fees_Type_Data: Fees_Type[]

    Part: Part = new Part;
    Part_Material: Part = new Part;
    Part_Temp: Part = new Part;
    Part_Data: Part[]

    Subject: Subject = new Subject;
    Subject_Materials: Subject = new Subject;
    Subject_Temp: Subject = new Subject;
    Subject_Data: Subject[]
    Subject_Data_Filter: Subject[]

    Online_Exam_Status: Online_Exam_Status = new Online_Exam_Status;
    Online_Exam_Status_Temp: Online_Exam_Status = new Online_Exam_Status;
    Online_Exam_Status_Data: Online_Exam_Status[]
    Exam_Status_:number;

    University_: University = new University;
    University_Temp: University = new University;
    University_Data: University[]
    University_Search: University = new University;
    Login_User_Id:number=0;

    Course_Subject_View:boolean = false;
    Course_Fees_View:boolean = false;
    Close_Click_View:boolean = false;
    Close_Click_Icon_View:boolean = false;
    Course_View:boolean = false;
    Course_ID :number;
    Course_Name_:string;
    Course_Code_:string;

    NoOfQuestion:boolean = false;
    ExamDuration:boolean = false;
    Exam_:boolean = false;

    myTotalHeight:number;
    CourseHeight:number;

    Course_Fees_Index: number = -1;
    Course_Subject_Index: number = -1;
    Study_Materials_Index: number = -1;

    Duration_Type_:Duration_Type=new Duration_Type;
    Duration_Type_Temp:Duration_Type=new Duration_Type;
    Duration_Type_Data:Duration_Type[];


    Course_Mode_Data:Course_Mode[]
    Course_Mode_:Course_Mode= new Course_Mode();

    Course_Term_Data:Course_Term[]
    Course_Term_:Course_Term= new Course_Term();

    
    Instalment_Type_:Duration_Type=new Duration_Type;
    // Instalment_Type_Temp:Duration_Type=new Duration_Type;
    // Instalment_Type_Data:Duration_Type[];
constructor(public Course_Service_:Course_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog)
 { 
    
 }

ngOnInit() 
{
    this.Login_User_Id = Number(localStorage.getItem('Login_User'));
    this.Permissions = Get_Page_Permission(12);
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.Course_Edit=this.Permissions.Edit;
    this.Course_Save=this.Permissions.Save;
    this.Course_Delete=this.Permissions.Delete;
    this.Page_Load()
    }

    this.Course_Mode_Data  =[];
    this.Course_Mode_Data.push({'Course_Mode_Id':0,'Course_Mode_Name':'Select'});
    this.Course_Mode_Data.push({'Course_Mode_Id':1,'Course_Mode_Name':'Online'});
    this.Course_Mode_Data.push({'Course_Mode_Id':2,'Course_Mode_Name':'Offline'});

    this.Course_Term_Data  =[];
    this.Course_Term_Data.push({'Course_Term_Id':0,'Course_Term_Name':'Select'});
    this.Course_Term_Data.push({'Course_Term_Id':1,'Course_Term_Name':'Long Term'});
    this.Course_Term_Data.push({'Course_Term_Id':2,'Course_Term_Name':'Short Term'});



}
Page_Load()
{
    debugger
    this.myInnerHeight = (window.innerHeight);
        this.myTotalHeight=this.myInnerHeight;
        this.myTotalHeight=this.myTotalHeight-300;
        this.myInnerHeight = this.myInnerHeight - 100;
        

    this.Clr_Course();
    this.Search_Course();
    this.Entry_View=false;
    this.Load_Duration_Type();
    this.Load_Course_DropDowns();
    this.Load_University();
}

onTabChange(index: number): void {
  if (index === 1) {  // index starts at 0
    this.loadPendingCourses();
  }else{
     this.Search_Course();
  }
}

loadPendingCourses(): void {
 var Course_Type_Id=0,University_Id=0;

    if (this.Course_Type_Search != undefined && this.Course_Type_Search != null)
        if (this.Course_Type_Search.Course_Type_Id != undefined && this.Course_Type_Search.Course_Type_Id != null)
            Course_Type_Id = this.Course_Type_Search.Course_Type_Id;

    if (this.University_Search != undefined && this.University_Search != null)
        if (this.University_Search.University_Id != undefined && this.University_Search.University_Id != null)
            University_Id = this.University_Search.University_Id;

    this.issLoading=true;
    this.Course_Service_.Search_pending_Course(this.Course_Name_Search, Course_Type_Id,University_Id).subscribe(Rows => {  
    this.Course_Data=Rows[0];
    this.Total_Entries=this.Course_Data.length;    
    if(this.Course_Data.length==0)
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


trackByFn(index, item) 
{
return index;
}
Load_Course_DropDowns()
{
    this.Course_Service_.Load_Course_DropDowns().subscribe(Rows => {

        if (Rows != null) {

            // this.Course_Type_Data = Rows[0];
            // this.Course_Type_Temp.Course_Type_Id = 0;
            // this.Course_Type_Temp.Course_Type_Name = "Select";
            // this.Course_Type_Data.unshift(this.Course_Type_Temp);
            // this.Course_Type = this.Course_Type_Data[0]
            // this.Course_Type_Search = this.Course_Type_Data[0]

            this.Fees_Type_Data = Rows[1];
            this.Fees_Type_Temp.Fees_Type_Id = 0;
            this.Fees_Type_Temp.Fees_Type_Name = "Select";
            this.Fees_Type_Data.unshift(this.Fees_Type_Temp);
            this.Fees_Type = this.Fees_Type_Data[0]

            this.Part_Data = Rows[2];
            this.Part_Temp.Part_Id = 0;
            this.Part_Temp.Part_Name = "Select";
            this.Part_Data.unshift(this.Part_Temp);
            this.Part = this.Part_Data[0]

            this.Online_Exam_Status_Data = Rows[3];
            this.Online_Exam_Status_Temp.Online_Exam_Status_Id = 0;
            this.Online_Exam_Status_Temp.Online_Exam_Status_Name = "Select";
            this.Online_Exam_Status_Data.unshift(this.Online_Exam_Status_Temp);
            this.Online_Exam_Status = this.Online_Exam_Status_Data[0]
    }

        this.issLoading = false;
    },
        Rows => {
            this.issLoading = false;
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
        });
}
Load_University()
{
    this.Course_Service_.Load_University().subscribe(Rows => {
        if (Rows != null) {
            this.University_Data = Rows[0];
            this.University_Temp.University_Id = 0;
            this.University_Temp.University_Name = "Select";
            this.University_Data.unshift(this.University_Temp);
            this.University_ = this.University_Data[0];
            this.University_Search = this.University_Data[0];
    }
        this.issLoading = false;
    },
    Rows => {
        this.issLoading = false;
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
    });
}
Load_Duration_Type()
{
    this.Course_Service_.Load_Duration_Type().subscribe(Rows => {
        if (Rows != null) {
            this.Duration_Type_Data = Rows[0];
            this.Duration_Type_Temp.Duration_Type_Id = 0;
            this.Duration_Type_Temp.Duration_Type_Name = "Select";
            this.Duration_Type_Data.unshift(this.Duration_Type_Temp);
            this.Duration_Type_ = this.Duration_Type_Data[0];
            
            this.Instalment_Type_ = this.Duration_Type_Data[0];
    }
        this.issLoading = false;
    },
    Rows => {
        this.issLoading = false;
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
    });
}
Create_New()
{
    this.Entry_View = true;
    this.Course_View = true;
    this.Course_Fees_View = false;
    this.Course_Subject_View = false;
    this.Close_Click_View = true;
    this.Close_Click_Icon_View = true;
    this.Clr_Course();
    this.Clr_Course_Fees();
    this.Clr_Course_Subject();
    this.Course_Fees_Data=[];
    this.Course_Subject_Data=[]
}
Close_Click()
{
    let top = document.getElementById('Topdiv');
    if (top !== null) {
    top.scrollIntoView();
    top = null;
    }
    // this.Search_Course();
    this.Clr_Course();
    this.Clr_Course_Fees();
    this.Clr_Course_Subject();
    this.Course_Fees_Data = [];
    this.Course_Subject_Data = []
    this.Entry_View = false;
    this.Search_Course();
}
Clr_Course()
{
    this.Course_.Course_Id=0;
    this.Course_.Course_Name="";
    this.Course_.User_Id = 0;
    this.Course_.Course_Type_Name = '';
    this.Course_.Duration=null;
    this.Course_.Course_Code=null;

    // this.Course_.Agent_Amount= 0;
    this.Course_.User_Id = 0;
    // this.Course_.Total_Fees=0;
    // this.Course_.Studymaterials_Fees=0;
    // this.Course_.Coaching_Fees=0;
    // this.Course_.Service_Fees=0;
    // this.Course_.University_Amount=0;
    this.Course_Fees_Data = [];
    this.Course_Subject_Data = []
    if (this.Course_Type_Data != undefined && this.Course_Type_Data != null)
        this.Course_Type = this.Course_Type_Data[0];

    if (this.University_Data != undefined && this.University_Data != null)
    this.University_ = this.University_Data[0];

    if (this.Course_Mode_Data != undefined && this.Course_Mode_Data != null)
    this.Course_Mode_ = this.Course_Mode_Data[0];

    if (this.Course_Term_Data != undefined && this.Course_Term_Data != null)
    this.Course_Term_ = this.Course_Term_Data[0];


    
    if (this.Duration_Type_Data != undefined && this.Duration_Type_Data != null)
    this.Duration_Type_ = this.Duration_Type_Data[0];
}
Search_Course()
{
    
   var Course_Type_Id=0,University_Id=0;

    if (this.Course_Type_Search != undefined && this.Course_Type_Search != null)
        if (this.Course_Type_Search.Course_Type_Id != undefined && this.Course_Type_Search.Course_Type_Id != null)
            Course_Type_Id = this.Course_Type_Search.Course_Type_Id;

    if (this.University_Search != undefined && this.University_Search != null)
        if (this.University_Search.University_Id != undefined && this.University_Search.University_Id != null)
            University_Id = this.University_Search.University_Id;

    this.issLoading=true;
    this.Course_Service_.Search_Course(this.Course_Name_Search, Course_Type_Id,University_Id).subscribe(Rows => {  
              ;
    this.Course_Data=Rows[0];
    this.Total_Entries=this.Course_Data.length;    
    if(this.Course_Data.length==0)
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
Delete_Course(Course_Id: number, index: number, Request_Status: number) {
  const dialogRef = this.dialogBox.open(DialogBox_Component, {
    panelClass: 'Dialogbox-Class',
    data: { Message: 'Do you want to delete ?', Type: true, Heading: 'Confirm' }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 'Yes') {
      this.issLoading = true;

      this.Course_Service_.Delete_Course(Course_Id, Request_Status).subscribe({
        next: (Delete_status: any) => {
          Delete_status = Delete_status[0][0].DeleteStatus_.data[0];
          if (Delete_status == 1) {
            this.Course_Data.splice(index, 1);
            this.dialogBox.open(DialogBox_Component, {
              panelClass: 'Dialogbox-Class',
              data: { Message: 'Deleted', Type: "false" }
            });
          } else {
            this.dialogBox.open(DialogBox_Component, {
              panelClass: 'Dialogbox-Class',
              data: { Message: 'Cannot be Deleted', Type: "2" }
            });
          }
          this.issLoading = false;
        },
        error: () => {
          this.issLoading = false;
          this.dialogBox.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Error Occurred', Type: "2" }
          });
        }
      });
    }
  });
}
Accept_Course(Course_Id: number, index: number, Request_Status: number) {
  const dialogRef = this.dialogBox.open(DialogBox_Component, {
    panelClass: 'Dialogbox-Class',
    data: { Message: 'Do you want to Accept ?', Type: true, Heading: 'Confirm' }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 'Yes') {
      this.issLoading = true;

      this.Course_Service_.Accept_Course(Course_Id, Request_Status).subscribe({
        next: (Accept_status: any) => {
            console.log("Accept_status",Accept_status);
            
          Accept_status = Accept_status[0][0].AcceptStatus_.data[0];
          if (Accept_status == 1) {
            this.Course_Data.splice(index, 1);
            this.dialogBox.open(DialogBox_Component, {
              panelClass: 'Dialogbox-Class',
              data: { Message: 'Accepted', Type: "false" }
            });
          } else {
            this.dialogBox.open(DialogBox_Component, {
              panelClass: 'Dialogbox-Class',
              data: { Message: 'Cannot be Accepted', Type: "2" }
            });
          }
          this.issLoading = false;
        },
        error: () => {
          this.issLoading = false;
          this.dialogBox.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Error Occurred', Type: "2" }
          });
        }
      });
    }
  });
}
Search_Subject_Typeahead(event: any) 
{
    var Value = "";
    if (event.target.value == "")
        Value = "";
    else
        Value = event.target.value.toLowerCase();
    if (this.Subject_Data == undefined || this.Subject_Data.length == 0)
    {
        this.issLoading = true;
        this.Course_Service_.Search_Subject_Typeahead(Value).subscribe(Rows => {
        if (Rows != null) {
        
            this.Subject_Data = Rows[0];
            this.Subject_Data_Filter=[];
            for (var i=0;i<this.Subject_Data.length;i++)
            {
                if(this.Subject_Data[i].Subject_Name.toLowerCase().includes(Value))
                    this.Subject_Data_Filter.push(this.Subject_Data[i])
            }

        }
        this.issLoading = false;
    },
        Rows => {
            this.issLoading = false;
        });
    }
    else
    {
        this.Subject_Data_Filter=[];
        for (var i=0;i<this.Subject_Data.length;i++)
        {
            if(this.Subject_Data[i].Subject_Name.toLowerCase().includes(Value))
                this.Subject_Data_Filter.push(this.Subject_Data[i])
        }
    }
}
display_Subject(Subject_e: Subject) 
{    
    if (Subject_e) { return Subject_e.Subject_Name; }
}

Clr_Course_Fees()
 {
this.Course_Fees.Course_Fees_Id=0;
this.Course_Fees.Course_Id=0;
this.Course_Fees.Amount=0;
this.Course_Fees.No_Of_Instalment="";
this.Course_Fees.Instalment_Period="";
this.Course_Fees.Agent_Amount=0
this.Course_Fees.University_Amount=0;
this.Course_Fees.Studymaterials_Fees=0;
this.Course_Fees.Coaching_Fees=0;
this.Course_Fees.Service_Fees=0;
this.Course_Fees.Total_Fees=0;
this.Course_Fees.From_Year=0;
this.Course_Fees.To_Year=0;

if (this.Fees_Type_Data != undefined && this.Fees_Type_Data != null)
    this.Fees_Type = this.Fees_Type_Data[0];

    if (this.Duration_Type_Data != undefined && this.Duration_Type_Data != null)
    this.Instalment_Type_ = this.Duration_Type_Data[0];

}
// Delete_Course_Fees(Course_Fees:Course_Fees,index)
// {
  
//     this.Course_Fees_Data.splice(index, 1);
//  this.Clr_Course_Fees();
// }
Delete_Course_Fees(Course_Fees_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
    {
        this.issLoading=true;
        this.Course_Service_.Delete_Course_Fees_Details(Course_Fees_Id).subscribe(Delete_status => {
            
            // Delete_status = Delete_status[0];
            // Delete_status = Delete_status[0].DeleteStatus_;
        if(Delete_status[0][0].Course_Fees_Id_>0)
        {
        this.Course_Fees_Data.splice(index, 1);
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type: "false"}});
        this.Clr_Course_Subject();
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
Plus_Course_Fees(event)
{
    
    if (this.Fees_Type.Fees_Type_Id == undefined || this.Fees_Type.Fees_Type_Id == null || this.Fees_Type.Fees_Type_Id == 0 || this.Fees_Type==null )
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Select Fees Type ',Type:"3"}});
        return
    }
    else if (this.Course_Fees.Amount == undefined || this.Course_Fees.Amount == null || this.Course_Fees.Amount==0 )
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter the Amount',Type:"3"}});
        return
    } 
    else if (this.Course_Fees.No_Of_Instalment == undefined || this.Course_Fees.No_Of_Instalment == null || this.Course_Fees.No_Of_Instalment=="" )
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter the No Of Instalment',Type:"3"}});
        return
    } 
    
    else if (this.Instalment_Type_.Duration_Type_Id == 0 || this.Instalment_Type_.Duration_Type_Id == undefined || this.Instalment_Type_.Duration_Type_Id == null||this.Instalment_Type_ == undefined || this.Instalment_Type_ == null  )
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Select Instalment Type',Type:"3"}});
        return
    } 
    else if (this.Course_Fees.Instalment_Period == undefined || this.Course_Fees.Instalment_Period == null || this.Course_Fees.Instalment_Period=="" )
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter the Instalment Period',Type:"3"}});
        return
    }
    
    else if (this.Course_Fees.Agent_Amount == undefined || this.Course_Fees.Agent_Amount == null || this.Course_Fees.Agent_Amount==0 )
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter the Agent Amount',Type:"3"}});
        return
    }
    else if (this.Course_Fees.University_Amount == undefined || this.Course_Fees.University_Amount == null || this.Course_Fees.University_Amount==0 )
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter the University Amount',Type:"3"}});
        return
    }
    else if (this.Course_Fees.Studymaterials_Fees == undefined || this.Course_Fees.Studymaterials_Fees == null || this.Course_Fees.Studymaterials_Fees==0 )
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter the Studymaterials Fees',Type:"3"}});
        return
    }
    else if (this.Course_Fees.Coaching_Fees == undefined || this.Course_Fees.Coaching_Fees == null || this.Course_Fees.Coaching_Fees==0 )
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter the Coaching Fees',Type:"3"}});
        return
    }
    // else if (this.Course_Fees.Total_Fees == undefined || this.Course_Fees.Total_Fees == null || this.Course_Fees.Total_Fees==0 )
    // {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter the Total Fees',Type:"3"}});
    //     return
    // }

    else if (this.Course_Fees.From_Year == undefined || this.Course_Fees.From_Year == null || this.Course_Fees.From_Year==0 )
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter the From Year',Type:"3"}});
        return
    }


    else if (this.Course_Fees.To_Year == undefined || this.Course_Fees.To_Year == null || this.Course_Fees.To_Year==0 )
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter the To Year',Type:"3"}});
        return
    }


    
    if (this.Course_Fees_Data == undefined)
        this.Course_Fees_Data = [];
    if (this.Course_Fees_Data_1 == undefined)
        this.Course_Fees_Data_1 = [];
        
    this.Course_Fees.Fees_Type_Id = this.Fees_Type.Fees_Type_Id
    this.Course_Fees.Fees_Type_Name = this.Fees_Type.Fees_Type_Name
    this.Course_Fees.Instalment_Type_Id = this.Instalment_Type_.Duration_Type_Id
    this.Course_Fees.Course_Id = this.Course_.Course_Id;
    this.Course_Fees_Data_1 = [];
    if (this.Course_Fees_Index >= 0) {
        this.Course_Fees_Data[this.Course_Fees_Index] = Object.assign({}, this.Course_Fees)// this.Sales_Details_;
        this.Course_Fees_Data_1.push(Object.assign({}, this.Course_Fees));
        // this.Course_Fees_Data_1[this.Course_Fees_Index] = Object.assign({}, this.Course_Fees)
        // var x = document.getElementById("snackbar");
        // x.className = "show";
        // setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    // this.Course_Subject_Data.push(Object.assign({}, this.Course_Subject));
        }
        else {
        this.Course_Fees_Data.push(Object.assign({}, this.Course_Fees));
        this.Course_Fees_Data_1.push(Object.assign({}, this.Course_Fees));
        // var x = document.getElementById("snackbar");
        // x.className = "show";
        // setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        }
        
    this.Course_Fees_Index=-1;
    this.Clr_Course_Fees();
    this.Save_Course_Fees_Details(this.Course_Fees_Data_1);
    
}
Save_Course_Fees_Details(Course_Fees_Data_1)
{
//    if (this.Course_Fees_Data.length === undefined || this.Course_Fees_Data.length == null || this.Course_Fees_Data.length == 0) {
//         const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Add Atleast One Course Fees ', Type: "3" } });
//         return
//     }
       
    this.issLoading=true;
    //this.Course_.Course_Fees = this.Course_Fees_Data_1;     
    
    this.Course_Service_.Save_Course_Fees_Details(this.Course_Fees_Data_1).subscribe(Save_status => { 
      
    ;
    if(Number(Save_status[0].Fees_Type_Id_)>0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Added',Type:"false"}});
    //this.Get_Course(this.Course_.Course_Id);
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

Clr_Course_Subject()
{
this.Course_Subject.Course_Subject_Id=0;
//this.Course_Subject.Course_Id=null;
// this.Course_Subject.Part_Id=0;
// this.Course_Subject.Subject_Id=0;
// this.Course_Subject.Subject_Name="";
this.Course_Subject.Minimum_Mark="";
this.Course_Subject.Maximum_Mark="";
this.Course_Subject.Subject_Code = "";
// this.Course_Subject.Online_Exam_Status="";
this.Course_Subject.No_of_Question="";
this.Course_Subject.Exam_Duration="";
this.Course_Subject_Index=-1;
    if (this.Part_Data != undefined && this.Part_Data != null)
        this.Part = this.Part_Data[0];

    this.Subject = null;

    if (this.Online_Exam_Status_Data != undefined && this.Online_Exam_Status_Data != null)
        this.Online_Exam_Status = this.Online_Exam_Status_Data[0];
}



Delete_Course_Subject(Course_Subject_Id,index)
{
    
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
        {
        if(result=='Yes')
        {
            this.issLoading=true;
            this.Course_Service_.Delete_Course_Subject_Details(Course_Subject_Id).subscribe(Delete_status => {
            Delete_status = Delete_status[0];
            Delete_status = Delete_status[0].DeleteStatus_.data[0];                 
            if(Delete_status==1)
            {
            this.Course_Subject_Data.splice(index, 1);
            const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type: "false"}});
            this.Clr_Course_Subject();
            //this.Get_Course(this.Course_.Course_Id);
            }
            else
            {
            this.issLoading=false;
            const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Cannot be Deleted',Type:"2"}});
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
Plus_Course_Subject(event)
{
    this.Course_Subject_Data_1 = [];
    if (this.Part.Part_Id == undefined || this.Part.Part_Id == null || this.Part.Part_Id == 0 || this.Part==null )
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Select Part ',Type:"3"}});
        return
    }
    else if (this.Subject == null || this.Subject == undefined) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Subject ', Type: "3" } });
        return
    }
    else if (this.Online_Exam_Status.Online_Exam_Status_Id == undefined || this.Online_Exam_Status.Online_Exam_Status_Id == null || this.Online_Exam_Status.Online_Exam_Status_Id == 0 || this.Online_Exam_Status == null) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Exam Status ', Type: "3" } });
        return
    }
    if(this.Online_Exam_Status.Online_Exam_Status_Id == 1)
    {
        if (this.Course_Subject.No_of_Question == undefined || this.Course_Subject.No_of_Question == null || this.Course_Subject.No_of_Question == "") {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter the No Of Question', Type: "3" } });
            return
        }
        else if (this.Course_Subject.Exam_Duration == undefined || this.Course_Subject.Exam_Duration == null || this.Course_Subject.Exam_Duration == "") {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter the Exam Duration', Type: "3" } });
            return
        }
    }   

    if (this.Course_Subject_Data == undefined)
        this.Course_Subject_Data = [];
    if (this.Course_Subject_Data_1 == undefined)
        this.Course_Subject_Data_1 = [];
        
    this.Course_Subject.Part_Id = this.Part.Part_Id
   
    this.Course_Subject.Part_Name = this.Part.Part_Name
    this.Course_Subject.User_Id = this.Login_User_Id;
    if(this.Subject.Subject_Id==undefined||this.Subject.Subject_Id==null)
    {
        this.Course_Subject.Subject_Id=0
        this.Course_Subject.Subject_Name=String(this.Subject);
    }
    else
    {
        this.Course_Subject.Subject_Id = this.Subject.Subject_Id
        this.Course_Subject.Subject_Name = this.Subject.Subject_Name
    }
    // this.Course_Subject.Subject_Id = this.Subject.Subject_Id
    // this.Course_Subject.Subject_Name = this.Subject.Subject_Name
    this.Course_Subject.Online_Exam_Status = this.Online_Exam_Status.Online_Exam_Status_Id
    this.Course_Subject.Online_Exam_Status_Name = this.Online_Exam_Status.Online_Exam_Status_Name
    this.Course_Subject.Course_Id = this.Course_ID;
    this.Course_Subject_Data_1=[]

        this.Course_Subject_Data_1.push(Object.assign({}, this.Course_Subject));
    
    //this.Course_Subject_Index=-1;
    
    this.Save_Course_Subject_Details(this.Course_Subject_Data_1);
    
}
Save_Course_Subject_Details(Course_Subject_Data_1)
{   
    // if (this.Course_Subject_Data.length === undefined || this.Course_Subject_Data.length == null || this.Course_Subject_Data.length == 0) {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Add Atleast One Course Subject ', Type: "3" } });
    //     return
    // }    
    this.issLoading=true;   
    // this.Course_.Course_Subject = this.Course_Subject_Data_1;
  //console.log(this.Subject.Subject_Id)  
  
  
    this.Course_Subject.Technical_Minimum_Mark = '';
    this.Course_Subject.Technical_Maximum_Mark = '';
    this.Course_Subject.Internal_Minimum_Mark = '';
    this.Course_Subject.Internal_Maximum_Mark = '';
    this.Course_Subject.External_Minimum_Mark = '';
    this.Course_Subject.External_Maximum_Mark = '';
    this.Course_Subject.Minimum_Mark = '';
    this.Course_Subject.Maximum_Mark = '';
    // this.Course_.Study_Materials = this.Study_Materials_Data;
  
    this.Course_Service_.Save_Course_Subject_Details(this.Course_Subject_Data_1).subscribe(Save_status => {
    // Save_status=Save_status[0];
    
    if(Number(Save_status[0].Subject_Id_)>0)
    {
        this.Course_Subject.Subject_Code = Save_status[0].Subject_Code_;
        if (this.Course_Subject_Index >= 0) 
        {
            this.Course_Subject_Data[this.Course_Subject_Index] = Object.assign({}, this.Course_Subject)
        }
         else
        {              
            this.Course_Subject_Data.push(Object.assign({}, this.Course_Subject));              
        }
            this.Clr_Course_Subject();               
    this.Get_Course_Subject_Details(this.Course_ID)  
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});    
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
Save_Course()
{
    if(this.Course_.Course_Name===undefined || this.Course_.Course_Name==null || this.Course_.Course_Name=="")
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Course ',Type: "3" }});
    return  
    }
    // else if (this.Course_Type.Course_Type_Id == undefined || this.Course_Type.Course_Type_Id == null || this.Course_Type.Course_Type_Id == 0 || this.Course_Type==null )
    // {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Select Course Type ',Type:"3"}});
    //     return
    // }
    // else if (this.Course_.Agent_Amount === undefined || this.Course_.Agent_Amount == null || this.Course_.Agent_Amount==0)
    // {
    // const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Agent Amount ',Type: "3" }});
    // return  
    // }
    // else if (this.Course_.Total_Fees === undefined || this.Course_.Total_Fees == null || this.Course_.Total_Fees==0)
    // {
    // const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Total Fees ',Type: "3" }});
    // return  
    // }


else if (this.Course_Mode_ === undefined || this.Course_Mode_ == null || this.Course_Mode_.Course_Mode_Id== 0 )
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Course Mode ',Type: "3" }});
    return  
    }


    else if (this.Course_Term_=== undefined || this.Course_Term_== null || this.Course_Term_.Course_Term_Id==0)
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Course Mode ',Type: "3" }});
    return  
    }


    else if (this.Course_.Course_Code===undefined || this.Course_.Course_Code==null || this.Course_.Course_Code=="")
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Course Code',Type:"3"}});
        return
    } 
    else if (this.University_.University_Id == 0 || this.University_.University_Id == undefined || this.University_.University_Id == null||this.University_ == undefined || this.University_ == null  )
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Select University',Type:"3"}});
        return
    } 
    else if (this.Duration_Type_.Duration_Type_Id == 0 || this.Duration_Type_.Duration_Type_Id == undefined || this.Duration_Type_.Duration_Type_Id == null||this.Duration_Type_ == undefined || this.Duration_Type_ == null  )
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Select Duration Type',Type:"3"}});
        return
    } 
    else if (this.Course_.Duration===undefined || this.Course_.Duration==null || this.Course_.Duration==0)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Duration',Type:"3"}});
        return
    } 


    this.issLoading=true;
    this.Course_.User_Id = this.Login_User_Id;
    this.Course_.Course_Type_Id = this.Course_Type.Course_Type_Id;
    this.Course_.Course_Type_Name = this.Course_Type.Course_Type_Name;
    this.Course_.University_Id = this.University_.University_Id;
    this.Course_.Duration_Type_Id = this.Duration_Type_.Duration_Type_Id;

    this.Course_.Course_Term=this.Course_Term_.Course_Term_Id;
    this.Course_.Course_Mode=this.Course_Mode_.Course_Mode_Id;
    ;
    this.Course_Service_.Save_Course(this.Course_).subscribe(Save_status => {
    // Save_status=Save_status[0];
        ;
    if(Number(Save_status[0].Course_Id_)>0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
    this.Close_Click();
    }
    else if(Number(Save_status[0].Course_Id_)==-1)
    {  
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'The Course Code is Already Exist for '+Save_status[0].Duplicate_Course_Name_,Type:"2"}});
       // this.Save_Call_Status = false;
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
Edit_Course(Course_e:Course,index)
{
    
    this.Entry_View=true;
    this.Course_View = true;
    this.Course_Fees_View = true;
    this.Course_Subject_View = false;
    this.Close_Click_View = true;
    this.Close_Click_Icon_View = true;
    this.Course_=Course_e;
    this.Course_=Object.assign({},Course_e);

    // for (var i = 0; i < this.Course_Type_Data.length; i++) {
    //     if (this.Course_Type_Data[i].Course_Type_Id == this.Course_.Course_Type_Id) {
    //         this.Course_Type = this.Course_Type_Data[i];
    //     }
    // }
    for (var i = 0; i < this.University_Data.length; i++) {
        if (this.University_Data[i].University_Id == this.Course_.University_Id) {
            this.University_ = this.University_Data[i];
        }
    }
    for (var i = 0; i < this.Duration_Type_Data.length; i++) {
        if (this.Duration_Type_Data[i].Duration_Type_Id == this.Course_.Duration_Type_Id) {
            this.Duration_Type_ = this.Duration_Type_Data[i];
        }
    }

    for (var i = 0; i < this.Course_Term_Data.length; i++) {
        if (this.Course_Term_Data[i].Course_Term_Id == this.Course_.Course_Term) {
            this.Course_Term_ = this.Course_Term_Data[i];
        }
    }

    for (var i = 0; i < this.Course_Mode_Data.length; i++) {
        if (this.Course_Mode_Data[i].Course_Mode_Id == this.Course_.Course_Mode) {
            this.Course_Mode_ = this.Course_Mode_Data[i];
        }
    }








    this.Get_Course(this.Course_.Course_Id)
}
Get_Course(Course_Id)
{
    this.issLoading = true;
    this.Course_Service_.Get_Course(this.Course_.Course_Id).subscribe(Rows => {
        
        this.Course_Fees_Data = Rows[0]
        // var Total_Course_Fees=0;
        // for (var i=0;i<this.Course_Fees_Data.length;i++)
        //     Total_Course_Fees=Total_Course_Fees + parseFloat( this.Course_Fees_Data[i].Amount.toString())
       // this.Course_.Total_Fees = Total_Course_Fees;
        this.issLoading = false;
    },
        Rows => {
            this.issLoading = false;
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
        });
}

Edit_Course_Fees(Course_Fees_e:Course_Fees,index)
{   
    
    this.Course_Fees_Index=index;
    this.Course_Fees = Object.assign({}, Course_Fees_e); 

    // if (this.Fees_Type_Data != undefined && this.Fees_Type_Data != null)
    //     this.Fees_Type = this.Fees_Type_Data[0];

    for (var i = 0; i < this.Fees_Type_Data.length; i++) {
        if (this.Fees_Type_Data[i].Fees_Type_Id == this.Course_Fees.Fees_Type_Id) {
            this.Fees_Type = this.Fees_Type_Data[i];
        }
    }
    for (var i = 0; i < this.Duration_Type_Data.length; i++) {
        if (this.Duration_Type_Data[i].Duration_Type_Id == this.Course_Fees.Instalment_Type_Id) {
            this.Instalment_Type_ = this.Duration_Type_Data[i];
        }
    }
}

Edit_Course_Subject(Course_Subject_e:Course_Subject,index)
{   
   
    this.Course_Subject_Index=index;
    this.Course_Subject = Object.assign({}, Course_Subject_e); 

    this.Subject_Temp.Subject_Id = this.Course_Subject.Subject_Id;
    this.Subject_Temp.Subject_Name = this.Course_Subject.Subject_Name;
    this.Subject = Object.assign({}, this.Subject_Temp);


    for (var i = 0; i < this.Part_Data.length;i++)
    {
        if (this.Part_Data[i].Part_Id == this.Course_Subject.Part_Id)
        {
            this.Part = this.Part_Data[i];
        }
    }
     for (var i = 0; i < this.Online_Exam_Status_Data.length;i++)
    {
         if (this.Online_Exam_Status_Data[i].Online_Exam_Status_Id == this.Course_Subject.Online_Exam_Status)
        {
            this.Online_Exam_Status = this.Online_Exam_Status_Data[i];
        }
    }
    if(this.Online_Exam_Status.Online_Exam_Status_Id ==1)
    this.Exam_ = true;
    else
        this.Exam_ = false; 
}

Edit_Study_Materials(Study_Materials_e:Study_Materials,index)
{   
   
        this.Study_Materials_Index=index;
    this.Study_Materials = Object.assign({}, Study_Materials_e);

    this.Subject_Temp.Subject_Id = this.Study_Materials.Subject_Id;
    this.Subject_Temp.Subject_Name = this.Study_Materials.Subject_Name;
    this.Subject_Materials = Object.assign({}, this.Subject_Temp);

    for (var i = 0; i < this.Part_Data.length;i++)
    {
        if (this.Part_Data[i].Part_Id == this.Study_Materials.Part_Id)
        {
            this.Part_Material = this.Part_Data[i];
        }
    }
}


//  Clr_Study_Materials()
//  {
// this.Study_Materials.Study_Materials_Id=0;
// this.Study_Materials.Course_Id=0;
// // this.Study_Materials.Part_Id=0;
// // this.Study_Materials.Subject_Id=0;
// this.Study_Materials.Course_Subject_Id=0;
// this.Study_Materials.Study_Materials_Name="";
// this.Study_Materials.File_Name="";


//      if (this.Part_Data != undefined && this.Part_Data != null)
//          this.Part_Material = this.Part_Data[0];

//      this.Subject_Materials = null;

// }
// Delete_Study_Materials(Study_Materials:Study_Materials,index)
// {
//     this.Study_Materials_Data.splice(index, 1);
//     this.Clr_Study_Materials();
// }
// Plus_Study_Materials(event)
// {
//     if (this.Part_Material.Part_Id == undefined || this.Part_Material.Part_Id == null || this.Part_Material.Part_Id == 0 || this.Part_Material==null )
//     {
//         const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Select Part ',Type:"3"}});
//         return
//     }
//     else if (this.Subject_Materials == null || this.Subject_Materials == undefined || this.Subject_Materials.Subject_Id == 0 || this.Subject_Materials.Subject_Id == null) {
//         const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Subject ', Type: "3" } });
//         return
//     }
//     else if (this.Study_Materials.Study_Materials_Name == undefined || this.Study_Materials.Study_Materials_Name == null || this.Study_Materials.Study_Materials_Name=="" )
//     {
//         const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter the Study Materials',Type:"3"}});
//         return
//     }

//     if (this.Study_Materials_Data == undefined)
//         this.Study_Materials_Data = [];
//     this.Study_Materials.Part_Id = this.Part_Material.Part_Id
//     this.Study_Materials.Subject_Id = this.Subject_Materials.Subject_Id

//     if (this.Study_Materials_Index >= 0) {
//         this.Study_Materials_Data[this.Study_Materials_Index] = Object.assign({}, this.Study_Materials)// this.Sales_Details_;
//         }
//         else {
//         this.Study_Materials_Data.push(Object.assign({}, this.Study_Materials));
//         }
//     this.Study_Materials_Index=-1;
//     this.Clr_Study_Materials();
// }
Add_Subject(Course_Id_temp,Course_Name_temp,Course_Code_Temp)
{
    
    this.Course_Subject_View = true;
    this.Entry_View=true;
    this.Course_Fees_View = false;
    this.Course_View = false;
    this.Course_ID = Course_Id_temp;
    this.Close_Click_View = false;
    this.Close_Click_Icon_View = false;
    this.Course_Name_ = Course_Name_temp;
    this.Course_Code_ = Course_Code_Temp;
    //this.Exam_Status_ = Online_Exam_Status_temp;
    this.Get_Course_Subject_Details(Course_Id_temp)
}
    Get_Course_Subject_Details(Course_Id_temp)
    {
        
        this.issLoading = true;
    this.Course_Service_.Get_Course_Subject_Details(Course_Id_temp).subscribe(Rows => {        
        
        
        this.Course_Subject_Data= Rows[0]     

        this.issLoading = false;
    },
        Rows => {
            this.issLoading = false;
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
        });
}
Exam_Status_Change()
{
    if(this.Online_Exam_Status.Online_Exam_Status_Id ==1)
        this.Exam_ = true;
    else
        this.Exam_ = false; 
}
}

