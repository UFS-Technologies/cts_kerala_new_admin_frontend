export class Student
{
Student_Id:number;
Student_Name:string;
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
User_Id:number;
Registration_No:number;
Role_No:string;
Aadhaar:string;
FollowUp:number;
Student_Followup_Id:number;
Entry_Date:Date;
Next_FollowUp_Date:Date;
FollowUp_Difference:number;
Status:number;
Status_Name:string;
By_User_Id:number;
To_User_Id:number;
By_User_Name:string;
To_User_Name:string;
Remark:string;
Remark_Id:number;
FollowUp_Type:number;
FollowUP_Time:string;
Actual_FollowUp_Date:Date;

tp:number;
RowNo:number;
Count: number;
User_Status:number;
Registered_By :number;
Registered_On:Date;
Registered:boolean;
Agent_Id:number;
Agent_Name:string;
Center_Name:string;
District_Name:string;
Agent_District_Id:number;
Center_Code:string;
Aadhaar_Image:string;

SKP_Status_Id :number; 
SKP_Status_Name :string;

Aadhaar_Back:string;
SSLC_Certificate:string;
Plustwo_Certificate:string;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

