import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Student_Course_Subject_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Student_Course_Subject(Student_Course_Subject_)
{
return this.http.post(environment.BasePath +'Student_Course_Subject/Save_Student_Course_Subject/',Student_Course_Subject_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Student_Course_Subject(Student_Course_Subject_Name):Observable<any>
{
var Search_Data={'Student_Course_Subject_Name':Student_Course_Subject_Name}
 return this.http.get(environment.BasePath +'Student_Course_Subject/Search_Student_Course_Subject/',{params:Search_Data});}
Delete_Student_Course_Subject(Student_Course_Subject_Id)
{
 return this.http.get(environment.BasePath +'Student_Course_Subject/Delete_Student_Course_Subject/'+Student_Course_Subject_Id);}
Get_Student_Course_Subject(Student_Course_Subject_Id)
{
 return this.http.get(environment.BasePath +'Student_Course_Subject/Get_Student_Course_Subject/'+Student_Course_Subject_Id);}
}

