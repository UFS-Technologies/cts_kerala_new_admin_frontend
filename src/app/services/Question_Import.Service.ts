import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { observable, Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Question_ImportService {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Question_Import_Master(Question_Import_Details_)
{
return this.http.post(environment.BasePath +'Question_Import/Save_Question_Import_Master/',Question_Import_Details_);
}
private extractData(res: Response)
{
let body = res;
return body || { };
}
// Search_Question_Import(Question_Import_Details_Name):Observable<any>
// {
// var Search_Data={'Question_Import_Details_Name':Question_Import_Details_Name}
//  return this.http.get(environment.BasePath +'Question_Import/Search_Question_Import_Details/',{params:Search_Data});}
Delete_Question_Import_Master(Question_Import_Details_Id)
{
 return this.http.get(environment.BasePath +'Question_Import/Delete_Question_Import_Master/'+Question_Import_Details_Id);}
Get_Question_Import(Question_Import_Master_Id)
{
 return this.http.get(environment.BasePath +'Question_Import/Get_Question_Import/'+Question_Import_Master_Id);}
 Search_Course_Typeahead(Course_Name):Observable<any>
{
    return this.http.get(environment.BasePath + 'Question_Import/Search_Course_Typeahead/' + Course_Name);
}


Search_Courses_Typeahead(University_Id_,Course_Name): Observable<any> {
    var Search_Data = { 'Course_Name': Course_Name,'University_Id_': University_Id_}
    return this.http.get(environment.BasePath + 'Question_Import/Search_Courses_Typeahead/', { params: Search_Data });
  }


Search_Course_Part_Typeahead(Course_Id, Part_Name): Observable<any> {
    return this.http.get(environment.BasePath + 'Question_Import/Search_Course_Part_Typeahead/' + Course_Id + '/' + Part_Name);
}
Search_Part_Subject_Typeahead(Course_Id, Part_Id, Subject_name): Observable<any> {
    return this.http.get(environment.BasePath + 'Question_Import/Search_Part_Subject_Typeahead/' + Course_Id + '/' + Part_Id + '/' + Subject_name);
}

Search_Question_Import_Master(Fromdate_,Todate_,Course_Id_,Subject_Id_,Part_Id_): Observable<any> 
{
    var Search_Data={'Fromdate_':Fromdate_,'Todate_':Todate_,'Course_Id_':Course_Id_,'Subject_Id_':Subject_Id_,'Part_Id_':Part_Id_}
    return this.http.get(environment.BasePath + 'Question_Import/Search_Question_Import_Master/' ,{params:Search_Data} );
}

Search_University_Typeahead(University_Name): Observable<any> {
    var Search_Data = { 'University_Name': University_Name}
    return this.http.get(environment.BasePath + 'Question_Import/Search_University_Typeahead/', { params: Search_Data });
  }

  


}


