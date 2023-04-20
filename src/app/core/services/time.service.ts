import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

export interface Time {
  hours: number;
  minutes: number;
  seconds: number;
}

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  private _reloj$ = new BehaviorSubject<Time>(this.currentTime);

  get reloj(): Observable<string> {
    
    return this._reloj$.asObservable()
    .pipe(
      map((time) => {
        return `${time.hours}:${time.minutes}:${time.seconds}`
      })
    );
  }

  constructor() {
    setInterval(() => {
      this._reloj$.next(this.currentTime);
    }, 1000)
   }

  get currentTime(): Time {
    const now = new Date ();

    return{
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
    }
  }
}

