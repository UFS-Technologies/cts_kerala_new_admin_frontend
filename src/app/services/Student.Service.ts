import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
import { Company } from '../models/Company.js';
@Injectable({
providedIn: 'root'
})
export class Student_Service {
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
// Save_Student(Main_Array, ImageFile_Photo: File[],ImageFile_Aadhaar: File[], Document_File_Array: File[],
//     Document_Array: any[],Document_Description :string,ImageFile: File[],Display_File_Name_:string) {
//     const postData = new FormData();
//    debugger
//     if (Main_Array.Student != null) {
        
//         postData.append("Student_Id_Student", Main_Array.Student.Student_Id);
//         postData.append("Student_Name", Main_Array.Student.Student_Name);
//         postData.append("Address1", Main_Array.Student.Address1);
//         postData.append("Address2", Main_Array.Student.Address2);
//         postData.append("Address3", Main_Array.Student.Address3);
//         postData.append("Address4", Main_Array.Student.Address4);
//         postData.append("Pincode", Main_Array.Student.Pincode);
//         postData.append("Phone", Main_Array.Student.Phone);
//         postData.append("Mobile", Main_Array.Student.Mobile);
//         postData.append("Whatsapp", Main_Array.Student.Whatsapp);
//         postData.append("DOB", Main_Array.Student.DOB);
//         postData.append("Gender", Main_Array.Student.Gender);
//         postData.append("Email", Main_Array.Student.Email);
//         postData.append("Alternative_Email", Main_Array.Student.Alternative_Email);
//         postData.append("Passport_No", Main_Array.Student.Passport_No);
//         postData.append("Passport_Expiry", Main_Array.Student.Passport_Expiry);
//         postData.append("User_Name", Main_Array.Student.User_Name);
//         postData.append("Password", Main_Array.Student.Password);
//         postData.append("Photo", Main_Array.Student.Photo);
//         postData.append("User_Id", Main_Array.Student.User_Id);
//         postData.append("Registration_No", Main_Array.Student.Registration_No);
//         postData.append("Role_No", Main_Array.Student.Role_No);
   
//        postData.append("Aadhaar", Main_Array.Student.Aadhaar);
//        postData.append("Agent_Id_Student", Main_Array.Student.Agent_Id);
//        postData.append("Agent_Name_Student", Main_Array.Student.Agent_Name);

        
//     }

//     if (Main_Array.Followup != null) {
        
//         postData.append("Student_Followup_Id", Main_Array.Followup.Student_Followup_Id);
//         postData.append("Student_Id", Main_Array.Followup.Student_Id);
//         postData.append("Entry_Date", Main_Array.Followup.Entry_Date);
//         postData.append("Next_FollowUp_Date", Main_Array.Followup.Next_FollowUp_Date);
//         postData.append("FollowUp_Difference", Main_Array.Followup.FollowUp_Difference);
//         postData.append("Status", Main_Array.Followup.Status);
//         postData.append("By_User_Id", Main_Array.Followup.By_User_Id);
//         postData.append("To_User_Id", Main_Array.Followup.To_User_Id);
//         postData.append("Remark", Main_Array.Followup.Remark);
//         postData.append("Remark_Id", Main_Array.Followup.Remark_Id);
//         postData.append("FollowUp_Type", Main_Array.Followup.FollowUp_Type);
//         postData.append("FollowUP_Time", Main_Array.Followup.FollowUP_Time);
//         postData.append("Actual_FollowUp_Date", Main_Array.Followup.Actual_FollowUp_Date);
//         postData.append("Agent_Id", Main_Array.Followup.Agent_Id);
//         postData.append("Agent_Name", Main_Array.Followup.Agent_Name);
//         postData.append("Agent_Address1", Main_Array.Followup.Agent_Address1);
//         postData.append("Center_Name", Main_Array.Followup.Center_Name);
//         postData.append("Center_Code", Main_Array.Followup.Center_Code);
//         postData.append("Agent_District_Id", Main_Array.Followup.Agent_District_Id);

//         postData.append("Status_Name", Main_Array.Followup.Status_Name);
//         postData.append("To_User_Name", Main_Array.Followup.To_User_Name);
//         postData.append("By_User_Name", Main_Array.Followup.By_User_Name);
//         postData.append("FollowUp", Main_Array.Followup.FollowUp);


        
//     }
//     var i = 0;
//     if (ImageFile_Photo != undefined) {

//         for (const img of ImageFile_Photo) {
//             postData.append("myFile", img);
//             postData.append("ImageFile_Photo", i.toString());
//             i = i + 1;
//         }
//     }
    
//     if (ImageFile_Aadhaar != undefined) {
//         for (const img of ImageFile_Aadhaar) {
//             postData.append("myFile", img);
//             postData.append("ImageFile_Aadhaar", i.toString());
//             i = i + 1;
//         }
//     }
//     postData.append("Document_File_Array", i.toString());
//     if (Document_File_Array != undefined) {

//         var j=0
//         for (const img of Document_File_Array)
//          {
//             if(Document_Array[j].New_Entry==1)
//             {
//             postData.append("myFile", img);
//             }
//             j++;
//             i = i + 1;
//         }
//     }
//     if (ImageFile != undefined) 
//     {
//         for (const img of ImageFile)
//         {
         
//            postData.append("myFile", img);
//            Document_Array.push({'New_Entry':1,'Document_Name':Document_Description
//            ,'Document_File_Name':Display_File_Name_
//         })
//            j++;
//            i = i + 1;
//        }

//     }        
//     if (Document_Array != undefined) 
//     {
//         var Document_Temp=""
//         j=0;
//         for (var i = 0; i < Document_Array.length; i++) 
//         {
//             if(Document_Array[i].New_Entry==1)
//             {
//             Document_Temp="Document_Array" + j.toString()
//             postData.append(Document_Temp, Document_Array[i].Document_Name);
//             Document_Temp="Document_File_Name" + j.toString()
//             postData.append(Document_Temp, Document_Array[i].Document_File_Name);
//             j++;
//             }
           
//         }
//     }
// return this.http.post(environment.BasePath + 'Student/Save_Student', postData);
// }


Save_Student(Main_Array, ImageFile_Photo: File[],ImageFile_Aadhaar: File[], Document_File_Array: File[],
    Document_Array: any[],Document_Description :string,ImageFile: File[],Display_File_Name_:string,
    ImageFile_Aadhaar_Back: File[],ImageFile_SSLC_Certificate: File[],ImageFile_Plustwo_Certificate: File[]) {
    const postData = new FormData();
   debugger
    if (Main_Array.Student != null) {
        
        postData.append("Student_Id_Student", Main_Array.Student.Student_Id);
        postData.append("Student_Name", Main_Array.Student.Student_Name);
        postData.append("Address1", Main_Array.Student.Address1);
        postData.append("Address2", Main_Array.Student.Address2);
        postData.append("Address3", Main_Array.Student.Address3);
        postData.append("Address4", Main_Array.Student.Address4);
        postData.append("Pincode", Main_Array.Student.Pincode);
        postData.append("Phone", Main_Array.Student.Phone);
        postData.append("Mobile", Main_Array.Student.Mobile);
        postData.append("Whatsapp", Main_Array.Student.Whatsapp);
        postData.append("DOB", Main_Array.Student.DOB);
        postData.append("Gender", Main_Array.Student.Gender);
        postData.append("Email", Main_Array.Student.Email);
        postData.append("Alternative_Email", Main_Array.Student.Alternative_Email);
        postData.append("Passport_No", Main_Array.Student.Passport_No);
        postData.append("Passport_Expiry", Main_Array.Student.Passport_Expiry);
        postData.append("User_Name", Main_Array.Student.User_Name);
        postData.append("Password", Main_Array.Student.Password);
        postData.append("Photo", Main_Array.Student.Photo);
        postData.append("User_Id", Main_Array.Student.User_Id);
        postData.append("Registration_No", Main_Array.Student.Registration_No);
        postData.append("Role_No", Main_Array.Student.Role_No);
   
       postData.append("Aadhaar", Main_Array.Student.Aadhaar);
       postData.append("Agent_Id_Student", Main_Array.Student.Agent_Id);
       postData.append("Agent_Name_Student", Main_Array.Student.Agent_Name);
       postData.append("SKP_Status_Id", Main_Array.Student.SKP_Status_Id);
       postData.append("SKP_Status_Name", Main_Array.Student.SKP_Status_Name);

       postData.append("Aadhaar_Back", Main_Array.Student.Aadhaar_Back);
       postData.append("SSLC_Certificate", Main_Array.Student.SSLC_Certificate);
       postData.append("Plustwo_Certificate", Main_Array.Student.Plustwo_Certificate);

        
    }

    if (Main_Array.Followup != null) {
        
        postData.append("Student_Followup_Id", Main_Array.Followup.Student_Followup_Id);
        postData.append("Student_Id", Main_Array.Followup.Student_Id);
        postData.append("Entry_Date", Main_Array.Followup.Entry_Date);
        postData.append("Next_FollowUp_Date", Main_Array.Followup.Next_FollowUp_Date);
        postData.append("FollowUp_Difference", Main_Array.Followup.FollowUp_Difference);
        postData.append("Status", Main_Array.Followup.Status);
        postData.append("By_User_Id", Main_Array.Followup.By_User_Id);
        postData.append("To_User_Id", Main_Array.Followup.To_User_Id);
        postData.append("Remark", Main_Array.Followup.Remark);
        postData.append("Remark_Id", Main_Array.Followup.Remark_Id);
        postData.append("FollowUp_Type", Main_Array.Followup.FollowUp_Type);
        postData.append("FollowUP_Time", Main_Array.Followup.FollowUP_Time);
        postData.append("Actual_FollowUp_Date", Main_Array.Followup.Actual_FollowUp_Date);
        // postData.append("Agent_Id", Main_Array.Followup.Agent_Id);
        // postData.append("Agent_Name", Main_Array.Followup.Agent_Name);
        postData.append("Agent_Address1", Main_Array.Followup.Agent_Address1);
        postData.append("Center_Name", Main_Array.Followup.Center_Name);
        postData.append("Center_Code", Main_Array.Followup.Center_Code);
        // postData.append("Agent_District_Id", Main_Array.Followup.Agent_District_Id);

        postData.append("Status_Name", Main_Array.Followup.Status_Name);
        postData.append("To_User_Name", Main_Array.Followup.To_User_Name);
        postData.append("By_User_Name", Main_Array.Followup.By_User_Name);
        postData.append("FollowUp", Main_Array.Followup.FollowUp);


        
    }
    var i = 0;
    if (ImageFile_Photo != undefined) {

        for (const img of ImageFile_Photo) {
            postData.append("myFile", img);
            postData.append("ImageFile_Photo", i.toString());
            i = i + 1;
        }
    }
    
    if (ImageFile_Aadhaar != undefined) {
        for (const img of ImageFile_Aadhaar) {
            postData.append("myFile", img);
            postData.append("ImageFile_Aadhaar", i.toString());
            i = i + 1;
        }
    }

debugger

    if (ImageFile_Aadhaar_Back!= undefined) {
        for (const img of ImageFile_Aadhaar_Back) {
            postData.append("myFile", img);
            postData.append("ImageFile_Aadhaar_Back", i.toString());
            i = i + 1;
        }
    }
    if (ImageFile_SSLC_Certificate != undefined) {
        for (const img of ImageFile_SSLC_Certificate) {
            postData.append("myFile", img);
            postData.append("ImageFile_SSLC_Certificate", i.toString());
            i = i + 1;
        }
    }
    if (ImageFile_Plustwo_Certificate != undefined) {
        for (const img of ImageFile_Plustwo_Certificate) {
            postData.append("myFile", img);
            postData.append("ImageFile_Plustwo_Certificate", i.toString());
            i = i + 1;
        }
    }





    postData.append("Document_File_Array", i.toString());
    if (Document_File_Array != undefined) {

        var j=0
        for (const img of Document_File_Array)
         {
            if(Document_Array[j].New_Entry==1)
            {
            postData.append("myFile", img);
            }
            j++;
            i = i + 1;
        }
    }
    if (ImageFile != undefined) 
    {
        for (const img of ImageFile)
        {
         
           postData.append("myFile", img);
           Document_Array.push({'New_Entry':1,'Document_Name':Document_Description
           ,'Document_File_Name':Display_File_Name_
        })
           j++;
           i = i + 1;
       }

    }        
    if (Document_Array != undefined) 
    {
        var Document_Temp=""
        j=0;
        for (var i = 0; i < Document_Array.length; i++) 
        {
            if(Document_Array[i].New_Entry==1)
            {
            Document_Temp="Document_Array" + j.toString()
            postData.append(Document_Temp, Document_Array[i].Document_Name);
            Document_Temp="Document_File_Name" + j.toString()
            postData.append(Document_Temp, Document_Array[i].Document_File_Name);
            j++;
            }
           
        }
    }
return this.http.post(environment.BasePath + 'Student/Save_Student', postData);
}

Search_Student(Search_FromDate, Search_ToDate,  Search_Name, By_User_, Status_Id_, Look_In_Date, 
    Page_Index1_, Page_Index2_, Login_User_Id_, RowCount_, RowCount2_,Register_Value,Agent_Name_): Observable<any> 
{   
    var Search_Data = {
    'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate, 'SearchbyName_': Search_Name,'By_User_': By_User_, 'Status_Id_': Status_Id_,
     'Is_Date_Check_': Look_In_Date,'Page_Index1_': Page_Index1_, 'Page_Index2_': Page_Index2_, 'Login_User_Id_': Login_User_Id_,
      'RowCount': RowCount_, 'RowCount2': RowCount2_,'Register_Value':Register_Value,'Agent_Name_':Agent_Name_
    }
    return this.http.get(environment.BasePath + 'Student/Search_Student/', { params: Search_Data });
}
Delete_Student(Student_Id)
{
 return this.http.get(environment.BasePath +'Student/Delete_Student/'+Student_Id);
}
Get_Student(Student_Id)
{
 return this.http.get(environment.BasePath +'Student/Get_Student/'+Student_Id);
}
Search_Status_Typeahead(Status_Name,Group_Id): Observable<any>
{
    var Search_Data = { 'Status_Name': Status_Name, 'Group_Id': Group_Id }
    return this.http.get(environment.BasePath + 'Student/Search_Status_Typeahead/', { params: Search_Data });
}
Search_Users_Typeahead(Users_Name): Observable<any>
{
    var Search_Data = { 'Users_Name': Users_Name }
    return this.http.get(environment.BasePath + 'Student/Search_Users_Typeahead/', { params: Search_Data });
}
Search_Agent_Typeahead(Agent_Name): Observable<any>
{
    var Search_Data = { 'Agent_Name': Agent_Name }
    return this.http.get(environment.BasePath + 'Agent/Search_Agent_Typeahead/', { params: Search_Data });
}
Load_Gender(): Observable<any>
{
    return this.http.get(environment.BasePath + 'Student/Load_Gender/');
}
Load_University()
{
    return this.http.get(environment.BasePath +'Course/Load_University/');
}

// Delete_Student_File(Student_Id,File_Name)
// {
//  return this.http.get(environment.BasePath +'Student/Delete_Student_File/'+Student_Id + '/' + File_Name);
// }
Delete_Student_File(Student_Id,File_Name)
{
 return this.http.get(environment.BasePath +'Student/Delete_Student_File/'+Student_Id + '/' + File_Name);}

