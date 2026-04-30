import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Fees_Receipt_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Fees_Receipt(Fees_Receipt_)
{
return this.http.post(environment.BasePath +'Fees_Receipt/Save_Fees_Receipt/',Fees_Receipt_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Fees_Receipt(Fees_Receipt_Name):Observable<any>
{
var Search_Data={'Fees_Receipt_Name':Fees_Receipt_Name}
 return this.http.get(environment.BasePath +'Fees_Receipt/Search_Fees_Receipt/',{params:Search_Data});}
Delete_Fees_Receipt(Fees_Receipt_Id)
{
 return this.http.get(environment.BasePath +'Fees_Receipt/Delete_Fees_Receipt/'+Fees_Receipt_Id);}
Get_Fees_Receipt(Fees_Receipt_Id)
{
 return this.http.get(environment.BasePath +'Fees_Receipt/Get_Fees_Receipt/'+Fees_Receipt_Id);}
}

