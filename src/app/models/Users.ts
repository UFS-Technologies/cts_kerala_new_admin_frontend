
import { User_Menu_Selection } from './User_Menu_Selection';
export class Users
{
Users_Id:number;
Users_Name:string;
Password:string;
Working_Status:number;
User_Type:number;
Role_Id:number;
Agent_Id:number;
Address1:string;
Address2:string;
Address3:string;
Address4:string;
Pincode:string;
Mobile:string;
Email:string;
Employee_Id:number;
Registration_Target:number;
FollowUp_Target:number;
User_Menu_Selection_Data:User_Menu_Selection[];
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

