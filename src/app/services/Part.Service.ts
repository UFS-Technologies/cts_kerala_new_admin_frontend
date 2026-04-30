import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Part_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Part(Part_)
{
return this.http.post(environment.BasePath +'Part/Save_Part/',Part_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Part(Part_Name):Observable<any>
{
var Search_Data={'Part_Name':Part_Name}
 return this.http.get(environment.BasePath +'Part/Search_Part/',{params:Search_Data});}
Delete_Part(Part_Id)
{
 return this.http.get(environment.BasePath +'Part/Delete_Part/'+Part_Id);}
Get_Part(Part_Id)
{
 return this.http.get(environment.BasePath +'Part/Get_Part/'+Part_Id);}
}

