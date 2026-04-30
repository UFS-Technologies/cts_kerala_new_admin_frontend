export class Menu
{
Menu_Id:number;
Menu_Name:string;
Menu_Order:number;
IsEdit:boolean;
IsSave:boolean;
IsDelete:boolean;
IsView:boolean;
Menu_Status:boolean;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

