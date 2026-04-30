export class User_Menu_Selection
{
User_Menu_Selection_Id:number;
Menu_Id:number;
User_Id:number;
IsEdit:boolean;
IsSave:boolean;
IsDelete:boolean;
IsView:boolean;
Menu_Status:boolean;
Edit_Check:boolean;
Save_Check:boolean;
Delete_Check:boolean;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

