import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HOST } from "../../@core/config/host";
import { Observable, of } from "rxjs";
import { NbAuthService, NbAuthSimpleToken } from "@nebular/auth";
import { switchMap, tap } from "rxjs/operators";

@Injectable()
export class IngredientsService {
  constructor(
    private http: HttpClient,
    private authService: NbAuthService,
  ) {
  }

  public get(): Observable<any> {
    return this.authService.getToken()
      .pipe(
        switchMap((tokenObject) => {
          let tokenStr = tokenObject.getValue();

          return this.http.get(`${HOST.baseUrl}/ingredient`, {
            headers: {
              Authorization: `Bearer ${tokenStr}`,
            },
          })
            .pipe(
              switchMap((response: any) => {
                return of(response.data);
              })
            )
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
