import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterLink],
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
  public terms_conditions: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

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
        localStorage.setItem('token', res.token);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Error al registrar:', error);
      },
      complete: () => {
        console.log('Petición completada.');
      }
    });
    console.log(this.terms_conditions);
  }

  changeRoleSelected(role: string) {
    this.role_selected = role;
  }
  getRoleSelected() {
    return this.role_selected;
  }
}
