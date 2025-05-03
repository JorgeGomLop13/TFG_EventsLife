import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormComponent } from '../form/form.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-create-event',
  imports: [HeaderComponent, CommonModule, FormsModule, FormComponent],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.scss'
})
export class CreateEventComponent {
  public useFunction: string = 'createEvent';
  constructor() {}
}
