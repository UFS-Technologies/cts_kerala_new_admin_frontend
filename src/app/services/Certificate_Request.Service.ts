import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Certificate_Request_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Certificate_Request(Certificate_Request_)
{
return this.http.post(environment.BasePath +'Certificate_Request/Save_Certificate_Request/',Certificate_Request_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Certificate_Request(Certificate_Request_Name):Observable<any>
{
var Search_Data={'Certificate_Request_Name':Certificate_Request_Name}
 return this.http.get(environment.BasePath +'Certificate_Request/Search_Certificate_Request/',{params:Search_Data});}
Delete_Certificate_Request(Certificate_Request_Id)
{
 return this.http.get(environment.BasePath +'Certificate_Request/Delete_Certificate_Request/'+Certificate_Request_Id);}
Get_Certificate_Request(Certificate_Request_Id)
{
 return this.http.get(environment.BasePath +'Certificate_Request/Get_Certificate_Request/'+Certificate_Request_Id);}
}

