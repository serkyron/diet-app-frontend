import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HOST } from "../../@core/config/host";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { MealInterface } from "./meal.interface";

@Injectable()
export class MealsService {
  constructor(
    private http: HttpClient,
  ) {
  }

  public get(): Observable<any> {
    return this.http.get(`${HOST.baseUrl}/meal`)
      .pipe(
        switchMap((response: any) => {
          return of(response.data);
        })
      );
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${HOST.baseUrl}/meal/${id}`);
  }

  public create(data: MealInterface): Observable<any> {
    this.castProperties(data);

    return this.http.put(`${HOST.baseUrl}/meal`, data)
      .pipe(
        switchMap((response: any) => {
          return of(response.data);
        })
      );
  }

  private castProperties(data: MealInterface) {
    for (let prop in data) {
      if (['name'].includes(prop)) {
        continue;
      }
      data[prop] = parseFloat(data[prop]);
    }
  }
}
