export class Student_Fees_Installment_Save
{
Student_Fees_Installment_Master_Id:number;
Student_Id:number;
Course_Fees_Id:number;
Course_Id:number;
Fees_Type_Id:number;
Fees_Type_Name:string;
Instalment_Date:Date;
Amount:number;
No_Of_Instalment:number;
Instalment_Period:number;
Balance_Amount:number;
Instalment_Type_Id:number;
Instalment_Type_Name:string;
Student_Fees_Installment_Details_Id :number;
Fees_Amount :number;
Status :number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

