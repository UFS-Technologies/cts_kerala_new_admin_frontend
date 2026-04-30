import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})

export class DialogBoxComponent implements OnInit {

  message: any;
  showNo: boolean;
  Heading: string;
  NoButton: String;
  YesButton: String;
  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.message = data.Message;
    this.showNo = data.Type;
    if (this.showNo === false) {
      this.NoButton = 'No';
      this.YesButton = 'OK';
    } else {
      this.NoButton = 'No';
      this.YesButton = 'Yes';
    }
    this.Heading = data.Heading;
    if (!this.Heading) {
      this.Heading = 'ADAT';
    }
  }
  onNoClick(): void {
    this.dialogRef.close('No');
  }
  onYesClick(): void {
    this.dialogRef.close('Yes');
  }
  ngOnInit() {
  }
}
