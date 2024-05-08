import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './auth/user/register/register.component';
import { LoginComponent } from './auth/user/login/login.component';
import { HelloComponent } from './features/hello/hello.component';
import { NewsComponent } from './song/new-songs/news/news.component';
import { SongFormComponent } from './song/song-form/song-form.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { AllSongsComponent } from './song/all-songs/all-songs.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { HistoryComponent } from './user/history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HelloComponent,
    NewsComponent,
    SongFormComponent,
    NavbarComponent,
    AllSongsComponent,
    UserDetailsComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
