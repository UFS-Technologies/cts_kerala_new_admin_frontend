export class Qualification
{
Qualification_Id:number;
Qualification_Name:string;
User_Id:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

