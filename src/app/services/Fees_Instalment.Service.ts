import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Fees_Instalment_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Fees_Instalment(Fees_Instalment_)
{
return this.http.post(environment.BasePath +'Fees_Instalment/Save_Fees_Instalment/',Fees_Instalment_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Fees_Instalment(Fees_Instalment_Name):Observable<any>
{
var Search_Data={'Fees_Instalment_Name':Fees_Instalment_Name}
 return this.http.get(environment.BasePath +'Fees_Instalment/Search_Fees_Instalment/',{params:Search_Data});}
Delete_Fees_Instalment(Fees_Instalment_Id)
{
 return this.http.get(environment.BasePath +'Fees_Instalment/Delete_Fees_Instalment/'+Fees_Instalment_Id);}
Get_Fees_Instalment(Fees_Instalment_Id)
{
 return this.http.get(environment.BasePath +'Fees_Instalment/Get_Fees_Instalment/'+Fees_Instalment_Id);}
}

