import { Student } from "./Student";

export class Student_Verified_Details
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

Check_Box_View:boolean;
Verified_By:number;

Student_Selected_Details:Student[]

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}
