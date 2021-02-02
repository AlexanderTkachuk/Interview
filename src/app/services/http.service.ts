import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, MonoTypeOperatorFunction,  Subject, throwError, BehaviorSubject } from 'rxjs';
import { catchError, takeUntil, } from 'rxjs/operators';
import { getPicturesMethod, Picture } from '../interfaces/Picture.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  token: string = '';
  url: string  = 'http://interview.agileengine.com/';
  loged: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }
  login(route: string): Observable<{token: string, auth: boolean}> {
    return this.http.post<{token:string, auth: boolean}>(this.url+route, { "apiKey": "23567b218376f79d9415" });
  }

  getImages(route: string, page: number): Observable<getPicturesMethod> {
    console.log(route, page)
    return this.http.get<getPicturesMethod>(this.url+route, {params: {page: `${page}`}, headers: this.generateHeaders(this.token)})
  }
  getImageById(route:string, id: string): Observable<Picture> {
    return this.http.get<Picture>(this.url+route+`/${id}`, { headers: this.generateHeaders(this.token)})
  }
  handleError(error: string, destroy$: Subject<any>): MonoTypeOperatorFunction<any> {
    return catchError(() => throwError({message: error})), takeUntil(destroy$)
  }
  generateHeaders(bearer: string): any {
    return new HttpHeaders().set('Authorization', `Bearer ${bearer}`);
  }
  clearData() {
    this.token = '';
  }
}
