import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Account_Voucher_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata

private extractData(res: Response)
{
let body = res;
return body || { };
}
Save_Account_Voucher(Account_Voucher_)
{
   return this.http.post(environment.BasePath +'Account_Voucher/Save_Account_Voucher/',Account_Voucher_);
}
Save_Account_Voucher_Mobile(Account_Voucher_)
{
   return this.http.post(environment.BasePath +'Account_Voucher/Save_Account_Voucher_Mobile/',Account_Voucher_);
}
Search_Ledger(Search_FromDate, Search_ToDate, ClientAccounts_Id, Voucher_Type_Id): Observable<any> {
   ;
 return this.http.get(environment.BasePath + 'Account_Voucher/Ledger_Report/'  
  + Search_FromDate + '/' + Search_ToDate + '/' + ClientAccounts_Id + '/' + Voucher_Type_Id  );
}
Search_Sales_Summary_Report(look_In_Date_Value,Search_FromDate, Search_ToDate, ClientAccounts_Id, Voucher_No,Employee_Id): Observable<any> {
return this.http.get(environment.BasePath + 'Account_Voucher/Get_Sales_summary/'  +look_In_Date_Value+'/'+ Search_FromDate + '/' + Search_ToDate + '/' + 
ClientAccounts_Id + '/' + Voucher_No + '/' +  Employee_Id);
}
Search_Sales_Report_Details(look_In_Date_Value,Search_FromDate, Search_ToDate, ClientAccounts_Id, Employee_Id,Item_Id_): Observable<any> {
   return this.http.get(environment.BasePath + 'Account_Voucher/Search_Sales_Report_Details/'  +look_In_Date_Value+'/'+ Search_FromDate + '/' + Search_ToDate + '/' + 
   ClientAccounts_Id + '/' + Employee_Id + '/' +  Item_Id_);
}
Customer_Sales_Report(look_In_Date_Value,Search_FromDate, Search_ToDate, ClientAccounts_Id, Item_Id_): Observable<any> {
   return this.http.get(environment.BasePath + 'Account_Voucher/Customer_Sales_Report/'  +look_In_Date_Value+'/'+ Search_FromDate + '/' + Search_ToDate + '/' + 
   ClientAccounts_Id + '/'  +  Item_Id_);
}
Employee_Sales_Report(look_In_Date_Value,Search_FromDate, Search_ToDate, Employee_Id, Item_Id_): Observable<any> {
   return this.http.get(environment.BasePath + 'Account_Voucher/Employee_Sales_Report/'  +look_In_Date_Value+'/'+ Search_FromDate + '/' + Search_ToDate + '/' + 
   Employee_Id + '/'  +  Item_Id_);
}
Search_Sales_Report(look_In_Date_Value,Search_FromDate, Search_ToDate, ClientAccounts_Id, Employee_Id,Item_Id_): Observable<any> {
      return this.http.get(environment.BasePath + 'Account_Voucher/Search_Sales_Report/'  +look_In_Date_Value+'/'+ Search_FromDate + '/' + Search_ToDate + '/' + 
      ClientAccounts_Id + '/' + Employee_Id + '/' +  Item_Id_);
      }
Search_Sales_Report_Monthly_Items(look_In_Date_Value,Search_FromDate, Search_ToDate, ClientAccounts_Id, Employee_Id,Item_Id_): Observable<any> {
         return this.http.get(environment.BasePath + 'Account_Voucher/Search_Sales_Report_Monthly_Items/'  +look_In_Date_Value+'/'+ Search_FromDate + '/' + Search_ToDate + '/' + 
         ClientAccounts_Id + '/' + Employee_Id + '/' +  Item_Id_);
         }
