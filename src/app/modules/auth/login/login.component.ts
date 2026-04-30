import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from '../../../helpers/custom-validators';
import { UserData } from '../../../services/user-data';
import { Route, Router } from '@angular/router';
import { MatSpinner } from '@angular/material';
import { ROUTES,Get_Page_Permission,Set_Page_Permission } from '../../../components/sidebar/sidebar.component'
import { DialogBox_Component } from '../../../modules/admin/DialogBox/DialogBox.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material';
import { Menu_Service } from '../../../services/Menu.service';
export var Pointer_Table: number[] = [
]
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  Login_Id:string;
 // menuItems: any[];
 color = 'primary';
 mode = 'indeterminate';
 value = 50;
 issLoading: boolean;
 Notification_count:number;
  Pointer_Table=new Array(60);    
  constructor(
    public fb: FormBuilder, public Menu_Service_: Menu_Service, public userService: UserData, public router: Router,public dialogBox: MatDialog
  ) {
    this.initForm();
  }
  initForm() {
    this.loginForm = this.fb.group({
      userName: ['', CustomValidators.compose([CustomValidators.required])],
      password: ['', CustomValidators.compose([Validators.required])]
    })
     
  }
  async login() {
    if (this.loginForm.valid) {
      this.issLoading = true;
      ;
      const success = await this.userService.login(this.loginForm.value);
      ;
      if (success) 
      {
        ;
        this.issLoading = false;
       // this.router.navigateByUrl('HomePage');
        this.Login_Id=localStorage.getItem('Login_User');
        ROUTES.length = 0;
 
        Pointer_Table=new Array(60);  
        for(var i=0;i<Pointer_Table.length;i++)
        Pointer_Table[i]=-1;
        this.Menu_Service_.Get_Menu_Permission(this.Login_Id).subscribe( Rows => 
          {
            ;
        //   console.log(Rows)
            if(Rows!=null)
              {
                var Menus;
                Menus=Rows[0];               
                Rows=[];
    for(var i=0;i<Menus.length;i++)
    {
      if(Menus[i].Menu_Id==1)
      this.Push_Menu({ path: '/Users', title: 'Users', icon: 'unarchive', class: '',Menu_Id:Menus[i].Menu_Id,'View':Menus[i].VIew_All, Save:Menus[i].Menu_Save ,Edit:Menus[i].Menu_Edit,Delete:Menus[i].Menu_Delete,Menu_Type:Menus[i].Menu_Type});
      else if (Menus[i].Menu_Id == 2)
        this.Push_Menu({ path: '/Category', title: 'Category', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 3)
        this.Push_Menu({ path: '/Course_Type', title: 'Course Type', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 4)
        this.Push_Menu({ path: '/Fees_Type', title: 'Fees Type', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 5)
        this.Push_Menu({ path: '/Subject', title: 'Subject', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 6)
        this.Push_Menu({ path: '/Part', title: 'Year/Semester', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 7)
        this.Push_Menu({ path: '/User_Type', title: 'User Type', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 8)
        this.Push_Menu({ path: '/User_Role', title: 'User Role', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 9)
        this.Push_Menu({ path: '/Status', title: 'Status', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 10)
        this.Push_Menu({ path: '/Qualification', title: 'Qualification', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 11)
        this.Push_Menu({ path: '/Specialization', title: 'Specialization', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 12)
        this.Push_Menu({ path: '/Course', title: 'Course', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 13)
        this.Push_Menu({ path: '/University', title: 'University', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 14)
        this.Push_Menu({ path: '/Student', title: 'Students', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 15)
        this.Push_Menu({ path: '/Functionl_Area', title: 'Functional Area', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 16)
        this.Push_Menu({ path: '/Experience', title: 'Experience', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 17)
        this.Push_Menu({ path: '/Registration', title: 'Registration', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 18)
        this.Push_Menu({ path: '/Remove_Registration', title: 'Remove Registration', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 19)
        this.Push_Menu({ path: '/Course_Tab', title: 'Course Tab', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 20)
        this.Push_Menu({ path: '/Fees_tab', title: 'Fees Tab', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 21)
        this.Push_Menu({ path: '/Mark_tab', title: 'Mark Tab', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 22)
      this.Push_Menu({ path: '/Question_Import', title: 'Question Import', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 23)
        this.Push_Menu({ path: '/Agent', title: 'SKP', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 24)
        this.Push_Menu({ path: '/Agent_Registration', title: 'Agent Registration', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 25)
        this.Push_Menu({ path: '/Agent_Remove_Registration', title: 'Agent Remove Registration', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 26)
        this.Push_Menu({ path: '/Fees_Receipt_Tab', title: 'Fees Receipt Tab ', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 27)
        this.Push_Menu({ path: '/Candidate', title: 'Candidates', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 28)
        this.Push_Menu({ path: '/Candidate_Registration', title: 'Candidate Registration', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 29)
        this.Push_Menu({ path: '/Candidate_Remove_Registration', title: 'Candidate Remove Registration', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 30)
        this.Push_Menu({ path: '/Job_Posting', title: 'Job Posting', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 31)
        this.Push_Menu({ path: '/Applied_Candidate', title: 'Applied Candidate', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 35)
        this.Push_Menu({ path: '/Activity_tab', title: 'Activity Tab', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 36)
        this.Push_Menu({ path: '/Activity_Report', title: 'Activity Report', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 37)
        this.Push_Menu({ path: '/Activity', title: 'Activity', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });     
        else if (Menus[i].Menu_Id == 38)
        this.Push_Menu({ path: '/Account_Voucher', title: 'Receipt Voucher', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });     
        else if (Menus[i].Menu_Id == 39)
        this.Push_Menu({ path: '/Ledger', title: 'Ledger', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });     
        else if (Menus[i].Menu_Id == 40)
        this.Push_Menu({ path: '/Payment_Voucher', title: 'Payment Voucher', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });  
        else if (Menus[i].Menu_Id == 41)
        this.Push_Menu({ path: '/Old_Student_Registration', title: 'Old Student', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });     
        else if (Menus[i].Menu_Id == 42)
        this.Push_Menu({ path: '/Subscription', title: 'Subscription', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });     
        else if (Menus[i].Menu_Id == 43)
          this.Push_Menu({ path: '/Student_Payment', title: 'Student Payment', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });     
                
      } 
localStorage.setItem("Routes_Temp",JSON.stringify(ROUTES));
localStorage.setItem("Pointer_Temp",JSON.stringify(Pointer_Table));
this.router.navigateByUrl('Home_Page');
  }
},
Rows => { 
     
});
  }
 else
  {
    this.issLoading = false;
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Inavlid User Name/Password', Type:"3"}});
  }
}
}
  Push_Menu(Menu_Data)
  {
    ROUTES.push(Menu_Data);
    Pointer_Table[Menu_Data.Menu_Id-1] = ROUTES.length-1;
  }
  ngOnInit() {
  }
}
