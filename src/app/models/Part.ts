export class Part
{
Part_Id:number;
Part_Name:string;
User_Id:number;
Serial_No:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

