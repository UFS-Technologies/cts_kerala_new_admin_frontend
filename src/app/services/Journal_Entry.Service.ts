import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Journal_Entry_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Journal_Entry(Journal_Entry_)
{
return this.http.post(environment.BasePath +'Journal_Entry/Save_Journal_Entry/',Journal_Entry_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Accounts_Typeahead(Client_Id,Client_Name):Observable<any>
{
    if(Client_Name==undefined)
    Client_Name="";
 return this.http.get(environment.BasePath +'Client_Accounts/Accounts_Typeahead/'+Client_Id+'/'+Client_Name);
}

 Search_Journal_Entry(Search_FromDate, Search_ToDate,ClientAccount, ClientAccounts_Id,Voucher_No_search_,look_In_Date_Value): Observable<any> {
    return this.http.get(environment.BasePath + 'Journal_Entry/Search_Journal_Entry/'
     + Search_FromDate + '/' + Search_ToDate +   '/' + ClientAccount + '/' + ClientAccounts_Id + '/' + Voucher_No_search_  + '/' + look_In_Date_Value );
}

 Delete_Journal_Entry(Journal_Entry_Id)
{
 return this.http.get(environment.BasePath +'Journal_Entry/Delete_Journal_Entry/'+Journal_Entry_Id);}
Get_Journal_Entry(Journal_Entry_Id)
{
 return this.http.get(environment.BasePath +'Journal_Entry/Get_Journal_Entry/'+Journal_Entry_Id);}
}

