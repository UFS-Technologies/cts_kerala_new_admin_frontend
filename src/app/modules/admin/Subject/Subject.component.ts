import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject_Service } from "../../../services/Subject.Service";
import { DialogBox_Component } from "../DialogBox/DialogBox.component";
import { Subject } from "../../../models/Subject";
import { MatDialog } from "@angular/material";
import {
  ROUTES,
  Get_Page_Permission,
} from "../../../components/sidebar/sidebar.component";
@Component({
  selector: "app-Subject",
  templateUrl: "./Subject.component.html",
  styleUrls: ["./Subject.component.css"],
})
export class SubjectComponent implements OnInit {
  Subject_Data: Subject[];
  Pending_Subjects: Subject[];
  Subject_: Subject = new Subject();
  Subject_Name_Search: string;
  Entry_View: boolean = true;
  EditIndex: number;
  Total_Entries: number;
  color = "primary";
  mode = "indeterminate";
  value = 50;
  issLoading: boolean;
  Permissions: any;
  Subject_Edit: boolean;
  Subject_Save: boolean;
  Subject_Delete: boolean;
  myInnerHeight: number;
  myTotalHeight: number;

  Login_User_Id: number = 0;
  constructor(
    public Subject_Service_: Subject_Service,
    private route: ActivatedRoute,
    private router: Router,
    public dialogBox: MatDialog
  ) {}
  ngOnInit() {
    this.Login_User_Id = Number(localStorage.getItem("Login_User"));
    this.Permissions = Get_Page_Permission(5);
    if (this.Permissions == undefined || this.Permissions == null) {
      localStorage.removeItem("token");
      this.router.navigateByUrl("/auth/login");
    } else {
      this.Subject_Edit = this.Permissions.Edit;
      this.Subject_Save = this.Permissions.Save;
      this.Subject_Delete = this.Permissions.Delete;
      this.Page_Load();
    }
  }
  Page_Load() {
    this.myInnerHeight = window.innerHeight;
    this.myTotalHeight = this.myInnerHeight;
    this.myTotalHeight = this.myTotalHeight - 90;
    this.myInnerHeight = this.myInnerHeight - 350;

    this.Clr_Subject();
    this.Search_Subject();
    this.Entry_View = false;
  }
  Create_New() {
    this.Entry_View = true;
    this.Clr_Subject();
  }
  Close_Click() {
    this.Search_Subject();
    this.Clr_Subject();
    this.Entry_View = false;
  }
  trackByFn(index, item) {
    return index;
  }

  Clr_Subject() {
    this.Subject_.Subject_Id = 0;
    this.Subject_.Subject_Name = "";
    this.Subject_.Exam_status = 0;
    this.Subject_.User_Id = 0;
  }
  onSubjectTabChange(index: number): void {
    if (index === 0) {
      this.Search_Subject();
    } else if (index === 1) {
      this.loadPendingSubjects();
    }
  }

