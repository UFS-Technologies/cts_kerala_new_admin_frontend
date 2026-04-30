import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Certificates_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Certificates(Certificates_)
{
return this.http.post(environment.BasePath +'Certificates/Save_Certificates/',Certificates_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Certificates(Certificates_Name):Observable<any>
{
var Search_Data={'Certificates_Name':Certificates_Name}
 return this.http.get(environment.BasePath +'Certificates/Search_Certificates/',{params:Search_Data});}
Delete_Certificates(Certificates_Id)
{
 return this.http.get(environment.BasePath +'Certificates/Delete_Certificates/'+Certificates_Id);}
Get_Certificates(Certificates_Id)
{
 return this.http.get(environment.BasePath +'Certificates/Get_Certificates/'+Certificates_Id);}
}

