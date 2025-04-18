import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  public role_selected: string = 'standart';
  public name: string = '';
  public email: string = '';
  public password: string = '';
  public confirmation_password: string = '';
  public phone: string | null = '';
  public address: string | null = '';

  constructor(private authService: AuthService) {}

  register() {
    // Logic to handle user registration
    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
      phone: this.phone,
      address: this.address,
      role: this.role_selected
    };

    this.authService.register(user).subscribe({
      next: (res) => {
        console.log('Usuario registrado:', res);
        // aquí puedes guardar token o redirigir si quieres
      },
      error: (error) => {
        console.error('Error al registrar:', error);
      },
      complete: () => {
        console.log('Petición completada.');
      }
    });
  }

  changeRoleSelected(role: string) {
    this.role_selected = role;
  }
  getRoleSelected() {
    return this.role_selected;
  }
}
