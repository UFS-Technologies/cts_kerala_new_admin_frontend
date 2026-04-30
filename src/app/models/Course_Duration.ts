export class Course_Duration
{
    Course_Duration_Id :number;
    Course_Duration_Name :string; 
    Course_Id :number;
    Duration_Type_Id :number; 
    Duration : number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

