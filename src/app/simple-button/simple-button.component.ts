import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FramesComponent } from '../frames/frames.component';
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
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogOverviewExampleDialog } from '../dialog/dialog.component';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-simple-button',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './simple-button.component.html',
  styleUrl: './simple-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleButtonComponent {
  // constructor(private dialog: MatDialog) {}
  // openFrame() {
  //   this.dialog.open(FramesComponent, {});
  // }

  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(
      DialogOverviewExampleDialog,

      {
        width: '60vw',
        maxWidth: '100vw',
        height: '85vh',
        maxHeight: '100vh',
        data: { name: this.name(), animal: this.animal() },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.animal.set(result);
      }
    });
  }
}
