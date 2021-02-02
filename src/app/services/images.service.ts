import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { getPicturesMethod, Picture} from '../interfaces/Picture.interface'

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private httpService: HttpService) { }

  getImages(page: number): Observable<getPicturesMethod> {
    return this.httpService.getImages('images', page);
  }
  getPictureById(id: string): Observable<Picture>  {
    return this.httpService.getImageById('images', id);
  }
}
