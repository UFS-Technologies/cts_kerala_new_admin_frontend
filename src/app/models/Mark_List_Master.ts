import{Mark_List} from './Mark_List'
export class Mark_List_Master
{
Mark_List_Master_Id:number;
Student_Id:number;
Course_Id:number;
Course_Name:string;
User_Id:number;
Mark_List:Mark_List[];
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

