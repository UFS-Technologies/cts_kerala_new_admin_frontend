import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Course_Import_Master_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Course_Import_Master(Course_Import_Master_)
{
return this.http.post(environment.BasePath +'Course_Import_Master/Save_Course_Import_Master/',Course_Import_Master_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Course_Import_Master(Course_Import_Master_Name):Observable<any>
{
var Search_Data={'Course_Import_Master_Name':Course_Import_Master_Name}
 return this.http.get(environment.BasePath +'Course_Import_Master/Search_Course_Import_Master/',{params:Search_Data});}
Delete_Course_Import_Master(Course_Import_Master_Id)
{
 return this.http.get(environment.BasePath +'Course_Import_Master/Delete_Course_Import_Master/'+Course_Import_Master_Id);}
Get_Course_Import_Master(Course_Import_Master_Id)
{
 return this.http.get(environment.BasePath +'Course_Import_Master/Get_Course_Import_Master/'+Course_Import_Master_Id);}
}

