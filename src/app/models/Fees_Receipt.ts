export class Fees_Receipt
{
Fees_Receipt_Id:number;
Fees_Installment_Id:number;
Course_Id:number;
Course_Name:string;
Student_Id:number;
Fees_Type_Id:number;
Fees_Type_Name:string;
Amount:number;
Date:string;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

