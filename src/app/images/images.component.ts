import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ImagesService } from '../services/images.service';
import { HttpService } from '../services/http.service';
import { Subject } from 'rxjs';
import { getPicturesMethod, Picture, Pictures } from '../interfaces/Picture.interface';
@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit, OnDestroy {
  private readonly onDestroy$ = new Subject<void>();
  @ViewChild('copiesLink') copiesLink: ElementRef;
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
   this.closeModal('modal');
  }
  pictures: Pictures[] = [];
  selectedPicture: Picture;
  page: number = 1;
  pageCount: number;
  pagination: number[] = [];
  selectedPictureIndex: number;
  hasMore: boolean;
  loading: boolean;
  shareLink: string = '';

  constructor(private httpService: HttpService, private imagesService: ImagesService) { }
  ngOnInit() {
    this.httpService.loged.subscribe(data => data ? this.getImagesMethod(this.page) : null)
  }
  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
  nextPage() {
    if (this.page + 1 <= this.pageCount) {
      this.page += 1;
      this.getImagesMethod(this.page);
    }
  }
  prevPage() {
    if (this.page - 1 >= 1) {
      this.page -= 1;
      this.getImagesMethod(this.page);
    }
  }
  swipe(type: 'prev' | 'next') {
    this.loading = true;
    if (type === 'next' && this.selectedPictureIndex + 1 < this.pictures.length) {
      this.selectedPictureIndex += 1;
      this.getPictureById(this.pictures[this.selectedPictureIndex].id)
    }
    else if (type === 'prev' && this.selectedPictureIndex - 1 > -1) {
      this.selectedPictureIndex -= 1;
      this.getPictureById(this.pictures[this.selectedPictureIndex].id)
    }
    else {
      this.loading = false;
    }
  }
  share() {
    this.shareLink = this.selectedPicture.full_picture;
  }
  closeModal(type: 'modal' | 'shareLink') {
    if (type === 'modal') {
      this.selectedPicture = null;
      this.shareLink = '';
    }
    else this.shareLink = '';
  }
  selectPicture(id: string, index: number) {
    this.loading = true;
    this.selectedPictureIndex = index;
    this.getPictureById(id);
  }
  selectPage(page: number) {
    this.loading = true;
    this.page = page;
    this.getImagesMethod(this.page);
  }
  getPictureById(id: string) {
    this.imagesService.getPictureById(id)
      .pipe(this.httpService.handleError('Can`t get image', this.onDestroy$))
      .subscribe((picture: Picture) => {
        this.selectedPicture = picture;
        this.loading = false;
      })
  }

  getImagesMethod(page: number) {
    this.imagesService.getImages(page)
      .pipe(this.httpService.handleError('Can`t get images', this.onDestroy$))
      .subscribe((data: getPicturesMethod) => {
        this.page = data.page;
        this.pageCount = data.pageCount;
        this.pictures = data.pictures;
        this.pagination = Array(data.pageCount).fill(1).map((x, i) => i);
        this.loading = false;
      }, error => alert(error));

  }

  pageChange(value: Paginator) {
    this.loading = true;
    this.getImagesMethod(value.pageIndex + 1);
  }
  
  copyLink() {
    this.copiesLink.nativeElement.select();
    document.execCommand("copy");
    this.copiesLink.nativeElement.disabled = true;
  }
  trackFunc(item) {
    return item.id;
  }
}

interface Paginator {
  length: number;
  pageIndex: number;
  pageSize: number;
  previousPageIndex: number;
}

