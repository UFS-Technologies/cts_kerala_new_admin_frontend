import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Category_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Category(Category_)
{
return this.http.post(environment.BasePath +'Category/Save_Category/',Category_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Category(Category_Name):Observable<any>
{
var Search_Data={'Category_Name':Category_Name}
 return this.http.get(environment.BasePath +'Category/Search_Category/',{params:Search_Data});}
Delete_Category(Category_Id)
{
 return this.http.get(environment.BasePath +'Category/Delete_Category/'+Category_Id);}
Get_Category(Category_Id)
{
 return this.http.get(environment.BasePath +'Category/Get_Category/'+Category_Id);}
}

