import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Question_Import_Master_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Question_Import_Master(Question_Import_Master_)
{
return this.http.post(environment.BasePath +'Question_Import_Master/Save_Question_Import_Master/',Question_Import_Master_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Question_Import_Master(Question_Import_Master_Name):Observable<any>
{
var Search_Data={'Question_Import_Master_Name':Question_Import_Master_Name}
 return this.http.get(environment.BasePath +'Question_Import_Master/Search_Question_Import_Master/',{params:Search_Data});}
Delete_Question_Import_Master(Question_Import_Master_Id)
{
 return this.http.get(environment.BasePath +'Question_Import_Master/Delete_Question_Import_Master/'+Question_Import_Master_Id);}
Get_Question_Import_Master(Question_Import_Master_Id)
{
 return this.http.get(environment.BasePath +'Question_Import_Master/Get_Question_Import_Master/'+Question_Import_Master_Id);}
}

