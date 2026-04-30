import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Client_Accounts_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Client_Accounts(Client_Accounts_)
{
return this.http.post(environment.BasePath +'Client_Accounts/Save_Client_Accounts/',Client_Accounts_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Client_Accounts(Client_Accounts_Name,Account_Group_Id):Observable<any>
{
    var Search_Data={'Client_Accounts_Name_':Client_Accounts_Name,'Account_Group_':Account_Group_Id}
    return this.http.get(environment.BasePath +'Client_Accounts/Search_Client_Accounts/',{params:Search_Data});}
 Search_Customer(Client_Accounts_Name,Account_Group_Id):Observable<any>
{
    var Search_Data={'Client_Accounts_Name_':Client_Accounts_Name,'Account_Group_':Account_Group_Id}
    return this.http.get(environment.BasePath +'Client_Accounts/Search_Customer/',{params:Search_Data});}
 
 Get_Client_Employee_Typeahead(Client_Accounts_Id):Observable<any>
 {
  return this.http.get(environment.BasePath +'Client_Accounts/Get_Client_Employee_Typeahead/'+Client_Accounts_Id);}


 Delete_Client_Accounts(Client_Accounts_Id)
{
 return this.http.get(environment.BasePath +'Client_Accounts/Delete_Client_Accounts/'+Client_Accounts_Id);
}

Get_Client_Accounts(Client_Accounts_Id)
{
 return this.http.get(environment.BasePath +'Client_Accounts/Get_Client_Accounts/'+Client_Accounts_Id);}
}

