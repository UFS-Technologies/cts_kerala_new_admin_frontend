export class Document
{
Document_Id:number;
Student_Id:number;
Document_Name:string;
Files:string;
New_Entry:number;
File_Name:string;
Student_Document_Id:number;
Document_File_Name:string;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

