import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Candidate_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
// Save_Candidate(Candidate_)
// {
// return this.http.post(environment.BasePath +'Candidate/Save_Candidate/',Candidate_);
// }
private extractData(res: Response)
{
let body = res;
return body || { };
}
    Save_Candidate(Main_Array,Photo: File[],Resume: File[]) {
        const postData = new FormData();
        
        if (Main_Array.Candidate != null) {
            postData.append("Candidate_Id_Candidate", Main_Array.Candidate.Candidate_Id);
            postData.append("Candidate_Name", Main_Array.Candidate.Candidate_Name);
            postData.append("Address1", Main_Array.Candidate.Address1);
            postData.append("Address2", Main_Array.Candidate.Address2);
            postData.append("Address3", Main_Array.Candidate.Address3);
            postData.append("Address4", Main_Array.Candidate.Address4);
            postData.append("Pincode", Main_Array.Candidate.Pincode);
            postData.append("Phone", Main_Array.Candidate.Phone);
            postData.append("Mobile", Main_Array.Candidate.Mobile);
            postData.append("Whatsapp", Main_Array.Candidate.Whatsapp);
            postData.append("DOB", Main_Array.Candidate.DOB);
            postData.append("Gender", Main_Array.Candidate.Gender);
            postData.append("Email", Main_Array.Candidate.Email);
            postData.append("Alternative_Email", Main_Array.Candidate.Alternative_Email);
            postData.append("Passport_No", Main_Array.Candidate.Passport_No);
            postData.append("Passport_Expiry", Main_Array.Candidate.Passport_Expiry);
            postData.append("User_Name", Main_Array.Candidate.User_Name);
            postData.append("Password", Main_Array.Candidate.Password);
            // postData.append("Photo", Main_Array.Candidate.Photo);
            postData.append("User_Id", Main_Array.Candidate.User_Id);
            postData.append("Functional_Area_Id", Main_Array.Candidate.Functional_Area_Id);
            postData.append("Functional_Area_Name", Main_Array.Candidate.Functional_Area_Name);
            postData.append("Specialization_Id", Main_Array.Candidate.Specialization_Id);
            postData.append("Specialization_Name", Main_Array.Candidate.Specialization_Name);
            postData.append("Experience_Id", Main_Array.Candidate.Experience_Id);
            postData.append("Experience_Name", Main_Array.Candidate.Experience_Name);
            postData.append("Qualification_Id", Main_Array.Candidate.Qualification_Id);
            postData.append("Qualification_Name", Main_Array.Candidate.Qualification_Name);
            // postData.append("Resume", Main_Array.Candidate.Resume);
            postData.append("Postlookingfor", Main_Array.Candidate.Postlookingfor);
            
        }
        if (Main_Array.Followup != null) {
            postData.append("Candidate_Followup_Id", Main_Array.Followup.Candidate_Followup_Id);
            postData.append("Candidate_Id", Main_Array.Followup.Candidate_Id);
            postData.append("Entry_Date", Main_Array.Followup.Entry_Date);
            postData.append("Next_FollowUp_Date", Main_Array.Followup.Next_FollowUp_Date);
            postData.append("FollowUp_Difference", Main_Array.Followup.FollowUp_Difference);
            postData.append("Status", Main_Array.Followup.Status);
            postData.append("By_User_Id", Main_Array.Followup.By_User_Id);
            postData.append("Remark", Main_Array.Followup.Remark);
            postData.append("Remark_Id", Main_Array.Followup.Remark_Id);
            postData.append("FollowUp_Type", Main_Array.Followup.FollowUp_Type);
            postData.append("FollowUP_Time", Main_Array.Followup.FollowUP_Time);
            postData.append("Actual_FollowUp_Date", Main_Array.Followup.Actual_FollowUp_Date);
            postData.append("Entry_Type", Main_Array.Followup.Entry_Type);
            postData.append("To_User_Id", Main_Array.Followup.To_User_Id);
        }
        var i = 0;
        if (Photo != undefined) {
 
            for (const img of Photo) {
                postData.append("myFile", img);
                postData.append("Photo", i.toString());
                i = i + 1;
            }
        }
        if (Resume != undefined) {

            for (const img of Resume) {
                postData.append("myFile", img);
                postData.append("Resume", i.toString());
                i = i + 1;
            }
        }
  return this.http.post(environment.BasePath + 'Candidate/Save_Candidate', postData);
}
Search_Candidate(Search_FromDate, Search_ToDate,  Search_Name, By_User_, Status_Id_, Look_In_Date, 
    Page_Index1_, Page_Index2_, Login_User_Id_, RowCount_, RowCount2_,Register_Value): Observable<any> 
{   
    var Search_Data = {
    'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate, 'SearchbyName_': Search_Name,'By_User_': By_User_, 'Status_Id_': Status_Id_,
     'Is_Date_Check_': Look_In_Date,'Page_Index1_': Page_Index1_, 'Page_Index2_': Page_Index2_, 'Login_User_Id_': Login_User_Id_,
      'RowCount': RowCount_, 'RowCount2': RowCount2_,'Register_Value':Register_Value
    }
    return this.http.get(environment.BasePath + 'Candidate/Search_Candidate/', { params: Search_Data });
}
Delete_Candidate(Candidate_Id)
{
 return this.http.get(environment.BasePath +'Candidate/Delete_Candidate/'+Candidate_Id);
}
Get_Candidate(Candidate_Id)
{
 return this.http.get(environment.BasePath +'Candidate/Get_Candidate/'+Candidate_Id);
}
Search_Status_Typeahead(Status_Name,Group_Id): Observable<any>
{
    var Search_Data = { 'Status_Name': Status_Name, 'Group_Id': Group_Id }
    return this.http.get(environment.BasePath + 'Student/Search_Status_Typeahead/', { params: Search_Data });
}
Search_Users_Typeahead(Users_Name): Observable<any>
{
    var Search_Data = { 'Users_Name': Users_Name }
    return this.http.get(environment.BasePath + 'Student/Search_Users_Typeahead/', { params: Search_Data });
}
Load_Gender(): Observable<any>
{
    return this.http.get(environment.BasePath + 'Student/Load_Gender/');
}
Load_Candidate_Search_Dropdowns(Group_Id)
{
    return this.http.get(environment.BasePath + 'Student/Load_Student_Search_Dropdowns/' + Group_Id);
}
Load_Candidate_Dropdowns()
{
    return this.http.get(environment.BasePath + 'Candidate/Load_Candidate_Dropdowns/' );
}
Get_Last_Followup(Users_Id)
{
    return this.http.get(environment.BasePath + 'Candidate/Get_Last_Candidate_FollowUp/' + Users_Id);
}
Get_FollowUp_Details(Candidate_Id)
{
    return this.http.get(environment.BasePath + 'Candidate/Get_Candidate_FollowUp_Details/' + Candidate_Id);
}
Followup_History(Candidate_Id)
{
    return this.http.get(environment.BasePath + 'Candidate/Get_Candidate_FollowUp_History/' + Candidate_Id);
}
Register_Candidate(Candidate_Id,User_Id)
{
    return this.http.get(environment.BasePath + 'Candidate/Register_Candidate/' + Candidate_Id+ '/' +User_Id);
}
Remove_Registration(Candidate_Id)
{
    return this.http.get(environment.BasePath + 'Candidate/Remove_Registration_Candidate/' + Candidate_Id);
}
Search_Applied_Candidate(From_Date_,To_Date_,Candidate_Search_,Status_,Job_Title_,Page_Start_,Page_End_,Page_Length_): Observable<any>
{
    var Search_Data = { 'From_Date_':From_Date_,'To_Date_':To_Date_,'Candidate_Search_': Candidate_Search_ ,
    'Status_':Status_,'Job_Title_':Job_Title_,'Page_Start_':Page_Start_,'Page_End_':Page_End_,'Page_Length_':Page_Length_
}
    return this.http.get(environment.BasePath + 'Candidate/Search_Applied_Candidate/', { params: Search_Data });
}
Save_Applied_Candidate(Applied_Candidate)
{
return this.http.post(environment.BasePath +'Candidate/Save_Applied_Candidate/',Applied_Candidate);
}
Load_Job_Posting_Search_Dropdowns(Group_Id)
{
    return this.http.get(environment.BasePath + 'Student/Load_Student_Search_Dropdowns/' + Group_Id);
}
}

