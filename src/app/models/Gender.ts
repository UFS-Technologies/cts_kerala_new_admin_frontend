export class Gender
{
Gender_Id:number;
Gender_Name:string;
User_Id:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

