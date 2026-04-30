import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Subscription_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Subscription(Subscription_)
{
return this.http.post(environment.BasePath +'Subscription/Save_Subscription/',Subscription_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Subscription(Subscription_Name):Observable<any>
{
var Search_Data={'Subscription_Name':Subscription_Name}
 return this.http.get(environment.BasePath +'Subscription/Search_Subscription/',{params:Search_Data});}
Delete_Subscription(Subscription_Id)
{
 return this.http.get(environment.BasePath +'Subscription/Delete_Subscription/'+Subscription_Id);}
Get_Subscription(Subscription_Id)
{
 return this.http.get(environment.BasePath +'Subscription/Get_Subscription/'+Subscription_Id);}
}

