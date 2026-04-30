import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class User_Type_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_User_Type(User_Type_)
{
return this.http.post(environment.BasePath +'User_Type/Save_User_Type/',User_Type_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_User_Type(User_Type_Name):Observable<any>
{
var Search_Data={'User_Type_Name':User_Type_Name}
 return this.http.get(environment.BasePath +'User_Type/Search_User_Type/',{params:Search_Data});}
Delete_User_Type(User_Type_Id)
{
 return this.http.get(environment.BasePath +'User_Type/Delete_User_Type/'+User_Type_Id);}
Get_User_Type(User_Type_Id)
{
 return this.http.get(environment.BasePath +'User_Type/Get_User_Type/'+User_Type_Id);}
}

