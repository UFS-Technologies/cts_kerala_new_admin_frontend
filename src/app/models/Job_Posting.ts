export class Job_Posting
{
Job_Posting_Id:number;
Job_Code:string;
Job_Title:string;
Descritpion:string;
Skills:string;
No_Of_Vaccancy:string;
Experience:number;
Job_Location:string;
Qualification:number;
Functional_Area:number;
Specialization:number;
Salary:string;
Last_Date:Date;
Company_Name:string;
Address:string;
Contact_Name:string;
Contact_No:string;
Email:string;
Address1:string;
Address2:string;
Address3:string;
Address4:string;
Pincode:string;
Status:number;
Logo:string;
User_Id:number;
Functional_Area_Name : string; 
Specialization_Name : string; 
Experience_Name : string;
Qualification_Name : string; 
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

