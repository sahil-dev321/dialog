import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
  FormControl,
} from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { LeaveComponent } from '../frames/leave/leave.component';
import { CreateStrategyComponent } from '../frames/create-strategy/create-strategy.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    HttpClientModule,
    FormsModule,
  ],
})
export class DialogOverviewExampleDialog implements OnInit {
  @ViewChild('stepper') stepper!: any;
  selectedStrategy: string | number = '';
  strategies: any[] = [];
  scripts: any[] = [];
  filteredScripts: any[] = [];
  isLinear = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  scriptSearchControl = new FormControl('');
  @Output() modalClosed = new EventEmitter<void>();
  isModalVisible: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  // Function to close the modal (by emitting an event)
  closeModal() {
    this.modalClosed.emit(); // Emit the event to notify the parent
  }

  ngOnInit() {
    this.fetchStrategies();
    this.fetchScripts();

    this.firstFormGroup = this._formBuilder.group({
      portfolioName: ['', Validators.required],
      portfolioDescription: ['', Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({
      strategy: [''],
    });

    this.thirdFormGroup = this._formBuilder.group({
      script: ['', Validators.required], // Ensure it's an empty string initially

      portfolioPercentage: ['25%'],
      status: ['inactive'],
    });

    // Subscribe to changes in the search field to filter results dynamically
    this.scriptSearchControl.valueChanges.subscribe(() => {
      this.filterScripts();
    });
  }

  onStrategyChange(event: any) {
    if (event.value === 'createStrategy') {
      // You can open a dialog or perform some action when this option is selected
      const dialogRef = this.dialog.open(CreateStrategyComponent, {
        width: '300px', // Adjust the width as needed
        data: { message: 'Are you sure you want to leave without saving?' },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result === 'leave') {
          // Handle leave action, like navigating or closing
          console.log('User decided to leave');
        } else {
          // Handle cancel action
          console.log('User canceled the leave');
        }
      });
    }
  }

  filterScripts() {
    const searchValue = this.scriptSearchControl.value
      ? this.scriptSearchControl.value.toLowerCase()
      : '';

    if (!this.scripts) {
      this.filteredScripts = []; // Ensure no null reference error
      return;
    }

    this.filteredScripts = this.scripts.filter((script) =>
      script.script_name.toLowerCase().includes(searchValue)
    );
  }

  fetchScripts() {
    this.http
      .get<any[]>(`${environment.apiUrl}/script`, {
        headers: { Authorization: environment.authToken },
      })
      .subscribe(
        (data) => {
          this.scripts = data; // Store scripts in the component
          console.log(data);
        },
        (error) => {
          console.error('Error fetching scripts:', error);
        }
      );
  }

  fetchStrategies() {
    this.http
      .get<any[]>(`${environment.apiUrl}/strategy/`, {
        headers: { Authorization: environment.authToken },
      })
      .subscribe(
        (data) => {
          this.strategies = data;
        },
        (error) => {
          console.error('Error fetching strategies:', error);
        }
      );
  }

  printFormValues() {
    const formValues = {
      portfolioDetails: this.firstFormGroup.value,
      strategy: this.secondFormGroup.value,
      portfolioDetailsTable: this.thirdFormGroup.value,
    };

    console.log('Form Values:', formValues);

    // If you want to display it on the UI
    alert(JSON.stringify(formValues, null, 2));
  }

  createModelPortfolio() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: environment.authToken, // Use token from environment
    });

    const requestBody = {
      name: this.firstFormGroup.value.portfolioName,
      description: this.firstFormGroup.value.portfolioDescription,
      strategy: 1,
      status: this.thirdFormGroup.value.status,
      scripts: [
        {
          script: 1,
          model_portfolio: null,
          suggested_alloc_percent:
            this.thirdFormGroup.value.portfolioPercentage.replace('%', ''),
        },
      ],
    };

    this.http
      .post(`${environment.apiUrl}/model-portfolio`, requestBody, { headers })
      .subscribe(
        (response) => {
          console.log('Portfolio created successfully:', response);
          alert('Portfolio created successfully!');
        },
        (error) => {
          console.error('Error creating portfolio:', error);
          alert('Failed to create portfolio. Check the console for details.');
        }
      );
  }

  openLeaveDialog() {
    const dialogRef = this.dialog.open(LeaveComponent, {
      width: '300px', // Adjust the width as needed
      data: { message: 'Are you sure you want to leave without saving?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'leave') {
        // Handle leave action, like navigating or closing
        console.log('User decided to leave');
      } else {
        // Handle cancel action
        console.log('User canceled the leave');
      }
    });
  }

  // closeLeaveDialog() {
  //   if (this.leaveDialogRef) {
  //     this.leaveDialogRef.close(); // Close the dialog if it's open
  //   }
  // }
  openModal() {
    this.isModalVisible = true;
  }

  // Function to close the modal

  openSuccessDialog() {}
}