Search_Sales_Details_Report(look_In_Date_Value,Search_FromDate, Search_ToDate, ClientAccounts_Id, Voucher_No,Bill_Type_,Item_Id_,Item_Group_Id_,Barcode_Search_,Employee_Id): Observable<any> 
{
 return this.http.get(environment.BasePath + 'Account_Voucher/Get_Sales_Details_Report/' + look_In_Date_Value +'/' + Search_FromDate + '/' + Search_ToDate + '/' + 
 ClientAccounts_Id + '/' + Voucher_No +'/'+Bill_Type_+'/'+Item_Id_+'/'+Item_Group_Id_+'/'+Barcode_Search_+'/'+Employee_Id);
}
Search_Account_Voucher(Search_FromDate, Search_ToDate,ClientAccount, ClientAccounts_Id,Voucher_No_search_,look_In_Date_Value,Employee_Id,Payment_Status_Id): Observable<any> {
 return this.http.get(environment.BasePath + 'Account_Voucher/Search_Account_Voucher/' + Search_FromDate +  '/' + Search_ToDate + 
   '/' + ClientAccount + '/' + ClientAccounts_Id + '/' + Voucher_No_search_  + '/' + look_In_Date_Value + '/' +Employee_Id+'/'+Payment_Status_Id);
}
Get_Stock_Report(Barcode_Search_,Item_Id_,Item_Group_Id_,Employee_Id,look_In_Date_Value): Observable<any> {
    
   return this.http.get(environment.BasePath + 'Account_Voucher/Get_Stock_Report/'+ Barcode_Search_ + '/' + Item_Id_+ '/' + Item_Group_Id_+ '/' + Employee_Id+'/'+look_In_Date_Value);
}
Item_Expiry_Report(look_In_Date_Value,Search_FromDate, Search_ToDate,Barcode_Search_,Item_Id_,Item_Group_Id_,Employee_Id): Observable<any> {
    
   return this.http.get(environment.BasePath + 'Account_Voucher/Item_Expiry_Report/' +look_In_Date_Value+'/'+ Search_FromDate + '/' + Search_ToDate + '/' + Barcode_Search_ + '/' + Item_Id_+ '/' + Item_Group_Id_+ '/' + Employee_Id);
}
Search_DayBook_Report(Search_FromDate, Search_ToDate): Observable<any>
{
   return this.http.get(environment.BasePath + 'Account_Voucher/Load_DayBook_Report/'+ Search_FromDate + '/' + Search_ToDate );
}
Search_Company() 
{
   return this.http.get(environment.BasePath + 'Account_Voucher/Search_Company');
}
Get_Client_Accounts_Typeahead(Client_Accounts_Name): Observable<any> 
{
return this.http.get(environment.BasePath + 'Account_Voucher/Client_Accounts_Typeahead/' + Client_Accounts_Name );
}
Search_Accounts(Client_Accounts_Name): Observable<any> {  
return this.http.get(environment.BasePath + 'Account_Voucher/Client_Accounts_Typeahead/' + Client_Accounts_Name );
}
Get_Voucher_Type():Observable<any>
{
 return this.http.get(environment.BasePath +'Account_Voucher/Search_Voucher_Type/');
}
 Delete_Account_Voucher(Account_Voucher_Id)
{
 return this.http.get(environment.BasePath +'Account_Voucher/Delete_Account_Voucher/'+Account_Voucher_Id);
}
Get_Account_Voucher(Account_Voucher_Id)
{
 return this.http.get(environment.BasePath +'Account_Voucher/Get_Account_Voucher/'+Account_Voucher_Id);
}
Get_Account_Voucher_Mobile(Account_Voucher_Id)
{
 return this.http.get(environment.BasePath +'Account_Voucher/Get_Account_Voucher_Mobile/'+Account_Voucher_Id);
}
Get_Payment_Mode():Observable<any>
{
 return this.http.get(environment.BasePath +'Client_Accounts/Get_Payment_Mode/');
}
Accounts_Typeahead(Client_Id,Client_Name):Observable<any>
{
    if(Client_Name==undefined)
    Client_Name="";
 return this.http.get(environment.BasePath +'Client_Accounts/Accounts_Typeahead/'+Client_Id+'/'+Client_Name);
}
}

