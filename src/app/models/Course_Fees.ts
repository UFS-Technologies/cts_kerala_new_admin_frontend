export class Course_Fees
{
Course_Fees_Id:number;
Course_Id:number;
Fees_Type_Id:number;
Amount:number;
Fees_Type_Name:string;
No_Of_Instalment:string;
Instalment_Period:string;
Total_Fees:number;
University_Amount:number;
Studymaterials_Fees:number;
Coaching_Fees:number;
Service_Fees:number;
Agent_Amount:number;
Instalment_Type_Id:number;
From_Year:number;
To_Year:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

