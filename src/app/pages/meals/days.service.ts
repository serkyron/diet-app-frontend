import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HOST } from '../../@core/config/host';
import { Observable, of, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DayInterface } from './day.interface';

@Injectable()
export class DaysService {

  private days$ = new Subject();

  constructor(
    private http: HttpClient,
  ) {
  }

  private loadDays(): void {
    this.http.get(`${HOST.baseUrl}/day`)
      .pipe(
        switchMap((response: any) => {
          return of(response.data);
        }),
      )
      .subscribe(
        (data) => this.days$.next(data),
        (e) => this.days$.error(e),
      );
  }

  public refresh(): void {
    this.loadDays();
  }

  public get(): Observable<any> {
    this.loadDays();

    return this.days$.asObservable();
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${HOST.baseUrl}/day/${id}`);
  }

  public create(data: DayInterface): Observable<any> {
    return this.http.put(`${HOST.baseUrl}/day`, data)
      .pipe(
        switchMap((response: any) => {
          return of(response.data);
        }),
      );
  }

  public update(id: number, data: any): Observable<any> {
    return this.http.patch(`${HOST.baseUrl}/day/${id}`, data)
      .pipe(
        switchMap((response: any) => {
          return of(response.data);
        }),
      );
  }
}
