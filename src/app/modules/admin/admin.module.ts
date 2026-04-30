/***
 * Admin module
 * Declare all componets that is used in admin module
 */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MatTableModule, MatProgressSpinnerModule, MatDialogModule, MatAutocompleteModule, MatPaginatorModule, MatToolbarModule, MatSidenavModule, MatSortModule, MatMenuModule, MatIconModule, MatButtonModule, MatSelectModule, MatFormFieldModule, MatDatepickerModule, MatExpansionModule } from '@angular/material';
import { MatNativeDateModule} from '@angular/material';
import { SharedModule } from '../shared-module/shared-module';
import { AdminRoutes } from './admin.routing';
import { AdminComponent } from './admin.component';
import {HttpClientModule} from '@angular/common/http';
import { GoogleChartsModule } from 'angular-google-charts';
import { Home_PageComponent } from './Home_Page/Home_Page.component'; 
import { AccountsComponent } from './Accounts/Accounts.component';
// import { AgentComponent, Agent_oldComponent } from './Agent_old/Agent_old.component';
import { Activity_ReportComponent } from './Activity_Report/Activity_Report.component';
import { Agent_CommisionComponent } from './Agent_Commision/Agent_Commision.component';
import { Agent_Course_TypeComponent } from './Agent_Course_Type/Agent_Course_Type.component';
import { BatchComponent } from './Batch/Batch.component';
import { CandidateComponent } from './Candidate/Candidate.component';
import { Candidate_FollowupComponent } from './Candidate_Followup/Candidate_Followup.component';
import { Applied_CandidateComponent } from './Applied_Candidate/Applied_Candidate.component';
import { CategoryComponent } from './Category/Category.component';
import { Certificate_RequestComponent } from './Certificate_Request/Certificate_Request.component';
import { CertificatesComponent } from './Certificates/Certificates.component';
import { CourseComponent } from './Course/Course.component';
import { Course_FeesComponent } from './Course_Fees/Course_Fees.component';
import { Course_Import_DetailsComponent } from './Course_Import_Details/Course_Import_Details.component';
import { Course_Import_MasterComponent } from './Course_Import_Master/Course_Import_Master.component';
import { Course_SubjectComponent } from './Course_Subject/Course_Subject.component';
import { Course_TypeComponent } from './Course_Type/Course_Type.component';
import { DocumentComponent } from './Document/Document.component';
import { Exam_DetailsComponent } from './Exam_Details/Exam_Details.component';
import { Exam_MasterComponent } from './Exam_Master/Exam_Master.component';
import { ExperienceComponent } from './Experience/Experience.component';
import { Fees_ReceiptComponent } from './Fees_Receipt/Fees_Receipt.component';
import { Fees_TypeComponent } from './Fees_Type/Fees_Type.component';
import { Followup_TypeComponent } from './Followup_Type/Followup_Type.component';
import { Functionl_AreaComponent } from './Functionl_Area/Functionl_Area.component';
import { Job_PostingComponent } from './Job_Posting/Job_Posting.component';
import { Mark_ListComponent } from './Mark_List/Mark_List.component';
import { PartComponent } from './Part/Part.component';
import { QualificationComponent } from './Qualification/Qualification.component';
import { QuestionComponent } from './Question/Question.component';
import { Question_ImportComponent } from './Question_Import/Question_Import.component';
import { SettingsComponent } from './Settings/Settings.component';
import { SpecializationComponent } from './Specialization/Specialization.component';
import { StatusComponent } from './Status/Status.component';
import { StudentComponent } from './Student/Student.component';
import { Student_CourseComponent } from './Student_Course/Student_Course.component';
import { Student_Course_SubjectComponent } from './Student_Course_Subject/Student_Course_Subject.component';
import { Student_FollowupComponent } from './Student_Followup/Student_Followup.component';
import { Study_MaterialsComponent } from './Study_Materials/Study_Materials.component';
import { SubjectComponent } from './Subject/Subject.component';
import { UniversityComponent } from './University/University.component';
import { University_FollowupComponent } from './University_Followup/University_Followup.component';
import { User_RoleComponent } from './User_Role/User_Role.component';
import { User_TypeComponent } from './User_Type/User_Type.component';
import { UsersComponent } from './Users/Users.component';
import { Account_VoucherComponent } from './Account_Voucher/Account_Voucher.component';
import { LedgerComponent } from './Ledger/Ledger.component';
import { Payment_VoucherComponent } from './Payment_Voucher/Payment_Voucher.component';

 import { NgxBarcode6Module } from 'ngx-barcode6';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { from } from 'rxjs';
