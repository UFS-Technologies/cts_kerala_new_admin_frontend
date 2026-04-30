
export class Activity_Details
{
Activity_Details_Id:number;
Activity_Id :number; 
Entry_Date :Date; 
Activity_Name:string;
Student_Id :number; 
Status :number; 
Amount:number; 
Descripition:string;
Additional_Remark :string;
NextFollowup_Date :Date; 
Payment_Status :number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}
