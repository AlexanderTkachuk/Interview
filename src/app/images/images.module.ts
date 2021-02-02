import { NgModule } from '@angular/core';
import { ImagesComponent } from './images.component';
import { CommonModule } from '@angular/common';
import { ImagesRoutingModule } from './images-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ImagesComponent],
  imports: [
    CommonModule,
    ImagesRoutingModule,
    SharedModule
  ],
})
export class ImagesModule { }
