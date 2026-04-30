import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Question_Import_Details_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Question_Import_Details(Question_Import_Details_)
{
return this.http.post(environment.BasePath +'Question_Import_Details/Save_Question_Import_Details/',Question_Import_Details_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Question_Import_Details(Question_Import_Details_Name):Observable<any>
{
var Search_Data={'Question_Import_Details_Name':Question_Import_Details_Name}
 return this.http.get(environment.BasePath +'Question_Import_Details/Search_Question_Import_Details/',{params:Search_Data});}
Delete_Question_Import_Details(Question_Import_Details_Id)
{
 return this.http.get(environment.BasePath +'Question_Import_Details/Delete_Question_Import_Details/'+Question_Import_Details_Id);}
Get_Question_Import_Details(Question_Import_Details_Id)
{
 return this.http.get(environment.BasePath +'Question_Import_Details/Get_Question_Import_Details/'+Question_Import_Details_Id);}
}

