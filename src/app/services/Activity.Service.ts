import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Activity_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Activity(Activity_)
{
return this.http.post(environment.BasePath +'Activity/Save_Activity/',Activity_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Activity(Activity_Name_):Observable<any>
{
var Search_Data={'Activity_Name_':Activity_Name_}
 return this.http.get(environment.BasePath +'Activity/Search_Activity/',{params:Search_Data});}
Delete_Activity(Activity_Id)
{
 return this.http.get(environment.BasePath +'Activity/Delete_Activity/'+Activity_Id);}
Get_Activity(Activity_Id)
{
 return this.http.get(environment.BasePath +'Activity/Get_Activity/'+Activity_Id);}
}
