import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HOST } from "../../@core/config/host";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";

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

  // public delete({id: number}): Observable<any> {
  //
  // }
  //
  // public create(data: any): Observable<any> {
  //
  // }
  //
  // public update(data: any): Observable<any> {
  //
  // }
}
