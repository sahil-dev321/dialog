import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SimpleButtonComponent } from './simple-button/simple-button.component';

@Component({
  selector: 'app-root',
  imports: [SimpleButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'dialog';
}
