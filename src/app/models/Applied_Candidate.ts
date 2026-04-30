export class Applied_Candidate
{
Candidate_Id:number;
Candidate_Name:string;
Job_Code:string;
Job_Title:string;
Job_Location:string;
Company_Name:string;
Followupdate:Date;
Job_Posting_Id:number;
Status_Id:number;
Status_Name:string;
Contact_Name:string;
Contact_No:string;
Entry_Date:Date;
User_Id:number;
Candidate_Job_Apply_Id:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

