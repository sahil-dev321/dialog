import { Component } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpClientModule,
} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-strategy',
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './create-strategy.component.html',
  styleUrl: './create-strategy.component.scss',
})
export class CreateStrategyComponent {
  strategyName: string = '';
  strategyDescription: string = '';
  showModal: boolean = true; // This will control the modal visibility

  constructor(
    private http: HttpClient,
    private dialogRef: MatDialogRef<CreateStrategyComponent>
  ) {}

  saveAndAssign() {
    const apiUrl = `${environment.apiUrl}/strategy/`;

    const token = `${environment.authToken}`; // Use a valid JWT token

    const headers = new HttpHeaders({
      Authorization: `${token}`,
      'Content-Type': 'application/json',
    });

    const payload = {
      name: this.strategyName,
      description: this.strategyDescription,
    };

    this.http.post(apiUrl, payload, { headers }).subscribe(
      (response) => {
        console.log('Strategy created successfully', response);
        this.closeDialog;
      },
      (error) => {
        console.error('Error creating strategy', error);
      }
    );
  }
  closeDialog(result?: string): void {
    this.dialogRef.close(result); // Pass 'leave' or 'cancel'
  }
}
