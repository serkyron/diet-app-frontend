import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HOST } from "../../@core/config/host";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { IngredientInterface } from "./ingredient.interface";

@Injectable()
export class IngredientsService {
  constructor(
    private http: HttpClient,
  ) {
  }

  public get(): Observable<any> {
    return this.http.get(`${HOST.baseUrl}/ingredient`)
      .pipe(
        switchMap((response: any) => {
          return of(response.data);
        })
      );
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${HOST.baseUrl}/ingredient/${id}`);
  }

  public create(data: IngredientInterface): Observable<any> {
    this.castProperties(data);

    return this.http.put(`${HOST.baseUrl}/ingredient`, data)
      .pipe(
        switchMap((response: any) => {
          return of(response.data);
        })
      );
  }

  public update(id: number, data: IngredientInterface): Observable<any> {
    this.castProperties(data);

    return this.http.patch(`${HOST.baseUrl}/ingredient/${id}`, data)
      .pipe(
        switchMap((response: any) => {
          return of(response.data);
        })
      );
  }

  private castProperties(data: IngredientInterface) {
    for (let prop in data) {
      if (['name', 'category'].includes(prop)) {
        continue;
      }
      data[prop] = parseFloat(data[prop]);
    }
  }
}
