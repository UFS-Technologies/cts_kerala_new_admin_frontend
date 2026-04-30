import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Accounts_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Accounts(Accounts_)
{
return this.http.post(environment.BasePath +'Accounts/Save_Accounts/',Accounts_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Accounts(Accounts_Name):Observable<any>
{
var Search_Data={'Accounts_Name':Accounts_Name}
 return this.http.get(environment.BasePath +'Accounts/Search_Accounts/',{params:Search_Data});}
Delete_Accounts(Accounts_Id)
{
 return this.http.get(environment.BasePath +'Accounts/Delete_Accounts/'+Accounts_Id);}
Get_Accounts(Accounts_Id)
{
 return this.http.get(environment.BasePath +'Accounts/Get_Accounts/'+Accounts_Id);}
}

