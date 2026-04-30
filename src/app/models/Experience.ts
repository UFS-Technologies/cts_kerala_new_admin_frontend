export class Experience
{
Experience_Id:number;
Experience_Name:string;
User_Id:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

