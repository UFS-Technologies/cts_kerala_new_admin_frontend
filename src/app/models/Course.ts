

import { Course_Fees } from '../models/Course_Fees';
import { Course_Subject } from '../models/Course_Subject';
import { Study_Materials } from '../models/Study_Materials';
export class Course
{
Course_Id:number;
Course_Name:string;
Course_Type_Id:number;
Course_Type_Name:string;
Duration:number;
Course_Term:number;
Course_Mode:number;
// Agent_Amount:number;
User_Id:number;
// Total_Fees:number;
Duration_Type_Id:number;
Duration_Type_Name:string;
University_Id:number;
University_Name:string;
// University_Amount:number;
Course_Fees:Course_Fees[];
Course_Code:string;
Course_Subject:Course_Subject[];
Study_Materials:Study_Materials[];
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

