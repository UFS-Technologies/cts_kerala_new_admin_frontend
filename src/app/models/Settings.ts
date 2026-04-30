export class Settings
{
Settings_Id:number;
Settings_Name:string;
Settings_Group:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

