import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Contra_Entry_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Contra_Entry(Contra_Entry_)
{
return this.http.post(environment.BasePath +'Contra_Entry/Save_Contra_Entry/',Contra_Entry_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Contra_Entry(Search_FromDate, Search_ToDate,ClientAccount, ClientAccounts_Id,Voucher_No_search_,look_In_Date_Value): Observable<any> {
     
    return this.http.get(environment.BasePath + 'Contra_Entry/Search_Contra_Entry/'
     + Search_FromDate + '/' + Search_ToDate +   '/' + ClientAccount + '/' + ClientAccounts_Id + '/' + Voucher_No_search_  + '/' + look_In_Date_Value );
}
Delete_Contra_Entry(Contra_Entry_Id)
{
 return this.http.get(environment.BasePath +'Contra_Entry/Delete_Contra_Entry/'+Contra_Entry_Id);}
Get_Contra_Entry(Contra_Entry_Id)
{
 return this.http.get(environment.BasePath +'Contra_Entry/Get_Contra_Entry/'+Contra_Entry_Id);}
}

