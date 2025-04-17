import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  public role_selected: string = 'standart';

  register() {
    // Logic to handle user registration
    console.log('User registered successfully!');
  }
  changeRoleSelected(role: string) {
    this.role_selected = role;
  }
  getRoleSelected() {
    return this.role_selected;
  }
}
