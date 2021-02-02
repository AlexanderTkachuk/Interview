import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePopupComponent } from '../components/image-popup/image-popup.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [ImagePopupComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [ImagePopupComponent, MatPaginatorModule, MatProgressSpinnerModule]
})
export class SharedModule { }