  Search_Subject() {
    this.issLoading = true;
    this.Subject_Service_.Search_Subject(this.Subject_Name_Search).subscribe(
      (Rows) => {
        this.Subject_Data = Rows[0];
        this.Total_Entries = this.Subject_Data.length;
        if (this.Subject_Data.length == 0) {
          const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: { Message: "No Details Found", Type: "3" },
          });
          this.issLoading = false;
        }
        this.issLoading = false;
      },
      (Rows) => {
        this.issLoading = false;
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
          panelClass: "Dialogbox-Class",
          data: { Message: "Error Occured", Type: "2" },
        });
      }
    );
  }
  loadPendingSubjects() {
    this.issLoading = true;
    this.Subject_Service_.Search_Pending_Subject(
      this.Subject_Name_Search
    ).subscribe(
      (Rows) => {
        this.Pending_Subjects = Rows[0];
        this.Total_Entries = this.Pending_Subjects.length;
        if (this.Pending_Subjects.length == 0) {
          const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: { Message: "No Details Found", Type: "3" },
          });
          this.issLoading = false;
        }
        this.issLoading = false;
      },
      (Rows) => {
        this.issLoading = false;
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
          panelClass: "Dialogbox-Class",
          data: { Message: "Error Occured", Type: "2" },
        });
      }
    );
  }
  Delete_Subject(Subject_Id, index, Request_Status: number) {
    const dialogRef = this.dialogBox.open(DialogBox_Component, {
      panelClass: "Dialogbox-Class",
      data: {
        Message: "Do you want to delete ?",
        Type: true,
        Heading: "Confirm",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "Yes") {
        this.issLoading = true;
        this.Subject_Service_.Delete_Subject(
          Subject_Id,
          Request_Status
        ).subscribe(
          (Delete_status) => {
            Delete_status = Delete_status[0];
            Delete_status = Delete_status[0].DeleteStatus_.data[0];
            if (Delete_status == 1) {
              this.Subject_Data.splice(index, 1);
              console.log("this.Request_Status", Request_Status);
              const dialogRef = this.dialogBox.open(DialogBox_Component, {
                panelClass: "Dialogbox-Class",
                data: { Message: "Deleted", Type: "false" },
              });
              if (Request_Status == 0) {
                this.Search_Subject();
              } else {
                this.loadPendingSubjects();
              }
            } else {
              this.issLoading = false;
              const dialogRef = this.dialogBox.open(DialogBox_Component, {
                panelClass: "Dialogbox-Class",
                data: { Message: "Error Occured", Type: "2" },
              });
            }
            this.issLoading = false;
          },
          (Rows) => {
            this.issLoading = false;
            const dialogRef = this.dialogBox.open(DialogBox_Component, {
              panelClass: "Dialogbox-Class",
              data: { Message: "Error Occured", Type: "2" },
            });
          }
        );
      }
    });
  }
  Accept_Subject(Subject_Id: number, index: number, Request_Status: number) {
  const dialogRef = this.dialogBox.open(DialogBox_Component, {
    panelClass: 'Dialogbox-Class',
    data: { Message: 'Do you want to Accept ?', Type: true, Heading: 'Confirm' }
  });

  dialogRef.afterClosed().subscribe(result => {

    this.issLoading = true;
    this.Subject_.Subject_Id = Subject_Id;
    this.Subject_.User_Id = this.Login_User_Id;
    this.Subject_.Request_Status = 0;
    this.Subject_Service_.Accept_Subject(this.Subject_).subscribe(
      (Save_status : boolean) => {
        if (Save_status) {
          const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: { Message: "Accepted", Type: "false" },
          });
          this.loadPendingSubjects();
          this.Close_Click();
        } else {
          const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: { Message: "Error Occured", Type: "2" },
          });
        }
        this.issLoading = false;
      },
      (Rows) => {
        this.issLoading = false;
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
          panelClass: "Dialogbox-Class",
          data: { Message: Rows.error.error, Type: "2" },
        });
      }
    );
});
}
  Save_Subject() {
    if (
      this.Subject_.Subject_Name === undefined ||
      this.Subject_.Subject_Name == null ||
      this.Subject_.Subject_Name == ""
    ) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "Enter Subject ", Type: "3" },
      });
      return;
    }
    this.issLoading = true;
    this.Subject_.User_Id = this.Login_User_Id;
    this.Subject_.Request_Status = 0;
    this.Subject_Service_.Save_Subject(this.Subject_).subscribe(
      (Save_status) => {
        Save_status = Save_status[0];
        if (Number(Save_status[0].Subject_Id_) > 0) {
          const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: { Message: "Saved", Type: "false" },
          });
          this.Close_Click();
        } else {
          const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: { Message: "Error Occured", Type: "2" },
          });
        }
        this.issLoading = false;
      },
      (Rows) => {
        this.issLoading = false;
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
          panelClass: "Dialogbox-Class",
          data: { Message: Rows.error.error, Type: "2" },
        });
      }
    );
  }
  Edit_Subject(Subject_e: Subject, index) {
    this.Entry_View = true;
    this.Subject_ = Subject_e;
    this.Subject_ = Object.assign({}, Subject_e);
  }
}
