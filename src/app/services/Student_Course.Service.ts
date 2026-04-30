import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Student_Course_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Student_Course(Student_Course_)
{
return this.http.post(environment.BasePath +'Student_Course/Save_Student_Course/',Student_Course_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Student_Course(Student_Course_Name):Observable<any>
{
var Search_Data={'Student_Course_Name':Student_Course_Name}
 return this.http.get(environment.BasePath +'Student_Course/Search_Student_Course/',{params:Search_Data});}
Delete_Student_Course(Student_Course_Id)
{
 return this.http.get(environment.BasePath +'Student_Course/Delete_Student_Course/'+Student_Course_Id);}
Get_Student_Course(Student_Course_Id)
{
 return this.http.get(environment.BasePath +'Student_Course/Get_Student_Course/'+Student_Course_Id);}
}

