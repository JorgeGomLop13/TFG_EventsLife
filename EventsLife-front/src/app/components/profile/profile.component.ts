import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { GetInfoService } from '../../services/get-info.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-profile',
  imports: [HeaderComponent, CommonModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  public userName: string = '';
  public userId: string = '';
  public userEmail: string = '';
  public userPhone: string = '';
  public userRole: string = '';
  isLoading: boolean = true;

  public userEvents: any[] = [];

  constructor(private useData: GetInfoService, private auth: AuthService) {}
  ngOnInit() {
    this.auth
      .getUser()
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.userName = res.name;
          this.userId = res.id;
          this.userEmail = res.email;
          this.userPhone = res.phone;
          this.userRole = res.role;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error al obtener la información del usuario:', error);
          this.isLoading = false;
        },
        complete: () => {
          console.log('Información del usuario obtenida');
          this.useData
            .getEventByOrganizer(this.userId)
            .pipe(take(1))
            .subscribe({
              next: (res) => {
                this.userEvents = res;
                console.log(res);
              }
            });
        }
      });
  }

  deleteEvent(id: string) {
    this.useData.deleteEvent(id).subscribe(() => {});
    this.userEvents = this.userEvents.filter((event) => event.id !== id);
  }

  logout() {
    this.auth.logout();
  }
}
