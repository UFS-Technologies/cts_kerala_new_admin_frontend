export class Question_Import_Details
{
Question_Import_Details_Id:number;
Question_Import_Master_Id:number;
Question_Id:number;
Question_Name:string;
Option_1:string;
Option_2:string;
Option_3:string;
Option_4:string;
Correct_Answer:string;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

