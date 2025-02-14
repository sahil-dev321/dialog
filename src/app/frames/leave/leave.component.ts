import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-leave',
  imports: [],
  templateUrl: './leave.component.html',
  styleUrl: './leave.component.scss',
})
export class LeaveComponent {
  constructor(public dialogRef: MatDialogRef<LeaveComponent>) {}

  closeDialog(): void {
    this.dialogRef.close(); // Close the modal
  }
}
