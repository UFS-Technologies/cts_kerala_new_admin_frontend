import { Activity } from "./Activity";
import { University_Exam_Month } from "./University_Exam_Month";
import { University_Admission_Month } from "./University_Admission_Month";
export class University
{
    University_Id:number;
    University_Name:string;
    Address1:string;
    Address2:string;
    Address3:string;
    Address4:string;
    Pincode:string;
    Phone:string;
    Mobile:string;
    Email:string;
    User_Id:number;
    Website:string;
    Amount:number;
    Description1:string;
    Description2:string;
    Description3:string;
    Activity:string;
    University_Followup_Id :number; 
    Next_FollowUp_Date :Date;; 
    FollowUp_Difference :number; 
    Status :number; 
    Followup_User_Id :number; 
    Remark :string;
    Remark_Id :number; 
    FollowUp_Type :number; 
    FollowUP_Time :string;
    Actual_FollowUp_Date :Date;; 
    To_User_Id :number;
    Starting_Year:number;
    Back_Status:boolean;
    Activities_Selected:Activity[]
    University_Admission_Month:University_Admission_Month[];
    University_Exam_Month:University_Exam_Month[];
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

