export class Batch
{
Batch_Id:number;
Batch_Name:string;
User_Id:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

