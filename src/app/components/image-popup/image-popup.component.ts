import { Component, OnInit, Input } from '@angular/core';
import { Picture } from 'src/app/interfaces/Picture.interface';

@Component({
  selector: 'app-image-popup',
  templateUrl: './image-popup.component.html',
  styleUrls: ['./image-popup.component.scss']
})
export class ImagePopupComponent implements OnInit {
 @Input() picture: Picture;
  constructor() { }

  ngOnInit(): void {
    console.log(this.picture)
  }

}