 Delete_Student_Document(Student_Document_Id_)
{
    
 return this.http.get(environment.BasePath +'Student_Document/Delete_Student_Document/'+Student_Document_Id_);}

Load_Student_Search_Dropdowns(Group_Id)
{
    return this.http.get(environment.BasePath + 'Student/Load_Student_Search_Dropdowns/' + Group_Id);
}
Get_Last_Followup(Users_Id)
{
    return this.http.get(environment.BasePath + 'Student/Get_Last_Followup/' + Users_Id);
}
Get_FollowUp_Details(Student_Id)
{
    return this.http.get(environment.BasePath + 'Student/Get_FollowUp_Details/' + Student_Id);
}
Followup_History(Student_Id)
{
    return this.http.get(environment.BasePath + 'Student/Get_FollowUp_History/' + Student_Id);
}
Register_Student(Student_Id,User_Id)
{
    return this.http.get(environment.BasePath + 'Student/Register_Student/' + Student_Id+ '/' +User_Id);
}
Send_Register_Email(Email_)
{
    return this.http.get(environment.BasePath + 'Student/Send_Register_Email/' + Email_);
}

Send_Receipt_Email(Receipt_Details_)
{
   
    return this.http.post(environment.BasePath +'Student/Send_Receipt_Email/',Receipt_Details_);
}
Send_Course_Email(Email_)
{
    return this.http.get(environment.BasePath + 'Student/Send_Course_Email/' + Email_);
}

Remove_Registration(Student_Id)
{
    return this.http.get(environment.BasePath + 'Student/Remove_Registration/' + Student_Id);
}
Search_Course_Typeahead(Course_Name): Observable<any>
{
    var Search_Data = { 'Course_Name': Course_Name }
    return this.http.get(environment.BasePath + 'Student/Search_Course_Typeahead/', { params: Search_Data });
}
Search_Course_Typeahead_University(Course_Name,University_Id,Duration_Name_): Observable<any>
{
    
    var Search_Data = { 'Course_Name': Course_Name,'University_Id':University_Id,'Duration_Name_':Duration_Name_ }
    return this.http.get(environment.BasePath + 'Student/Search_Course_Typeahead_University/', { params: Search_Data });
}
Get_Course_Student(Course_Id,University_Id_)
{
    return this.http.get(environment.BasePath + 'Student/Get_Course_Student/' + Course_Id+'/'+University_Id_);
}
Get_Student_Course(Student_Id)
{
    return this.http.get(environment.BasePath + 'Student/Get_Student_Course/' + Student_Id);
}
Save_Student_Course(Student_Course_)
{
    return this.http.post(environment.BasePath +'Student/Save_Student_Course/',Student_Course_);
}
Update_Certificate_Date(Student_Course_)
{
    return this.http.post(environment.BasePath +'Student/Update_Certificate_Date/',Student_Course_);
}
Search_Subject_Course_Typeahead(Subject_Name,Course_Id): Observable<any>
{
    var Search_Data = { 'Subject_Name': Subject_Name, 'Course_Id': Course_Id }
    return this.http.get(environment.BasePath + 'Student/Search_Subject_Course_Typeahead/', { params: Search_Data });
}
Search_Part_Subject_Typeahead(Student_Id_,Course_Id_,Part_Id_,Subject_Name_): Observable<any>
{
    var Search_Data = { 'Part_Id_': Part_Id_ ,'Subject_Name_': Subject_Name_,'Student_Id_': Student_Id_,'Course_Id_': Course_Id_}
    return this.http.get(environment.BasePath + 'Student/Search_Part_Subject_Typeahead/', { params: Search_Data });
}
Load_Exam_Status()
{
    return this.http.get(environment.BasePath + 'Student/Load_Exam_Status/');
}
Load_Part()
{
    return this.http.get(environment.BasePath + 'Student/Load_Part/');
}
Save_Mark_List_Master(Mark_List_)
{
    return this.http.post(environment.BasePath +'Student/Save_Mark_List_Master/',Mark_List_);
}
Get_Student_Mark_List(Student_Id,Part_Id)
{
    return this.http.get(environment.BasePath + 'Student/Get_Student_Mark_List/' + Student_Id+'/'+Part_Id);
}
Load_Mode(): Observable<any> 
{
    return this.http.get(environment.BasePath + 'Agent/Load_Mode/');
}
Accounts_Typeahead(Account_Group_Id_,Client_Accounts_Name_): Observable<any> 
{
    var Search_Data = { 'Account_Group_Id_': Account_Group_Id_, 'Client_Accounts_Name_': Client_Accounts_Name_ }
    return this.http.get(environment.BasePath + 'Agent/Accounts_Typeahead/', { params: Search_Data });
}
Save_Student_Receipt_Voucher(Receipt_Voucher_)
{
   return this.http.post(environment.BasePath +'Student/Save_Student_Receipt_Voucher/',Receipt_Voucher_);
}
Get_Student_Receipt_History(Student_Id)
{
       return this.http.get(environment.BasePath + 'Student/Get_Student_Receipt_History/' + Student_Id);
}
Delete_Receipt_Voucher(Receipt_Voucher_Id)
{
 return this.http.get(environment.BasePath +'Student/Delete_Student_Receipt_Voucher/'+Receipt_Voucher_Id);
}


Get_Activities_Details_History(Student_Id)
{
    return this.http.get(environment.BasePath + 'Student/Get_Activities_Details_History/' + Student_Id);
}

Search_Activity_Report(Search_FromDate, Search_ToDate,Search_Name,Agent_Id,Look_In_Date,  Login_User_Id_): Observable<any> 
{   
    var Search_Data = { 'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate, 'SearchbyName_': Search_Name,'Agent_Id': Agent_Id,
    'Is_Date_Check_': Look_In_Date, 'Login_User_Id_': Login_User_Id_, }
    return this.http.get(environment.BasePath + 'Student/Search_Activity_Report/', { params: Search_Data });
}
Load_Month_Status()
{
    return this.http.get(environment.BasePath + 'Student/Load_Month_Status/');
}
Load_Month_Status_for_Part(University_Id_)
{
    return this.http.get(environment.BasePath + 'Student/Load_Month_Status_for_Part/'+University_Id_);
}
Delete_Student_Mark_Details(Mark_List_Master_Id_)
{
    
 return this.http.get(environment.BasePath +'Student/Delete_Student_Mark_Details/'+Mark_List_Master_Id_);
}
Get_University_Changes(University_Id_)
{    
 return this.http.get(environment.BasePath +'Student/Get_University_Changes/'+University_Id_);
}
Get_Year_Changes(Course_Id_,Year_,Fees_Type_Id_)
{
return this.http.get(environment.BasePath +'Student/Get_Year_Changes/'+Course_Id_+'/'+Year_+'/'+Fees_Type_Id_);
}
Load_Student_Part(Student_Id_)
{    
    return this.http.get(environment.BasePath +'Student/Load_Student_Part/'+Student_Id_);
}
Get_Course_Part_Mark(Student_Id_,Course_Id_,Part_Id_)
{    
    return this.http.get(environment.BasePath +'Student/Get_Course_Part_Mark/'+Student_Id_ +'/'+Course_Id_+'/'+Part_Id_);
}
Save_Company(Company_:Company,image: File[]) {
    const postData = new FormData();
    postData.append("Company_Id", Company_.Company_Id.toString());
    postData.append("companyname", Company_.companyname);
    postData.append("Phone1", Company_.Phone1);
    postData.append("Phone2", Company_.Phone2);
    postData.append("Mobile", Company_.Mobile);
    postData.append("Email", Company_.Email);
    postData.append("Website", Company_.Website);
    postData.append("Address1", Company_.Address1);
    postData.append("Address2", Company_.Address2);
    postData.append("Address3", Company_.Address3);
    postData.append("Logo", Company_.Logo);

    ;
    if (image != undefined) {
        for (const img of image) {
            postData.append("myFile", img);
        }
    }

    return this.http.post(environment.BasePath + 'Student/Save_Company', postData);
}
Get_Company() {
    return this.http.get(environment.BasePath + 'Student/Get_Company/');
}
Get_Grade(Student_Id_) {
    return this.http.get(environment.BasePath + 'Student/Get_Grade/'+Student_Id_);
}

Get_Activity_Details(Student_Id_)
{ 
    
    return this.http.get(environment.BasePath + 'Student/Get_Activity_Details/' + Student_Id_);
}
Load_User_Agent_Details(User_Agent_)
{
    return this.http.get(environment.BasePath + 'Student/Load_User_Agent_Details/'+User_Agent_);
}

Search_Student_Payment(Search_FromDate, Search_ToDate,Search_Name,Look_In_Date,  Login_User_Id_): Observable<any> 
{   
    var Search_Data = { 'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate, 'SearchbyName_': Search_Name,
    'Is_Date_Check_': Look_In_Date, 'Login_User_Id_': Login_User_Id_, }
    return this.http.get(environment.BasePath + 'Student/Search_Student_Payment/', { params: Search_Data });
}

Verify_Student_Payment(Student_Verified_Details_)
{
    
return this.http.post(environment.BasePath +'Student/Verify_Student_Payment/',Student_Verified_Details_);
}
Update_Skp_Status(): Observable<any> 
{
    return this.http.get(environment.BasePath + 'Agent/Update_Skp_Status/');
}


}

