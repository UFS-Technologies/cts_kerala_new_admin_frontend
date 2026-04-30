import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Settings_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Settings(Settings_)
{
return this.http.post(environment.BasePath +'Settings/Save_Settings/',Settings_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Settings(Settings_Name):Observable<any>
{
var Search_Data={'Settings_Name':Settings_Name}
 return this.http.get(environment.BasePath +'Settings/Search_Settings/',{params:Search_Data});}
Delete_Settings(Settings_Id)
{
 return this.http.get(environment.BasePath +'Settings/Delete_Settings/'+Settings_Id);}
Get_Settings(Settings_Id)
{
 return this.http.get(environment.BasePath +'Settings/Get_Settings/'+Settings_Id);}
}

