import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class GeneralFunctions_Service {
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



Get_Menu_Status(Menu_Id_,Login_User_)
{
       return this.http.get(environment.BasePath + 'Users/Get_Menu_Status/' + Menu_Id_+'/'+Login_User_);
}


}

