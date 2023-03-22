import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HOST } from "../../@core/config/host";
import { Observable, of, Subject } from "rxjs";
import { switchMap } from "rxjs/operators";

@Injectable()
export class MealsService {

  private meals$ = new Subject();

  constructor(
    private http: HttpClient,
  ) {
  }

  private loadMeals(): void {
    this.http.get(`${HOST.baseUrl}/meal`)
      .pipe(
        switchMap((response: any) => {
          return of(response.data);
        }),
      )
      .subscribe(
        (data) => this.meals$.next(data),
        (e) => this.meals$.error(e),
      );
  }

  public refresh(): void {
    this.loadMeals();
  }

  public get(): Observable<any> {
    this.loadMeals();

    return this.meals$.asObservable();
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${HOST.baseUrl}/meal/${id}`);
  }

  public create(data: any): Observable<any> {
    return this.http.put(`${HOST.baseUrl}/meal`, data)
      .pipe(
        switchMap((response: any) => {
          return of(response.data);
        }),
      );
  }
}
