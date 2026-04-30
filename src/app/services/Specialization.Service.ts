import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Specialization_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Specialization(Specialization_)
{
return this.http.post(environment.BasePath +'Specialization/Save_Specialization/',Specialization_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Specialization(Specialization_Name):Observable<any>
{
var Search_Data={'Specialization_Name':Specialization_Name}
 return this.http.get(environment.BasePath +'Specialization/Search_Specialization/',{params:Search_Data});}
Delete_Specialization(Specialization_Id)
{
 return this.http.get(environment.BasePath +'Specialization/Delete_Specialization/'+Specialization_Id);}
Get_Specialization(Specialization_Id)
{
 return this.http.get(environment.BasePath +'Specialization/Get_Specialization/'+Specialization_Id);}
}

