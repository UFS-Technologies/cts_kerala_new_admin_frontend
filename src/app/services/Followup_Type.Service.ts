import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Followup_Type_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Followup_Type(Followup_Type_)
{
return this.http.post(environment.BasePath +'Followup_Type/Save_Followup_Type/',Followup_Type_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Followup_Type(Followup_Type_Name):Observable<any>
{
var Search_Data={'Followup_Type_Name':Followup_Type_Name}
 return this.http.get(environment.BasePath +'Followup_Type/Search_Followup_Type/',{params:Search_Data});}
Delete_Followup_Type(Followup_Type_Id)
{
 return this.http.get(environment.BasePath +'Followup_Type/Delete_Followup_Type/'+Followup_Type_Id);}
Get_Followup_Type(Followup_Type_Id)
{
 return this.http.get(environment.BasePath +'Followup_Type/Get_Followup_Type/'+Followup_Type_Id);}
}

