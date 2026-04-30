import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Functionl_Area_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Functionl_Area(Functionl_Area_)
{
return this.http.post(environment.BasePath +'Functionl_Area/Save_Functionl_Area/',Functionl_Area_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Functionl_Area(Functionl_Area_Name):Observable<any>
{
var Search_Data={'Functionl_Area_Name':Functionl_Area_Name}
 return this.http.get(environment.BasePath +'Functionl_Area/Search_Functionl_Area/',{params:Search_Data});}
Delete_Functionl_Area(Functionl_Area_Id)
{
 return this.http.get(environment.BasePath +'Functionl_Area/Delete_Functionl_Area/'+Functionl_Area_Id);}
Get_Functionl_Area(Functionl_Area_Id)
{
 return this.http.get(environment.BasePath +'Functionl_Area/Get_Functionl_Area/'+Functionl_Area_Id);}
}

