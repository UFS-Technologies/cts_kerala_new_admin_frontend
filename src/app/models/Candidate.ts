export class Candidate
{
Candidate_Id:number;
Candidate_Name:string;
Address1:string;
Address2:string;
Address3:string;
Address4:string;
Pincode:string;
Phone:string;
Mobile:string;
Whatsapp:string;
DOB:Date;
Gender:number;
Email:string;
Alternative_Email:string;
Passport_No:string;
Passport_Expiry:string;
User_Name:string;
Password:string;
Photo:string;
Registered:Boolean;
Registered_By:string;
Registered_On:Date;
User_Id:number;
Functional_Area_Id : number; 
Functional_Area_Name : string; 
Specialization_Id : number; 
Specialization_Name : string; 
Experience_Id : number; 
Experience_Name : string; 
Qualification_Id : number; 
Qualification_Name : string; 
Resume : string;  
Postlookingfor : string; 
Candidate_Followup_Id : number; 
Next_FollowUp_Date :Date 
FollowUp_Difference : number; 
Status : number; 
By_User_Id : number; 
Remark : string; 
Remark_Id : number; 
FollowUp_Type : number; 
FollowUP_Time : string; 
Actual_FollowUp_Date :Date 
Entry_Type : string; 
To_User_Id : number; 
Client_Accounts_Id:number;

tp:number;
RowNo:number;
Count: number;
User_Status:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

