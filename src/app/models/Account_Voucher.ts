export class Account_Voucher
{
Account_Voucher_Id:number;
Date:Date;
Voucher_No:number;
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
Employee_Id:number;
Employee_Name:string;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

