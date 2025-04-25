import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  public token: string | null = localStorage.getItem('token');
  public userName: string | null = '';
  public userRole: string | null = '';
  public user: any = null;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    if (this.token) {
      this.auth.getUser().subscribe({
        next: (user) => {
          console.log('Usuario:', user);
          this.userName = user.name;
          this.userRole = user.role;
        },
        error: (err) => {
          console.error('Error al obtener usuario', err);
        }
      });
    }
  }
}
