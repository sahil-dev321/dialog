import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { SuccessComponent } from '../frames/success/success.component';
import { LeaveComponent } from '../frames/leave/leave.component';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog.component.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    SuccessComponent,
    LeaveComponent,
  ],
})
export class DialogOverviewExampleDialog {
  readonly dialogRef = inject(MatDialogRef<DialogOverviewExampleDialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly animal = model(this.data.animal);

  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  onNoClick(): void {
    this.dialogRef.close();
  }
  constructor(private dialog: MatDialog) {}

  openSuccessDialog() {
    this.dialog.open(SuccessComponent, {
      width: '600px',
      height: '600px',
      data: { message: 'Create your new portfolio here!' },
    });
  }

  openLeaveDialog() {
    this.dialog.open(LeaveComponent, {
      width: '600px',
      height: '600px',
    });
  }
}
