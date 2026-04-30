import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Experience_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Experience(Experience_)
{
return this.http.post(environment.BasePath +'Experience/Save_Experience/',Experience_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Experience(Experience_Name):Observable<any>
{
var Search_Data={'Experience_Name':Experience_Name}
 return this.http.get(environment.BasePath +'Experience/Search_Experience/',{params:Search_Data});}
Delete_Experience(Experience_Id)
{
 return this.http.get(environment.BasePath +'Experience/Delete_Experience/'+Experience_Id);}
Get_Experience(Experience_Id)
{
 return this.http.get(environment.BasePath +'Experience/Get_Experience/'+Experience_Id);}
}

