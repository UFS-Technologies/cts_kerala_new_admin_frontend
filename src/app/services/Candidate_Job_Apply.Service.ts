import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Candidate_Job_Apply_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Candidate_Job_Apply(Candidate_Job_Apply_)
{
return this.http.post(environment.BasePath +'Candidate_Job_Apply/Save_Candidate_Job_Apply/',Candidate_Job_Apply_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Candidate_Job_Apply(Candidate_Job_Apply_Name):Observable<any>
{
var Search_Data={'Candidate_Job_Apply_Name':Candidate_Job_Apply_Name}
 return this.http.get(environment.BasePath +'Candidate_Job_Apply/Search_Candidate_Job_Apply/',{params:Search_Data});}
Delete_Candidate_Job_Apply(Candidate_Job_Apply_Id)
{
 return this.http.get(environment.BasePath +'Candidate_Job_Apply/Delete_Candidate_Job_Apply/'+Candidate_Job_Apply_Id);}
Get_Candidate_Job_Apply(Candidate_Job_Apply_Id)
{
 return this.http.get(environment.BasePath +'Candidate_Job_Apply/Get_Candidate_Job_Apply/'+Candidate_Job_Apply_Id);}
}

