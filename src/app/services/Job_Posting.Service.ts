import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Job_Posting_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
// Save_Job_Posting(Job_Posting_)
// {
// return this.http.post(environment.BasePath +'Job_Posting/Save_Job_Posting/',Job_Posting_);
// }
private extractData(res: Response)
{
let body = res;
return body || { };
}
    Save_Job_Posting(Job_Posting_, ImageFile_Resume: File[]) {
        const postData = new FormData();
        
        if (Job_Posting_ != null) {
            postData.append("Job_Posting_Id", Job_Posting_.Job_Posting_Id);
            postData.append("Job_Code", Job_Posting_.Job_Code);
            postData.append("Job_Title", Job_Posting_.Job_Title);
            postData.append("Descritpion", Job_Posting_.Descritpion);
            postData.append("Skills", Job_Posting_.Skills);
            postData.append("No_Of_Vaccancy", Job_Posting_.No_Of_Vaccancy);
            postData.append("Experience", Job_Posting_.Experience);
            postData.append("Experience_Name", Job_Posting_.Experience_Name);
            postData.append("Job_Location", Job_Posting_.Job_Location);
            postData.append("Qualification", Job_Posting_.Qualification);
            postData.append("Qualification_Name", Job_Posting_.Qualification_Name);
            postData.append("Functional_Area", Job_Posting_.Functional_Area);
            postData.append("Functional_Area_Name", Job_Posting_.Functional_Area_Name);
            postData.append("Specialization", Job_Posting_.Specialization);
            postData.append("Specialization_Name", Job_Posting_.Specialization_Name);
            postData.append("Salary", Job_Posting_.Salary);
            postData.append("Last_Date", Job_Posting_.Last_Date);
            postData.append("Company_Name", Job_Posting_.Company_Name);
            postData.append("Address", Job_Posting_.Address);
            postData.append("Contact_Name", Job_Posting_.Contact_Name);
            postData.append("Contact_No", Job_Posting_.Contact_No);
            postData.append("Email", Job_Posting_.Email);
            postData.append("Address1", Job_Posting_.Address1);
            postData.append("Address2", Job_Posting_.Address2);
            postData.append("Address3", Job_Posting_.Address3);
            postData.append("Address4", Job_Posting_.Address4);
            postData.append("Pincode", Job_Posting_.Pincode);
            postData.append("Status", Job_Posting_.Status);
            postData.append("Logo", Job_Posting_.Logo);
            postData.append("User_Id", Job_Posting_.User_Id);            
        }
        var i = 0;
        if (ImageFile_Resume != undefined) {

            for (const img of ImageFile_Resume) {
                postData.append("myFile", img);
                postData.append("ImageFile_Resume", i.toString());
                i = i + 1;
            }
        }
  return this.http.post(environment.BasePath + 'Job_Posting/Save_Job_Posting', postData);
}
Search_Job_Posting(Job_Code_ ,Job_Title_ ,Job_Location_ ,Experience_,Status_,Page_Start_,Page_End_,Page_Length_): Observable<any> 
{   
    var Search_Data = {'Job_Code_': Job_Code_, 'Job_Title_': Job_Title_, 'Job_Location_': Job_Location_,'Experience_':Experience_,'Status_':Status_,
    'Page_Start_':Page_Start_,'Page_End_':Page_End_,'Page_Length_':Page_Length_
    }
    return this.http.get(environment.BasePath + 'Job_Posting/Search_Job_Posting/', { params: Search_Data });
}
Delete_Job_Posting(Job_Posting_Id)
{
 return this.http.get(environment.BasePath +'Job_Posting/Delete_Job_Posting/'+Job_Posting_Id);
}
Get_Job_Posting(Job_Posting_Id)
{
 return this.http.get(environment.BasePath +'Job_Posting/Get_Job_Posting/'+Job_Posting_Id);
}
Load_Job_Posting_Search_Dropdowns(Group_Id)
{
    return this.http.get(environment.BasePath + 'Student/Load_Student_Search_Dropdowns/' + Group_Id);
}
Load_Job_Posting_Dropdowns()
{
    return this.http.get(environment.BasePath + 'Candidate/Load_Candidate_Dropdowns/' );
}
}

