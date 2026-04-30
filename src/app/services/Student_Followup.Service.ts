import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Student_Followup_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Student_Followup(Student_Followup_)
{
return this.http.post(environment.BasePath +'Student_Followup/Save_Student_Followup/',Student_Followup_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Student_Followup(Student_Followup_Name):Observable<any>
{
var Search_Data={'Student_Followup_Name':Student_Followup_Name}
 return this.http.get(environment.BasePath +'Student_Followup/Search_Student_Followup/',{params:Search_Data});}
Delete_Student_Followup(Student_Followup_Id)
{
 return this.http.get(environment.BasePath +'Student_Followup/Delete_Student_Followup/'+Student_Followup_Id);}
Get_Student_Followup(Student_Followup_Id)
{
 return this.http.get(environment.BasePath +'Student_Followup/Get_Student_Followup/'+Student_Followup_Id);}
}

