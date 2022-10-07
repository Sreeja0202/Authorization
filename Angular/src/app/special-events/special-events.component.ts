import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { EventService } from '../event.service';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css'],
})
export class SpecialEventsComponent implements OnInit {
  specialEvents: any;
  constructor(
    private eventservice: EventService,
    public authservice: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventservice.getSpecialEvents().subscribe(
      (res) => (this.specialEvents = res),
      (err) => console.log(err)
    );
  }
  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/events']);
  }
}
