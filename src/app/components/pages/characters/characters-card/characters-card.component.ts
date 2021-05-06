import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CharacterI } from '../../../../shared/interfaces/data.interface';
import { LocalStorageService } from '../../../../shared/services/localStorage.service';

@Component({
  selector: 'app-characters-card',
  templateUrl: './characters-card.component.html',
  styleUrls: ['./characters-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersCardComponent {

  @Input() character: CharacterI;
  constructor(
    private localStorageSvc: LocalStorageService
  ) { }

  toggleFavorite(): void {
    const isFavorite = this.character.isFavorite;
    this.getIcon();
    this.character.isFavorite = !isFavorite;
    this.localStorageSvc.addOrRemoveFavorite(this.character);
  }

  getIcon(): string {
    return this.character.isFavorite ? 'heart-solid.svg' : 'heart.svg';
  }
}
