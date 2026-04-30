import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Mark_List_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Mark_List(Mark_List_)
{
return this.http.post(environment.BasePath +'Mark_List/Save_Mark_List/',Mark_List_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Mark_List(Mark_List_Name):Observable<any>
{
var Search_Data={'Mark_List_Name':Mark_List_Name}
 return this.http.get(environment.BasePath +'Mark_List/Search_Mark_List/',{params:Search_Data});}
Delete_Mark_List(Mark_List_Id)
{
 return this.http.get(environment.BasePath +'Mark_List/Delete_Mark_List/'+Mark_List_Id);}
Get_Mark_List(Mark_List_Id)
{
 return this.http.get(environment.BasePath +'Mark_List/Get_Mark_List/'+Mark_List_Id);}
}

