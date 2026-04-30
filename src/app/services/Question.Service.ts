import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Question_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Question(Question_)
{
return this.http.post(environment.BasePath +'Question/Save_Question/',Question_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Question(Question_Name):Observable<any>
{
var Search_Data={'Question_Name':Question_Name}
 return this.http.get(environment.BasePath +'Question/Search_Question/',{params:Search_Data});}
Delete_Question(Question_Id)
{
 return this.http.get(environment.BasePath +'Question/Delete_Question/'+Question_Id);}
Get_Question(Question_Id)
{
 return this.http.get(environment.BasePath +'Question/Get_Question/'+Question_Id);}
}

