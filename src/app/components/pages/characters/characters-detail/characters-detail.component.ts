import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take, tap } from 'rxjs/operators';
import Observable from 'zen-observable';
import { DataService } from '../../../../shared/services/data.service';

@Component({
  selector: 'app-characters-detail',
  template: `
    <section class="character__details">

      <app-characters-card *ngIf="character$ | async as character" 
                           [character]="character">
      </app-characters-card>

    </section>
  `,
  styleUrls: ['./characters-detail.component.scss']
})
export class CharactersDetailComponent implements OnInit {

  public character$: Observable<any>;
  constructor(
    private route: ActivatedRoute,
    private dataSvc: DataService
  ) {
    this.route.params.pipe(
      take(1),
      tap( ({ id }) => this.character$ = this.dataSvc.getDetail( id ) )
    ).subscribe();
  }

  ngOnInit(): void {
  }

}
