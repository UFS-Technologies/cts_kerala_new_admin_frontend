import {Question} from './Question'
export class Question_Import_Master
{
Question_Import_Master_Id:number;
Date:Date;
User_Id:number;
Course_Id:number;
Course_Name:string;
Semester_Id:number;
Semester_Name:string;
Subject_Id:number;
Subject_Name:string;
University_Id:number;
University_Name:string;

Question:Question[];
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

