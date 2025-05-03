/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { GetInfoService } from '../../services/get-info.service';
@Component({
  selector: 'app-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  constructor(private useBack: GetInfoService, private router: Router, private auth: AuthService) {
    this.auth.getUser().subscribe((user: any) => {
      this.eventOrganizerId = user.id;
    });
  }

  public categories: any[] = [];
  public eventName: string = '';
  public eventOrganizerId: string = '';
  public eventCategoryId: string = '';
  public eventImage: string = '';
  public eventDescription: string = '';
  public eventDate: string = '';
  public eventTimeStart: string = '';
  public eventTimeEnd: string = '';
  public eventLocation: string = '';
  public eventPrice: number = 0;
  public eventCapacity: number = 0;
  public freeEvent: boolean = false;

  public eventImagePreview: string | ArrayBuffer | null = null;

  @Input() useFunction: string = '';

  protected readonly form = inject(FormBuilder).group({
    eventName: ['', Validators.required],
    eventCategoryId: ['', Validators.required],
    eventCapacity: ['', Validators.required],
    eventDescription: ['', Validators.required],
    eventDate: ['', Validators.required],
    eventTimeEnd: ['', Validators.required],
    eventTimeStart: ['', Validators.required],
    eventLocation: ['', Validators.required],
    eventPrice: [0, Validators.required]
  });

  ngOnInit(): void {
    this.useBack.getCategories().subscribe((data: any) => {
      this.categories = data;
      console.log(this.categories);
    });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        this.eventImage = reader.result as string;
        this.eventImagePreview = reader.result; // para mostrarla en vista previa
      };
      reader.readAsDataURL(file); // convierte la imagen a base64
    }
  }
  selectFunction(functionName: string) {
    if (functionName === 'createEvent') {
      this.createEvent();
    }
  }
  onCheckboxChange() {
    this.freeEvent = !this.freeEvent;
    const control = this.form.get('eventPrice');
    if (this.freeEvent) {
      control?.setValue(0);
    }

    control?.updateValueAndValidity();
  }

  createEvent() {
    const event = {
      name: this.form.value.eventName,
      organizer_id: this.eventOrganizerId,
      category_id: this.form.value.eventCategoryId,
      image: this.eventImage,
      description: this.form.value.eventDescription,
      date: this.form.value.eventDate,
      start_date: this.form.value.eventTimeStart,
      end_date: this.form.value.eventTimeEnd,
      location: this.form.value.eventLocation,
      price: this.form.value.eventPrice,
      capacity: this.form.value.eventCapacity
    };

    this.useBack.createEvent(event).subscribe((response: any) => {
      console.log('Evento creado:', response);
      this.router.navigate(['/home']);
    });
  }
  /*
  updateBook() {
    const book = {
      name: this.bookName,
      author: this.bookAuthor,
      description: this.bookDescription,
      image: this.bookImage,
      price: this.bookPrice,
      pages: this.bookPages
    };
  }
	*/
}
