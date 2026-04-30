import { Month_Status } from "./Month_Status";
import { Year } from "./Year";
export class Student_Course_Part
{
    Student_Course_Part_Id:number;
    Part_Id :number; 
    Part_Name :string;
    Student_Id :number; 
    Month_Id :number; 
    Month_Name :string;
    Year_Id :number; 
    Year_Name:string;
    Month_Status:Month_Status;
    Mark_List_Issue_Date:Date;
    Mark_List_Issue_Date_T:Date;

    Year:Year;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

