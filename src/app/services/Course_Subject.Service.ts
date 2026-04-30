import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Course_Subject_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Course_Subject(Course_Subject_)
{
return this.http.post(environment.BasePath +'Course_Subject/Save_Course_Subject/',Course_Subject_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Course_Subject(Course_Subject_Name):Observable<any>
{
var Search_Data={'Course_Subject_Name':Course_Subject_Name}
 return this.http.get(environment.BasePath +'Course_Subject/Search_Course_Subject/',{params:Search_Data});}
Delete_Course_Subject(Course_Subject_Id)
{
 return this.http.get(environment.BasePath +'Course_Subject/Delete_Course_Subject/'+Course_Subject_Id);}
Get_Course_Subject(Course_Subject_Id)
{
 return this.http.get(environment.BasePath +'Course_Subject/Get_Course_Subject/'+Course_Subject_Id);}
}

