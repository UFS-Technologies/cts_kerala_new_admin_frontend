import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
// import { Agent } from 'app/models/Agent.js';
@Injectable({
providedIn: 'root'
})
export class Agent_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Agent(Agent_)
{
    
return this.http.post(environment.BasePath +'Agent/Save_Agent/',Agent_);
}
// Save_Agent(Agent_:Agent,image: File[]) {
        
//     const postData = new FormData();
//     postData.append("Agent_Id", Agent_.Agent_Id.toString());
//     postData.append("Agent_Name", Agent_.Agent_Name);
//     postData.append("Center_Code", Agent_.Center_Code);
//     postData.append("Center_Name", Agent_.Center_Name);
//     postData.append("Comm_Address1", Agent_.Comm_Address1);
//     postData.append("Address1", Agent_.Address1);
//     postData.append("Comm_Address2", Agent_.Comm_Address2);
//     postData.append("Address2", Agent_.Address2);
//     postData.append("Comm_Address3", Agent_.Comm_Address3);
//     postData.append("Address3", Agent_.Address3);
//     postData.append("Comm_Address4", Agent_.Comm_Address4);
//     postData.append("Address4", Agent_.Address4);
//     postData.append("Comm_Pincode", Agent_.Comm_Pincode);
//     postData.append("Approval_Status", Agent_.Approval_Status.toString());
//     postData.append("Mobile", Agent_.Mobile);
//     postData.append("Reg_No", Agent_.Reg_No);
//     postData.append("Email", Agent_.Email);
//     postData.append("Approval_date", Agent_.Approval_date.toString());
//     postData.append("Category_Id", Agent_.Category_Id.toString());
//     postData.append("Agent_Fees", Agent_.Agent_Fees.toString());
//     postData.append("Commission", Agent_.Commission.toString());


//     postData.append("Photo", Agent_.Photo);

//     ;
//     if (image != undefined) {
//         for (const img of image) {
//             postData.append("myFile", img);
//         }
//     }



  
//     return this.http.post(environment.BasePath + 'Agent/Save_Agent', postData);
// }



private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Agent(Agent_Name_,Page_Start_,Page_End_,Page_Length_):Observable<any>
{
var Search_Data={'Agent_Name_':Agent_Name_,'Page_Start_':Page_Start_,'Page_End_':Page_End_,'Page_Length_':Page_Length_
}
 return this.http.get(environment.BasePath +'Agent/Search_Agent/',{params:Search_Data});}
Delete_Agent(Agent_Id)
{
 return this.http.get(environment.BasePath +'Agent/Delete_Agent/'+Agent_Id);}
 
Get_Agent(Agent_Id)
{
 return this.http.get(environment.BasePath +'Agent/Get_Agent/'+Agent_Id);}

 Load_Agent_Dropdowns(): Observable<any> 
{
    return this.http.get(environment.BasePath + 'Agent/Load_Agent_Dropdowns/');
}
Search_Category_Commision(Category_Id_,Commission_): Observable<any> {
    var Search_Data = { 'Category_Id_': Category_Id_, 'Commission_': Commission_ }
    return this.http.get(environment.BasePath + 'Agent/Search_Category_Commision/', { params: Search_Data });
    // return this.http.get(environment.BasePath + 'Agent/Search_Category_Commision/' + Category_Name);
}
Load_Category_Commission(Category_Id_): Observable<any> {
    return this.http.get(environment.BasePath +'Agent/Load_Category_Commission/'+Category_Id_);
}
Save_Agent_Registration(Agent_Id)  {        
    return this.http.get(environment.BasePath +'Agent/Save_Agent_Registration/' +Agent_Id);
}
Remove_Registration(Agent_Id)
{
 return this.http.get(environment.BasePath +'Agent/Remove_Registration/'+Agent_Id );
}
Get_Menu_Status(Menu_Id_,Login_User_)
{
       return this.http.get(environment.BasePath + 'Agent/Get_Menu_Status/' + Menu_Id_+'/'+Login_User_);
}
Load_Mode(): Observable<any> 
{
    return this.http.get(environment.BasePath + 'Agent/Load_Mode/');
}
Load_District(): Observable<any> 
{
    return this.http.get(environment.BasePath + 'Agent/Load_District/');
}
Accounts_Typeahead(Account_Group_Id_,Client_Accounts_Name_): Observable<any> 
{
    var Search_Data = { 'Account_Group_Id_': Account_Group_Id_, 'Client_Accounts_Name_': Client_Accounts_Name_ }
    return this.http.get(environment.BasePath + 'Agent/Accounts_Typeahead/', { params: Search_Data });
}
Save_Receipt_Voucher(Receipt_Voucher_)
{
   return this.http.post(environment.BasePath +'Agent/Save_Receipt_Voucher/',Receipt_Voucher_);
}
Get_Receipt_History(Agent_Id)
{
       return this.http.get(environment.BasePath + 'Agent/Get_Receipt_History/' + Agent_Id);
}
Delete_Receipt_Voucher(Receipt_Voucher_Id)
{
 return this.http.get(environment.BasePath +'Agent/Delete_Receipt_Voucher/'+Receipt_Voucher_Id);
}

Search_Course_Status(): Observable<any> {
        
    return this.http.get(environment.BasePath + 'Agent/Search_Course_Status/');
}
Get_CourseType_Selection_Edit(Agent_Id) 
{
    return this.http.get(environment.BasePath + 'Agent/Get_CourseType_Selection_Edit/' + Agent_Id);
}
Click_Agent_District(District_Id) 
{
    return this.http.get(environment.BasePath + 'Agent/Click_Agent_District/' + District_Id);
}

Activate_Subscription(Agent_)
{
    
return this.http.post(environment.BasePath +'Agent/Activate_Subscription/',Agent_);
}

Get_Print_Detials(Agent_Id)  { 
    debugger       
    return this.http.get(environment.BasePath +'Agent/Get_Print_Detials/' +Agent_Id);
}

}
