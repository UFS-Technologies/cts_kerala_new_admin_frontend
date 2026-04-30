export class Subject
{
Subject_Id:number;
Subject_Name:string;
Exam_status:number;
User_Id:number;
    Request_Status: number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

