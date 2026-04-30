export class Course_Subject
{
Course_Subject_Id:number;
Course_Id:number;
User_Id:number;
Part_Id:number;
Part_Name:string;
Subject_Id:number;
Subject_Name:string;
Minimum_Mark:string;
Maximum_Mark:string;
Online_Exam_Status:number;
Online_Exam_Status_Name:string
No_of_Question:string;
Exam_Duration:string;
Subject_Code:string;
External_Minimum_Mark:string; 
External_Maximum_Mark :string;
Internal_Minimum_Mark:string;
Internal_Maximum_Mark :string;
Technical_Minimum_Mark:string;
Technical_Maximum_Mark:string;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

