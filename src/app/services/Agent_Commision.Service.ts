import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Agent_Commision_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Agent_Commision(Agent_Commision_)
{
return this.http.post(environment.BasePath +'Agent_Commision/Save_Agent_Commision/',Agent_Commision_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Agent_Commision(Agent_Commision_Name):Observable<any>
{
var Search_Data={'Agent_Commision_Name':Agent_Commision_Name}
 return this.http.get(environment.BasePath +'Agent_Commision/Search_Agent_Commision/',{params:Search_Data});}
Delete_Agent_Commision(Agent_Commision_Id)
{
 return this.http.get(environment.BasePath +'Agent_Commision/Delete_Agent_Commision/'+Agent_Commision_Id);}
Get_Agent_Commision(Agent_Commision_Id)
{
 return this.http.get(environment.BasePath +'Agent_Commision/Get_Agent_Commision/'+Agent_Commision_Id);}
}

