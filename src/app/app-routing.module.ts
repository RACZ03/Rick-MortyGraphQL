import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'character-list', pathMatch: 'full'
  },
  { 
    path: 'home', loadChildren: () => import('./components/pages/home/home.module').then(m => m.HomeModule) 
  }, 
  { 
    path: 'episodes', loadChildren: () => import('./components/pages/episodes/episodes.module').then(m => m.EpisodesModule) 
  }, 
  { 
    path: 'character-list', loadChildren: () => import('./components/pages/characters/characters-list/characters-list.module').then(m => m.CharactersListModule) 
  }, 
  { 
    path: 'character-details/:id', loadChildren: () => import('./components/pages/characters/characters-detail/characters-detail.module').then(m => m.CharactersDetailModule) 
  }, 
  { 
    path: 'about', loadChildren: () => import('./components/pages/about/about.module').then(m => m.AboutModule)
  },
  { 
    path: '**', loadChildren: () => import('./components/pages/noFount/no-fount.module').then(m => m.NoFountModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
