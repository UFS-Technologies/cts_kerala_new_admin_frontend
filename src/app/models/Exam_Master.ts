export class Exam_Master
{
Exam_Master_Id:number;
Exam_Date:string;
Student_Id:number;
Subject_Id:number;
Subject_Name:string;
Start_Time:string;
End_Time:string;
Mark_Obtained:string;
User_Id:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

