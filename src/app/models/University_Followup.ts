export class University_Followup
{
University_Followup_Id:number;
University_Id:number;
Entry_Date:string;
Next_FollowUp_Date:string;
FollowUp_Difference:number;
Status:number;
User_Id:number;
Remark:string;
Remark_Id:number;
FollowUp_Type:number;
FollowUP_Time:string;
Actual_FollowUp_Date:string;
Entry_Type:string;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

