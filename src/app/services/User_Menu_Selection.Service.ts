import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class User_Menu_Selection_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_User_Menu_Selection(User_Menu_Selection_)
{
return this.http.post(environment.BasePath +'User_Menu_Selection/Save_User_Menu_Selection/',User_Menu_Selection_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_User_Menu_Selection(User_Menu_Selection_Name):Observable<any>
{
var Search_Data={'User_Menu_Selection_Name':User_Menu_Selection_Name}
 return this.http.get(environment.BasePath +'User_Menu_Selection/Search_User_Menu_Selection/',{params:Search_Data});}
Delete_User_Menu_Selection(User_Menu_Selection_Id)
{
 return this.http.get(environment.BasePath +'User_Menu_Selection/Delete_User_Menu_Selection/'+User_Menu_Selection_Id);}
Get_User_Menu_Selection(User_Menu_Selection_Id)
{
 return this.http.get(environment.BasePath +'User_Menu_Selection/Get_User_Menu_Selection/'+User_Menu_Selection_Id);}
}

