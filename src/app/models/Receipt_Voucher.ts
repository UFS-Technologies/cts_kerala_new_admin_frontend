export class Receipt_Voucher
{
Receipt_Voucher_Id:number;
Date:Date;
Voucher_No:number;
Bill_No:string;
From_Account_Id:number;
Amount:number;
To_Account_Id:number;
Sales_Master_Id:number;
Payment_Mode:number;
User_Id:number;
Address1:string;
Description:string;
Payment_Status:number;
FromAccount_Name:string;
ToAccount_Name: string;
Student_Fees_Installment_Details_Id:number;
Student_Course_Id:number;
Fees_Type_Id:number;
Center_Code: string;
Email:string;
Agent_Id:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

