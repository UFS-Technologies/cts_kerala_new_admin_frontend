export class Exam_Details
{
Exam_Details_Id:number;
Exam_Master_Id:number;
Question_Id:number;
Question_Name:string;
Option_1:string;
Option_2:string;
Option_3:string;
Option_4:string;
Question_Answer:string;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

