import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Course_Fees_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Course_Fees(Course_Fees_)
{
return this.http.post(environment.BasePath +'Course_Fees/Save_Course_Fees/',Course_Fees_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Course_Fees(Course_Fees_Name):Observable<any>
{
var Search_Data={'Course_Fees_Name':Course_Fees_Name}
 return this.http.get(environment.BasePath +'Course_Fees/Search_Course_Fees/',{params:Search_Data});}
Delete_Course_Fees(Course_Fees_Id)
{
 return this.http.get(environment.BasePath +'Course_Fees/Delete_Course_Fees/'+Course_Fees_Id);}
Get_Course_Fees(Course_Fees_Id)
{
 return this.http.get(environment.BasePath +'Course_Fees/Get_Course_Fees/'+Course_Fees_Id);}
}

