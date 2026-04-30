export class Activity
{
Activity_Id:number;
Activity_Name:string;
Amount:number;
Check_Box:boolean;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