import { ActivityComponent } from './Activity/Activity.component';
import { Candidate_Job_ApplyComponent } from './Candidate_Job_Apply/Candidate_Job_Apply.component';
import { Fees_InstalmentComponent } from './Fees_Instalment/Fees_Instalment.component';
import { Question_Import_DetailsComponent } from './Question_Import_Details/Question_Import_Details.component';
import { Question_Import_MasterComponent } from './Question_Import_Master/Question_Import_Master.component';
import { Activity_DetailsComponent } from './Activity_Details/Activity_Details.component';
import { Old_Student_RegistrationComponent } from './Old_Student_Registration/Old_Student_Registration.component';
import { SubscriptionComponent } from './Subscription/Subscription.component';
import { AgentComponent } from './Agent/Agent.component';
import { Student_PaymentComponent } from './Student_Payment/Student_Payment.component';
import { MatTabsModule } from '@angular/material/tabs'


@NgModule({
  imports: [RouterModule.forChild(AdminRoutes),SharedModule,MatTableModule,HttpClientModule,
  MatPaginatorModule,MatSortModule, MatIconModule,MatMenuModule,GoogleChartsModule,MatSelectModule,
  MatButtonModule, MatDialogModule, MatToolbarModule, MatExpansionModule, MatSidenavModule, 
  MatAutocompleteModule, MatProgressSpinnerModule,MatFormFieldModule,MatDatepickerModule,
  ScrollingModule,FormsModule,NgxBarcode6Module,HttpModule, MatTabsModule],

declarations: [AdminComponent, Home_PageComponent, AccountsComponent,
    AgentComponent,
    Agent_CommisionComponent,Activity_ReportComponent,
    Agent_Course_TypeComponent,
    BatchComponent,
    CandidateComponent,
    Candidate_FollowupComponent,
    Applied_CandidateComponent,
    CategoryComponent,Payment_VoucherComponent,
    Certificate_RequestComponent,
    CertificatesComponent,Account_VoucherComponent,
    CourseComponent,
    Course_FeesComponent,
    Course_Import_DetailsComponent,
    Course_Import_MasterComponent,
    Course_SubjectComponent,
    Course_TypeComponent,
    DocumentComponent,
    Exam_DetailsComponent,
    Exam_MasterComponent,
    ExperienceComponent,
    Fees_ReceiptComponent,
    Fees_TypeComponent,
    Followup_TypeComponent,
    Functionl_AreaComponent,
    Job_PostingComponent,
    Mark_ListComponent,
    PartComponent,
    QualificationComponent,
    QuestionComponent,
    Question_ImportComponent,
    SettingsComponent,
    SpecializationComponent,
    StatusComponent,
    StudentComponent,
    Student_CourseComponent,
    Student_Course_SubjectComponent,
    Student_FollowupComponent, Home_PageComponent,
    Study_MaterialsComponent,
    SubjectComponent,
    UniversityComponent,
    University_FollowupComponent,    
    User_RoleComponent,
    User_TypeComponent,LedgerComponent,
    ActivityComponent,
    Candidate_Job_ApplyComponent,
    Fees_InstalmentComponent,
    Question_Import_DetailsComponent,
    Question_Import_MasterComponent,
    Activity_DetailsComponent,
    UsersComponent,
    Old_Student_RegistrationComponent,SubscriptionComponent,Student_PaymentComponent
    // ,Agent_oldComponent
 ]
})

export class AdminModule { }
