import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Document_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Document(Document_)
{
return this.http.post(environment.BasePath +'Document/Save_Document/',Document_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Document(Document_Name):Observable<any>
{
var Search_Data={'Document_Name':Document_Name}
 return this.http.get(environment.BasePath +'Document/Search_Document/',{params:Search_Data});}
Delete_Document(Document_Id)
{
 return this.http.get(environment.BasePath +'Document/Delete_Document/'+Document_Id);}
Get_Document(Document_Id)
{
 return this.http.get(environment.BasePath +'Document/Get_Document/'+Document_Id);}
}

