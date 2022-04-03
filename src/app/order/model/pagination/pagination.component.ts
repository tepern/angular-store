import { Component, Input, Output, EventEmitter } from '@angular/core';
import { pagination } from "../pagination";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  @Input() page: number = pagination.pageVar;
  @Input() count: number = pagination.countVar;
  @Input() perPage: number = pagination.perPageVar;
  @Input() pageToShow: number = pagination.pagesToShow;
  @Input() loading: boolean = false;

  @Output() goPrev = new EventEmitter<boolean>();
  @Output() goNext = new EventEmitter<boolean>();
  @Output() goPage = new EventEmitter<number>();

  constructor() { }

  onPage(current: number) {
    this.goPage.emit(current);
  }

  onPrev(): void {
    this.goPrev.emit(true);
  }

  onNext(next: boolean): void {
    this.goNext.emit(next);
  }

  lastPage(): boolean {
    return (this.perPage * this.page > this.count) || (this.perPage * this.page == this.count);
  }

  getPages(): number[] {
    const c = Math.ceil(this.count / this.perPage);
    const p = this.page || pagination.pageVar;
    const pagesToShow = this.pageToShow || pagination.pagesToShow;
    const pages: number[] = [];
    pages.push(p);
    const times = pagesToShow - 1;
    for (let i = 0; i < times; i++) {
      if (pages.length < pagesToShow) {
        if (Math.min.apply(null, pages) > 1) {
          pages.push(Math.min.apply(null, pages) - 1);
        }
      }
      if (pages.length < pagesToShow) {
        if (Math.max.apply(null, pages) < c) {
          pages.push(Math.max.apply(null, pages) + 1);
        }
      }
    }
    pages.sort((a, b) => a - b);
    return pages;
  }

}
