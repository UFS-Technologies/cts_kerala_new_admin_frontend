import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class User_Role_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_User_Role(User_Role_)
{
return this.http.post(environment.BasePath +'User_Role/Save_User_Role/',User_Role_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_User_Role(User_Role_Name):Observable<any>
{
var Search_Data={'User_Role_Name':User_Role_Name}
 return this.http.get(environment.BasePath +'User_Role/Search_User_Role/',{params:Search_Data});}
Delete_User_Role(User_Role_Id)
{
 return this.http.get(environment.BasePath +'User_Role/Delete_User_Role/'+User_Role_Id);}
Get_User_Role(User_Role_Id)
{
 return this.http.get(environment.BasePath +'User_Role/Get_User_Role/'+User_Role_Id);}
}

