import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class University_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_University(University_)
{
return this.http.post(environment.BasePath +'University/Save_University/',University_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_University(University_Name,Page_Start_,Page_End_,Page_Length_):Observable<any>
{
var Search_Data={'University_Name':University_Name,'Page_Start_':Page_Start_,'Page_End_':Page_End_,'Page_Length_':Page_Length_
}
 return this.http.get(environment.BasePath +'University/Search_University/',{params:Search_Data});}
Delete_University(University_Id)
{
 return this.http.get(environment.BasePath +'University/Delete_University/'+University_Id);}
Get_University(University_Id)
{
 return this.http.get(environment.BasePath +'University/Get_University/'+University_Id);
}
Get_Menu_Status(Menu_Id_,Login_User_)
{
       return this.http.get(environment.BasePath + 'Agent/Get_Menu_Status/' + Menu_Id_+'/'+Login_User_);
}
Search_Activity_For_University():Observable<any>
{
 return this.http.get(environment.BasePath +'Activity/Search_Activity_For_University/');}
 Get_Activity_Selection_Edit(University_Id) 
{
    return this.http.get(environment.BasePath + 'University/Get_Activity_Selection_Edit/' + University_Id);
}
}


