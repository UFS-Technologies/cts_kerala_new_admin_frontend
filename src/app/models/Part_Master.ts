import {Mark_List} from './Mark_List'
export class Part_Master
{
Part_Id:number;
Part_Name:string; 
Mark_List_Details:Mark_List[];
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

