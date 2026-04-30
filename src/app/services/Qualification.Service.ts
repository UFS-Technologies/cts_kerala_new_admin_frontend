import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Qualification_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Qualification(Qualification_)
{
return this.http.post(environment.BasePath +'Qualification/Save_Qualification/',Qualification_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Qualification(Qualification_Name):Observable<any>
{
var Search_Data={'Qualification_Name':Qualification_Name}
 return this.http.get(environment.BasePath +'Qualification/Search_Qualification/',{params:Search_Data});}
Delete_Qualification(Qualification_Id)
{
 return this.http.get(environment.BasePath +'Qualification/Delete_Qualification/'+Qualification_Id);}
Get_Qualification(Qualification_Id)
{
 return this.http.get(environment.BasePath +'Qualification/Get_Qualification/'+Qualification_Id);}
}

