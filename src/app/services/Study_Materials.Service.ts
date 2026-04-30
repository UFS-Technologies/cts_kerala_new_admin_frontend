import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Study_Materials_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Study_Materials(Study_Materials_)
{
return this.http.post(environment.BasePath +'Study_Materials/Save_Study_Materials/',Study_Materials_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Study_Materials(Study_Materials_Name):Observable<any>
{
var Search_Data={'Study_Materials_Name':Study_Materials_Name}
 return this.http.get(environment.BasePath +'Study_Materials/Search_Study_Materials/',{params:Search_Data});}
Delete_Study_Materials(Study_Materials_Id)
{
 return this.http.get(environment.BasePath +'Study_Materials/Delete_Study_Materials/'+Study_Materials_Id);}
Get_Study_Materials(Study_Materials_Id)
{
 return this.http.get(environment.BasePath +'Study_Materials/Get_Study_Materials/'+Study_Materials_Id);}
}

