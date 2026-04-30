export class Candidate_Followup
{
Candidate_Followup_Id:number;
Candidate_Id:number;
Entry_Date:Date;
Next_FollowUp_Date:Date;
FollowUp_Difference:number;
Status:number;
By_User_Id:number;
Remark:string;
Remark_Id:number;
FollowUp_Type:number;
FollowUP_Time:string;
Actual_FollowUp_Date:Date;
Entry_Type:string;
To_User_Id:number;
To_User_Name:string;
By_User_Name:string;
FollowUp:boolean;
Status_Name:string;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

