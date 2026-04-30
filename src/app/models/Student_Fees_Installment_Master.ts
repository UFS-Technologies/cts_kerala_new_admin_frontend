import {Student_Fees_Installment_Details} from './Student_Fees_Installment_Details'
export class Student_Fees_Installment_Master
{
Student_Fees_Installment_Master_Id:number;
Student_Id:number;
Course_Fees_Id:number;
Course_Id:number;
Fees_Type_Id:number;
Fees_Type_Name:string;
Amount:number;
No_Of_Instalment:number;
Instalment_Period:number;
Instalment_Type_Name:string;
Instalment_Type_Id:number;
Student_Fees_Installment_Details:Student_Fees_Installment_Details[];
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

