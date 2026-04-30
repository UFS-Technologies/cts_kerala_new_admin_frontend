import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Status_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Status(Status_)
{
return this.http.post(environment.BasePath +'Status/Save_Status/',Status_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Status(Status_Name):Observable<any>
{
var Search_Data={'Status_Name':Status_Name}
 return this.http.get(environment.BasePath +'Status/Search_Status/',{params:Search_Data});}
Delete_Status(Status_Id)
{
 return this.http.get(environment.BasePath +'Status/Delete_Status/'+Status_Id);}
Get_Status(Status_Id)
{
 return this.http.get(environment.BasePath +'Status/Get_Status/'+Status_Id);}
}

