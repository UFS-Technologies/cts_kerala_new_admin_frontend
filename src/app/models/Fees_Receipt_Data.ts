import { Fees_Receipt } from "./Fees_Receipt";

export class Fees_Receipt_Data
{

// Receipt_Array:Fees_Receipt[];
Login_Id:number;
Login_User:string;
Student_Id:number;
Student_Name:string;
Student_Email:string;
Fees_Receipt_Id:number;
Fees_Installment_Id:number;
// Course_Id:number;
// Course_Name:string;
Fees_Type_Id:number;
Fees_Type_Name:string;
Amount:number;
Date:string;
Voucher_No:string;
Description:string;
Mode_Name:string;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

