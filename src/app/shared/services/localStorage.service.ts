import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CharacterI } from '../interfaces/data.interface';
import { ToastrService } from 'ngx-toastr';

const MY_FAVORITES = 'myFavorites';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private charactersFavSubject = new BehaviorSubject<CharacterI[]>(null);
  charactersFav$ = this.charactersFavSubject.asObservable();

  constructor(
    private toastr: ToastrService
  ) { 
    this.initialStorage();
  }

  addOrRemoveFavorite(character: CharacterI): void {
    const { id } = character;
    let currentsFav = this.getFavoritesCharacters();

    const found = !!currentsFav.find( (fav: CharacterI) => fav.id == id );
    found ? this.removeFromFavorite(id) : this.addToFavorite(character);
  }

  private addToFavorite(character: CharacterI): void {
    try {
      const currentsFav = this.getFavoritesCharacters();
      localStorage.setItem(MY_FAVORITES, JSON.stringify([... currentsFav, character]));
      this.charactersFavSubject.next([... currentsFav, character]);
      this.toastr.success(`${ character.name } added to favorite`, 'RickAndMortyApp')
    } catch (e) {
      console.log('Error saving localStorage', e);
      this.toastr.error(`Error saving localStorage ${ e }`, 'RickAndMortyApp')
    }
  }

  private removeFromFavorite(id: number): void {
    try {
      const currentsFav = this.getFavoritesCharacters();
      const characters = currentsFav.filter( item => item.id !== id);
      localStorage.setItem(MY_FAVORITES, JSON.stringify([...characters]));
      this.charactersFavSubject.next([... characters]);
      this.toastr.warning(`Removed from favorite`, 'RickAndMortyApp')
    } catch (e) {
      console.log('Error removing localStorage', e);
      this.toastr.error(`Error remove localStorage ${ e }`, 'RickAndMortyApp')
    }
  }

  getFavoritesCharacters(): any {
    try {
      const charactersFav = JSON.parse(localStorage.getItem(MY_FAVORITES));
      this.charactersFavSubject.next(charactersFav);
      return charactersFav;
    } catch (e) {
      console.log('Error getting favorites from localStorage', e);
    }
  }

  clearStorage(): void {
    try {
      localStorage.clear();
    } catch (e) {
      console.log('Error cleaning localStorage', e);
    }
  }

  private initialStorage(): void {
    const currents = JSON.parse(localStorage.getItem(MY_FAVORITES));

    if ( !currents ) {
      localStorage.setItem(MY_FAVORITES, JSON.stringify([]));
    } else {
      this.getFavoritesCharacters();
    }
  }

}
