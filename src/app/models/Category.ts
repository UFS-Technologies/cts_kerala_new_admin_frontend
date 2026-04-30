export class Category
{
Category_Id:number;
Category_Name:string;
Commision_Percentage:number;
User_Id:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

