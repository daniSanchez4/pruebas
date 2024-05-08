import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/user/login/login.component';
import { RegisterComponent } from './auth/user/register/register.component';
import { HelloComponent } from './features/hello/hello.component';
import { NewsComponent } from './song/new-songs/news/news.component';
import { SongFormComponent } from './song/song-form/song-form.component';
import { AllSongsComponent } from './song/all-songs/all-songs.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { HistoryComponent } from './user/history/history.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'inicio', component: NewsComponent },
  { path: 'song/:songId', component: SongFormComponent},
  { path: 'all', component: AllSongsComponent},
  { path: 'user-detail', component: UserDetailsComponent},
  { path: 'historial', component: HistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
