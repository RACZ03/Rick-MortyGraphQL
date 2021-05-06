import { Component, HostListener, Inject } from '@angular/core';
import { DataService } from '../../../../shared/services/data.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-characters-list',
  template: `
    <section class="character__list" 
            infiniteScroll
            (scrolled)="onScrollDown()">
      <app-characters-card *ngFor="let character of characters$ | async"
                            [character]="character">
      </app-characters-card>
      <button *ngIf="showButton" class="button" (click)="onScrollTop()"> ⬆️ </button>
    </section>
  `,
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent {
  public characters$ = this.dataSvc.characters$;
  public showButton: boolean = false;
  private scrollHeight = 500;
  private pageNum: number = 1;
  constructor(
    private dataSvc: DataService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const yOffSet = window.pageYOffset;
    const scrollTop = this.document.documentElement.scrollTop;

    this.showButton = ( yOffSet || scrollTop ) > this.scrollHeight;
  }

  onScrollTop(): void {
    this.document.documentElement.scrollTop = 0;
  }

  onScrollDown(): void {
    this.pageNum++;
    this.dataSvc.getCharactersByPage(this.pageNum);
  }
}
