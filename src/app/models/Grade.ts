export class Grade
{
Student_Id:number;
count:number;
Maximum_Mark:number;
Obtained_mark:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

