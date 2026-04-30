export class Fees_Instalment
{
Fees_Instalment_Id:number;
Student_Id:number;
Course_Id:string;
Fees_Type_Id:string;
Instalment_Date:string;
Amount:number;
Status:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

