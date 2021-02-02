import { Component } from '@angular/core';
import { HttpService } from './services/http.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  error: boolean = false;
  constructor(public httpService: HttpService) {
    this.getData();
  }
  getData() {
    this.httpService.login('auth')
    .pipe(catchError(err => throwError('Problem with recive data')))
    .subscribe((data : {token: string, auth: boolean}) => {
      if (data.auth) {
        this.httpService.token = data.token;
        this.httpService.loged.next(true);
      } else {
        this.error = true;
        alert('Problem with recive data');
      }
    },
    (error: string) => alert(error))
  }
}
