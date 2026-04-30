import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Course_Import_Details_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Course_Import_Details(Course_Import_Details_)
{
return this.http.post(environment.BasePath +'Course_Import_Details/Save_Course_Import_Details/',Course_Import_Details_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Course_Import_Details(Course_Import_Details_Name):Observable<any>
{
var Search_Data={'Course_Import_Details_Name':Course_Import_Details_Name}
 return this.http.get(environment.BasePath +'Course_Import_Details/Search_Course_Import_Details/',{params:Search_Data});}
Delete_Course_Import_Details(Course_Import_Details_Id)
{
 return this.http.get(environment.BasePath +'Course_Import_Details/Delete_Course_Import_Details/'+Course_Import_Details_Id);}
Get_Course_Import_Details(Course_Import_Details_Id)
{
 return this.http.get(environment.BasePath +'Course_Import_Details/Get_Course_Import_Details/'+Course_Import_Details_Id);}
}

