export class Company
{
    companyname:string;
    Phone1: string;
    Phone2: string;
    Mobile: string;
    Email: string;
    Website: string;
    Address1: string;
    Address2: string;
    Address3: string;
    Logo: string;
    Company_Id: number;


constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}


