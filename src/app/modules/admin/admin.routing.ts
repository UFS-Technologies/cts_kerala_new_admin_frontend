/***
 * All routes with in admin module should be defined here
 */
import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { Home_PageComponent } from './Home_Page/Home_Page.component';
 import { AccountsComponent } from './Accounts/Accounts.component';
// import { AgentComponent, Agent_oldComponent } from './Agent_old/Agent_old.component';
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
import { Activity_ReportComponent } from './Activity_Report/Activity_Report.component';
import { ActivityComponent } from './Activity/Activity.component';
import { Account_VoucherComponent } from './Account_Voucher/Account_Voucher.component';
import { LedgerComponent } from './Ledger/Ledger.component';
import { Payment_VoucherComponent } from './Payment_Voucher/Payment_Voucher.component';
import { Candidate_Job_ApplyComponent } from './Candidate_Job_Apply/Candidate_Job_Apply.component';
import { Fees_InstalmentComponent } from './Fees_Instalment/Fees_Instalment.component';
import { Question_Import_DetailsComponent } from './Question_Import_Details/Question_Import_Details.component';
import { Question_Import_MasterComponent } from './Question_Import_Master/Question_Import_Master.component';
import { Activity_DetailsComponent } from './Activity_Details/Activity_Details.component';
import { Old_Student_RegistrationComponent } from './Old_Student_Registration/Old_Student_Registration.component';
import { SubscriptionComponent } from './Subscription/Subscription.component';
import { AgentComponent } from './Agent/Agent.component';
import { Student_PaymentComponent } from './Student_Payment/Student_Payment.component';
//import { Enquiry_Source_ReportComponent } from './Enquiry_Source_Report/Enquiry_Source_Report.component';


export const AdminRoutes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            { path: '', redirectTo: '/Home_Page', pathMatch: 'full' },
            { path: 'Accounts', component: AccountsComponent },
            { path: 'Agent', component: AgentComponent },
            { path: 'Agent_Commision', component: Agent_CommisionComponent },
            { path: 'Agent_Course_Type', component: Agent_Course_TypeComponent },
            { path: 'Batch', component: BatchComponent },
            { path: 'Candidate', component: CandidateComponent },
            { path: 'Candidate_Followup', component: Candidate_FollowupComponent },
            { path: 'Applied_Candidate', component: Applied_CandidateComponent },
            { path: 'Category', component: CategoryComponent },
            { path: 'Certificate_Request', component: Certificate_RequestComponent },
            { path: 'Certificates', component: CertificatesComponent },
            { path: 'Course', component: CourseComponent },
            { path: 'Course_Fees', component: Course_FeesComponent },
            { path: 'Course_Import_Details', component: Course_Import_DetailsComponent },
            { path: 'Course_Import_Master', component: Course_Import_MasterComponent },
            { path: 'Course_Subject', component: Course_SubjectComponent },
            { path: 'Course_Type', component: Course_TypeComponent },
            { path: 'Document', component: DocumentComponent },
            { path: 'Exam_Details', component: Exam_DetailsComponent },
            { path: 'Exam_Master', component: Exam_MasterComponent },
            { path: 'Experience', component: ExperienceComponent },
            { path: 'Fees_Receipt', component: Fees_ReceiptComponent },
            { path: 'Fees_Type', component: Fees_TypeComponent },
            { path: 'Followup_Type', component: Followup_TypeComponent },
            { path: 'Functionl_Area', component: Functionl_AreaComponent },
            { path: 'Job_Posting', component: Job_PostingComponent },
            { path: 'Mark_List', component: Mark_ListComponent },
            { path: 'Part', component: PartComponent },
            { path: 'Qualification', component: QualificationComponent },
            { path: 'Question', component: QuestionComponent },
            { path: 'Question_Import', component: Question_ImportComponent },
            { path: 'Settings', component: SettingsComponent },
            { path: 'Specialization', component: SpecializationComponent },
            { path: 'Status', component: StatusComponent },
            { path: 'Student', component: StudentComponent },
            { path: 'Student_Course', component: Student_CourseComponent },
            { path: 'Student_Course_Subject', component: Student_Course_SubjectComponent },
            { path: 'Student_Followup', component: Student_FollowupComponent },
            { path: 'Study_Materials', component: Study_MaterialsComponent },
            { path: 'Subject', component: SubjectComponent },
            { path: 'University', component: UniversityComponent },
            { path: 'University_Followup', component: University_FollowupComponent },
            { path: 'User_Role', component: User_RoleComponent },
            { path: 'User_Type', component: User_TypeComponent },
            { path: 'Users', component: UsersComponent },
            { path: 'Activity_Report', component: Activity_ReportComponent },
            { path: 'Home_Page', component: Home_PageComponent },
            { path: 'Activity', component: ActivityComponent },
            { path: 'Account_Voucher', component: Account_VoucherComponent },
            { path: 'Ledger', component: LedgerComponent },
            { path: 'Candidate_Job_Apply', component: Candidate_Job_ApplyComponent },
            { path: 'Fees_Instalment', component: Fees_InstalmentComponent },
            { path: 'Question_Import_Details', component: Question_Import_DetailsComponent },
            { path: 'Question_Import_Master', component: Question_Import_MasterComponent },
            { path: 'Payment_Voucher', component: Payment_VoucherComponent },
            { path: 'Activity_Details', component: Activity_DetailsComponent },
            { path: 'Old_Student_Registration', component: Old_Student_RegistrationComponent },
            { path: 'Subscription', component: SubscriptionComponent },
            { path: 'Student_Payment', component: Student_PaymentComponent },
            // { path: 'Agent_old', component: Agent_oldComponent },

            { path: '**', redirectTo: '/auth/login' }
            
        ]
    }
];
