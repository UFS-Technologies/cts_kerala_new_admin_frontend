export class Study_Materials
{
Study_Materials_Id:number;
Course_Id:number;
Part_Id:number;
Subject_Id:number;
Subject_Name:string;
Course_Subject_Id:number;
Study_Materials_Name:string;
File_Name:string;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

