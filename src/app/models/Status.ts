export class Status
{
Status_Id:number;
Status_Name:string;
User_Id:number;
FollowUp:boolean;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

