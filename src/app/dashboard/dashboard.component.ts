import { Component } from '@angular/core';
import { TimeService } from '../core/services/time.service';
import { Time } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  showFiller = false;

  horaActual$: Observable<string>;

  constructor(private timeService:TimeService) {
    this.horaActual$ = this.timeService.reloj
  }
}