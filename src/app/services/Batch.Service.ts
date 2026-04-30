import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Batch_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Batch(Batch_)
{
return this.http.post(environment.BasePath +'Batch/Save_Batch/',Batch_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Batch(Batch_Name):Observable<any>
{
var Search_Data={'Batch_Name':Batch_Name}
 return this.http.get(environment.BasePath +'Batch/Search_Batch/',{params:Search_Data});}
Delete_Batch(Batch_Id)
{
 return this.http.get(environment.BasePath +'Batch/Delete_Batch/'+Batch_Id);}
Get_Batch(Batch_Id)
{
 return this.http.get(environment.BasePath +'Batch/Get_Batch/'+Batch_Id);}
}

