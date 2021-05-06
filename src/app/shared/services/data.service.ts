import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import { find, mergeMap, pluck, take, tap, withLatestFrom  } from 'rxjs/operators';
import { CharacterI, DataResponseI, EpisodeI } from '../interfaces/data.interface';
import { LocalStorageService } from './localStorage.service';

const QUERY = gql `
  {
    episodes {
      results {
        name
        episode
      }
    }
    characters {
      results {
        id
        name
        status
        species
        gender
        image
      }
    }
  }
`;
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private episodesSubject = new BehaviorSubject<EpisodeI[]>([]);
  episodes$ = this.episodesSubject.asObservable();

  private charactersSubject = new BehaviorSubject<CharacterI[]>([]);
  characters$ = this.charactersSubject.asObservable();

  constructor(
    private apollo: Apollo,
    private losalStorageSvc: LocalStorageService
  ) {
    this.getDataApi();
  }

  getDetail(id: number): any {
    return this.characters$.pipe(
      mergeMap( (characters: CharacterI[]) => characters),
      find( (character: CharacterI) => character?.id == id)
    );
  }
  getCharactersByPage( pageNumber: number): void {
    const QUERY_BY_PAGE = gql `
    {
      characters(page: ${ pageNumber }) {
        results {
          id
          name
          status
          species
          gender
          image
        }
      }
    }
  `;
    this.apollo.watchQuery<any>({
      query: QUERY_BY_PAGE
    }).valueChanges.pipe(
      take(1),
      pluck('data', 'characters'), // PLUCK: Destructuring
      withLatestFrom(this.characters$), // Merge the array
      tap(([apiResponse, characters]) => {
        this.parseCharactersData([... characters,... apiResponse.results]);
      })
    ).subscribe();
  }

  private getDataApi(): void {
    this.apollo.watchQuery<DataResponseI>({
      query: QUERY
    }).valueChanges.pipe(
      take(1),
      tap( ({ data }) => {
        const { characters, episodes } = data;
        this.episodesSubject.next(episodes.results);

        this.parseCharactersData(characters.results);
      })
    ).subscribe();
  }

  private parseCharactersData(characters: CharacterI[]): void {
    const currentFavs = this.losalStorageSvc.getFavoritesCharacters();
    const newData = characters.map( character => {
      const found = !!currentFavs.find( (fav: CharacterI) => fav.id === character.id);
      return { ...character, isFavorite: found };
    });

    this.charactersSubject.next(newData);
  }
}
