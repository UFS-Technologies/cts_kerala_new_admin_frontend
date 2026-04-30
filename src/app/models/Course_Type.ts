export class Course_Type
{
Course_Type_Id:number;
Course_Type_Name:string;
User_Id:number;
Check_Box:boolean;
Agent_Amount:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

