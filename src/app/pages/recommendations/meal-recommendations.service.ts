import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HOST } from "../../@core/config/host";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { RecommendationInterface } from "./recommendation.interface";

@Injectable()
export class MealRecommendationsService {
  constructor(
    private http: HttpClient,
  ) {
  }

  public get(): Observable<any> {
    return this.http.get(`${HOST.baseUrl}/meal-recommendation`)
      .pipe(
        switchMap((response: any) => {
          return of(response.data);
        })
      );
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${HOST.baseUrl}/meal-recommendation/${id}`);
  }

  public create(data: RecommendationInterface): Observable<any> {
    this.castProperties(data);

    return this.http.put(`${HOST.baseUrl}/meal-recommendation`, data)
      .pipe(
        switchMap((response: any) => {
          return of(response.data);
        })
      );
  }

  public update(id: number, data: RecommendationInterface): Observable<any> {
    this.castProperties(data);

    return this.http.patch(`${HOST.baseUrl}/meal-recommendation/${id}`, data)
      .pipe(
        switchMap((response: any) => {
          return of(response.data);
        })
      );
  }

  private castProperties(data: RecommendationInterface) {
    for (let prop in data) {
      if (['name'].includes(prop)) {
        continue;
      }
      data[prop] = parseFloat(data[prop]);
    }
  }
}
