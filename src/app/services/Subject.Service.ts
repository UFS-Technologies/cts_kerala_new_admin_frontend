import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Subject_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Subject(Subject_)
{
return this.http.post(environment.BasePath +'Subject/Save_Subject/',Subject_);
}
Accept_Subject(Subject_)
{
return this.http.post(environment.BasePath +'Subject/Accept_Subject/',Subject_);
}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Subject(Subject_Name):Observable<any>
{
var Search_Data={'Subject_Name':Subject_Name}
 return this.http.get(environment.BasePath +'Subject/Search_Subject/',{params:Search_Data});
}
Search_Pending_Subject(Subject_Name):Observable<any>
{
var Search_Data={'Subject_Name':Subject_Name}
 return this.http.get(environment.BasePath +'Subject/Search_Pending_Subject/',{params:Search_Data});
}
Delete_Subject(Subject_Id,Request_Status)
{
 return this.http.get(environment.BasePath +'Subject/Delete_Subject/'+Subject_Id+'/'+Request_Status);
}
Get_Subject(Subject_Id)
{
 return this.http.get(environment.BasePath +'Subject/Get_Subject/'+Subject_Id);}
}

