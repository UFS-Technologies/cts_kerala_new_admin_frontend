import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Payment_Voucher_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Payment_Voucher(Payment_Voucher_)
{
return this.http.post(environment.BasePath +'Payment_Voucher/Save_Payment_Voucher/',Payment_Voucher_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}



Search_Payment_Voucher(Search_FromDate, Search_ToDate,ClientAccount, ClientAccounts_Id,Voucher_No_search_,look_In_Date_Value): Observable<any> {
     
    return this.http.get(environment.BasePath + 'Payment_Voucher/Search_Payment_Voucher/'
     + Search_FromDate + '/' + Search_ToDate +   '/' + ClientAccount + '/' + ClientAccounts_Id + '/' + Voucher_No_search_  + '/' + look_In_Date_Value );
}
 Get_Payment_Mode():Observable<any>
{
 return this.http.get(environment.BasePath +'Client_Accounts/Get_Payment_Mode/');
}
Delete_Payment_Voucher(Payment_Voucher_Id)
{
 return this.http.get(environment.BasePath +'Payment_Voucher/Delete_Payment_Voucher/'+Payment_Voucher_Id);}
Get_Payment_Voucher(Payment_Voucher_Id)
{
 return this.http.get(environment.BasePath +'Payment_Voucher/Get_Payment_Voucher/'+Payment_Voucher_Id);}
}

