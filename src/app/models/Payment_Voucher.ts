export class Payment_Voucher
{
Payment_Voucher_Id:number;
Date:Date;
Voucher_No:number;
From_Account_Id:number;
Amount:number;
To_Account_Id:number;
Payment_Mode:number;
User_Id:number;
Description:string;
Payment_Status:number;
Address1:string;
FromAccount_Name:string;
ToAccount_Name:string;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

