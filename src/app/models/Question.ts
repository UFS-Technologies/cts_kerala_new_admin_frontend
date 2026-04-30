export class Question
{
Question_Id:number;
Question:string;
Option1:string;
Option2:string;
Option3:string;
Option4:string;
Answer:string;
Subject_Id:number;
Subject_Name:string;
Course_Id:number;
Course_Name:string;
Semester_Id:number;
Semester_Name:string;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

