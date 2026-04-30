import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Candidate_Followup_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Candidate_Followup(Candidate_Followup_)
{
return this.http.post(environment.BasePath +'Candidate_Followup/Save_Candidate_Followup/',Candidate_Followup_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Candidate_Followup(Candidate_Followup_Name):Observable<any>
{
var Search_Data={'Candidate_Followup_Name':Candidate_Followup_Name}
 return this.http.get(environment.BasePath +'Candidate_Followup/Search_Candidate_Followup/',{params:Search_Data});}
Delete_Candidate_Followup(Candidate_Followup_Id)
{
 return this.http.get(environment.BasePath +'Candidate_Followup/Delete_Candidate_Followup/'+Candidate_Followup_Id);}
Get_Candidate_Followup(Candidate_Followup_Id)
{
 return this.http.get(environment.BasePath +'Candidate_Followup/Get_Candidate_Followup/'+Candidate_Followup_Id);}
}

