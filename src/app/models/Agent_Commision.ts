export class Agent_Commision
{
Agent_Commision_Id:number;
Agent_Id:number;
Category_Id:number;
Category_Name:string;
Commision_Per:string;
Commision_Amount:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

