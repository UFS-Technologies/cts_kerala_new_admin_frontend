export class Student_Followup
{
Student_Followup_Id:number;
Student_Id:number;
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
FollowUp:boolean;
FollowUp_Type:number;
FollowUP_Time:string;
Actual_FollowUp_Date:Date;
Agent_Id:number;
Agent_Name:string;
Center_Name:string;
District_Name:string;
Agent_District_Id:number;
Center_Code:string;
Agent_Address1:string;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

