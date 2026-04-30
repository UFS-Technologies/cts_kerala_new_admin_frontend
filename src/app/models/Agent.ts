
import { Course_Type } from '../models/Course_Type';
export class Agent
{
Agent_Id:number;
Agent_Name:string; 
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
// Passport_No:string;
// Passport_Expiry:string;
User_Name:string;
Password:string;
Photo:string;
Photo_File_Name :string;
GSTIN:string;
Category_Id:number;
Agent_Fees:number;
Commission:number;
User_Id:number;
Comm_Address1:string;
Comm_Address2:string;
Comm_Address3:string;
Comm_Address4:string;
Comm_Pincode:string;
Comm_Mobile:string;
Center_Name:string;
Center_Code:string; 
Is_Registered:boolean;
District_Code_new_:string;
// Expirty_Date:Date;
// Approval_date:Date;
// Verification_Code:string;
// Reg_No:string;
// Approval_Status:number;
// Comm_Address1:string;
// Comm_Address2:string; 
// Comm_Address3:string; 
District_Code:string; 
District_Id:number; 
Agent_No:string;
Agent_District_No:string;
Client_Accounts_Id:number;
Course_Type_Data: Course_Type[];


Subscription_Id :number; 
Subscription_Name :string; 
Duration :number ;
Subscription_Amount :number ;

Subscription_Status_Id :number ;
Subscription_Status_Name :string; 

Subscription_Payment_Status_Id :number ;
Subscription_Payment_Status_Name :string; 
Subscription_Payment_Id :string; 
Subscription_Start_Date :Date; 
Subscription_End_Date :Date;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}