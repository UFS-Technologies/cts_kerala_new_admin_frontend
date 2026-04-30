import { Exam_Status } from "./Exam_Status";

export class Mark_List
{
Mark_List_Id:number;
Subject_Id:number;
Subject_Name:string;
Subject_Code:string;
Part_Id:number;
Part_Name:string;
Minimum_Mark:string;
Maximum_Mark:string;
Mark_Obtained:string;
Technical_Skill:string;
External_Mark:string;
Exam_Status_Id:number;
Exam_Status_Name:string;
Online_Exam_Mark:string;
Internal_Mark:string;
Month_Id:number;
Month_Name:string;
Year_Id: number;
Year_Name:string;
Student_Id:number;
Student_Course_Part_Id:number;
User_Id:number;
Mark_List_Data:Mark_List[];
Exam_Status_:Exam_Status;
Issue_Date:Date;
Course_Subject_Id:number;
Grade:string;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

