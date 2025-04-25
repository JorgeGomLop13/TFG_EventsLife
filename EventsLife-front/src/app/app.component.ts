import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GetInfoService } from './services/get-info.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'EventsLife-front';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  users: any[] = [];
  constructor(private infoGeneral: GetInfoService) {}

  ngOnInit(): void {
    this.infoGeneral.getUsers().subscribe((data) => {
      this.users = data;
      console.log(this.users);
    });
  }
}
