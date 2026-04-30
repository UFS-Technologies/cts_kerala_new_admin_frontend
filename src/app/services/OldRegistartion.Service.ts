import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class OldRegistartion_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
// Save_Student(Student_)
// {
// return this.http.post(environment.BasePath +'Student/Save_Student/',Student_);
// } 
private modals: any[] = [];
private extractData(res: Response)
{
let body = res;
return body || { };
}
Save_Old_Student_Registration(Old_Student_Registration_)
{
return this.http.post(environment.BasePath +'Old_Student_Registration/Save_Old_Student_Registration/',Old_Student_Registration_);
}

Search_Old_Student_Registration(Student_Name_Search_,Registration_No_Search_):Observable<any>
{
var Search_Data={'Student_Name_Search_':Student_Name_Search_,'Registration_No_Search_':Registration_No_Search_
}
return this.http.get(environment.BasePath +'Old_Student_Registration/Search_Old_Student_Registration/',{params:Search_Data});
}
}

