export class Accounts
{
Accounts_Id:number;
Date:string;
Client_Id:number;
DR:number;
CR:number;
X_Client_Id:number;
Voucher_No:string;
Voucher_Type:string;
Description:string;
Status:number;
Daybbok:string;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

