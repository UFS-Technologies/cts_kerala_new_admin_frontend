import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Exam_Master_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Exam_Master(Exam_Master_)
{
return this.http.post(environment.BasePath +'Exam_Master/Save_Exam_Master/',Exam_Master_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Exam_Master(Exam_Master_Name):Observable<any>
{
var Search_Data={'Exam_Master_Name':Exam_Master_Name}
 return this.http.get(environment.BasePath +'Exam_Master/Search_Exam_Master/',{params:Search_Data});}
Delete_Exam_Master(Exam_Master_Id)
{
 return this.http.get(environment.BasePath +'Exam_Master/Delete_Exam_Master/'+Exam_Master_Id);}
Get_Exam_Master(Exam_Master_Id)
{
 return this.http.get(environment.BasePath +'Exam_Master/Get_Exam_Master/'+Exam_Master_Id);}
}

