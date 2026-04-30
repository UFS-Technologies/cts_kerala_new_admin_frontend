import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class University_Followup_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_University_Followup(University_Followup_)
{
return this.http.post(environment.BasePath +'University_Followup/Save_University_Followup/',University_Followup_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_University_Followup(University_Followup_Name):Observable<any>
{
var Search_Data={'University_Followup_Name':University_Followup_Name}
 return this.http.get(environment.BasePath +'University_Followup/Search_University_Followup/',{params:Search_Data});}
Delete_University_Followup(University_Followup_Id)
{
 return this.http.get(environment.BasePath +'University_Followup/Delete_University_Followup/'+University_Followup_Id);}
Get_University_Followup(University_Followup_Id)
{
 return this.http.get(environment.BasePath +'University_Followup/Get_University_Followup/'+University_Followup_Id);}
}

