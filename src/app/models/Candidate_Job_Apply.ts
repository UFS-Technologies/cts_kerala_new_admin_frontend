export class Candidate_Job_Apply
{
Candidate_Job_Apply_Id:number;
Candidate_Id:number;
Entry_Date:string;
Skills:string;
Designation:string;
Functional_Area_Id:number;
Functional_Area_Name:string;
Specialization_Id:number;
Specialization_Name:string;
Experience_Id:number;
Experience_Name:string;
Qualification_Id:number;
Qualification_Name:string;
Remark:string;
Resume:string;
Experience_Certificate:string;
Photo:string;
Status_Id:number;
Status_Name:string;
User_Id:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

