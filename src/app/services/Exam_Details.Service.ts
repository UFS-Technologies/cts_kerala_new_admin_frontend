import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Exam_Details_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Exam_Details(Exam_Details_)
{
return this.http.post(environment.BasePath +'Exam_Details/Save_Exam_Details/',Exam_Details_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Exam_Details(Exam_Details_Name):Observable<any>
{
var Search_Data={'Exam_Details_Name':Exam_Details_Name}
 return this.http.get(environment.BasePath +'Exam_Details/Search_Exam_Details/',{params:Search_Data});}
Delete_Exam_Details(Exam_Details_Id)
{
 return this.http.get(environment.BasePath +'Exam_Details/Delete_Exam_Details/'+Exam_Details_Id);}
Get_Exam_Details(Exam_Details_Id)
{
 return this.http.get(environment.BasePath +'Exam_Details/Get_Exam_Details/'+Exam_Details_Id);}
}

