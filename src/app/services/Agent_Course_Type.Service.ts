import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Agent_Course_Type_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Agent_Course_Type(Agent_Course_Type_)
{
return this.http.post(environment.BasePath +'Agent_Course_Type/Save_Agent_Course_Type/',Agent_Course_Type_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Agent_Course_Type(Agent_Course_Type_Name):Observable<any>
{
var Search_Data={'Agent_Course_Type_Name':Agent_Course_Type_Name}
 return this.http.get(environment.BasePath +'Agent_Course_Type/Search_Agent_Course_Type/',{params:Search_Data});}
Delete_Agent_Course_Type(Agent_Course_Type_Id)
{
 return this.http.get(environment.BasePath +'Agent_Course_Type/Delete_Agent_Course_Type/'+Agent_Course_Type_Id);}
Get_Agent_Course_Type(Agent_Course_Type_Id)
{
 return this.http.get(environment.BasePath +'Agent_Course_Type/Get_Agent_Course_Type/'+Agent_Course_Type_Id);}
}

