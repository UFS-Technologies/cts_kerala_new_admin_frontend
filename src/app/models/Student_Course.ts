import { Student_Course_Subject } from './Student_Course_Subject'
import { Student_Fees_Installment_Save } from './Student_Fees_Installment_Save'
import { Student_Course_Part } from './Student_Course_Part'
export class Student_Course
{
Student_Course_Id:number;
Student_Id:number;
Entry_Date:Date;
Course_Name_Details:string;
University_Id:number;
University_Name:string;
Course_Id:number;
Course_Name:string;
Start_Date:Date;
End_Date:Date;
Join_Date:Date;
By_User_Id:number;
Status:number;
Course_Type_Name:string;
Agent_Amount:number
Course_Type_Id:number;
Total_Fees:number;
Certificate_Date:Date;
Certificate_Grade:string;
Duration:number;
Course_Duration_Id:number;
Certificate_Date_Search:string;
End_Date_Search:Date;
Student_Course_Part:Student_Course_Part[];
Student_Course_Subject:Student_Course_Subject[];
Student_Fees_Installment_Save:Student_Fees_Installment_Save[];
Duration_Type_Id:number;
Duration_Type_Name:string;
Starting_Month:number;
Starting_Year:number;
Ending_Month:number;
Ending_Year:number;
Fees_Type_Id:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

