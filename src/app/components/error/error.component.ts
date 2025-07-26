import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error',
  imports: [CommonModule, FormsModule],
  templateUrl: './error.component.html',
  standalone: true
})
export class ErrorComponent {
  @Input() errorMessage: string = '';
}
