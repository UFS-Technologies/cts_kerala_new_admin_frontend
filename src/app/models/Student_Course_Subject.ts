export class Student_Course_Subject
{
Student_Course_Subject_Id:number;
Student_Id:number;
Part_Id:number;
Part_Name:string;
Course_Id:number;
Course_Name:string;
Subject_Id:number;
Subject_Name:string;
Minimum_Mark:string;
Maximum_Mark:string;
Online_Exam_Status:string;
Online_Exam_Status_Name:string;
No_of_Question:string;
Exam_Duration:string;
Exam_Attended_Status:string;
Obtained_Mark:string;
Subject_Code:string;
Course_Subject_Id:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

