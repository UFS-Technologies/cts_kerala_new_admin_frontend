import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Fees_Type_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Fees_Type(Fees_Type_)
{
return this.http.post(environment.BasePath +'Fees_Type/Save_Fees_Type/',Fees_Type_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Fees_Type(Fees_Type_Name):Observable<any>
{
var Search_Data={'Fees_Type_Name':Fees_Type_Name}
 return this.http.get(environment.BasePath +'Fees_Type/Search_Fees_Type/',{params:Search_Data});}
Delete_Fees_Type(Fees_Type_Id)
{
 return this.http.get(environment.BasePath +'Fees_Type/Delete_Fees_Type/'+Fees_Type_Id);}
Get_Fees_Type(Fees_Type_Id)
{
 return this.http.get(environment.BasePath +'Fees_Type/Get_Fees_Type/'+Fees_Type_Id);}
}

