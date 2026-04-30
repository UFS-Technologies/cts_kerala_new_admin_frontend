export class Client_Accounts
{
Client_Accounts_Id:number;
Account_Group_Id:number;
Account_Group_Name:string;
Client_Accounts_Code:string;
Client_Accounts_Name:string;
Client_Accounts_No:string;
Address1:string;
Address2:string;
Address3:string;
Address4:string;
PinCode:string;
State:string;
Country:string;
Phone:string;
Mobile:string;
Email:string;
GSTNo:string;
Opening_Balance:number;
Opening_Type:number;
StateCode:string;
PanNo:string;
Description1:string;
Entry_Date:string;
UserId:number;
LedgerInclude:string;
CanDelete:string;
Commision:number;
Employee_Id:number;
Employee:string;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

