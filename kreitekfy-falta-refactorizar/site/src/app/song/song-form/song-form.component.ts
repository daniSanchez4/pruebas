import { Component } from '@angular/core';
import { Song } from '../song.model';
import { ActivatedRoute } from '@angular/router';
import { SongService } from '../song.service';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-song-form',
  templateUrl: './song-form.component.html',
  styleUrls: ['./song-form.component.scss']
})
export class SongFormComponent {
song!: Song;

userId!: string;
songIdString:string = this.route.snapshot.paramMap.get("songId")!
songId: number = Number(this.songIdString);

reproductions: any[] = [];
repro!: number;


constructor(
  private route: ActivatedRoute,
  private songService: SongService,
  private authService: AuthService
) { }

ngOnInit(): void {


this.userId = this.authService.getUsernameFromToken()!;

if(this.userId && this.songId){
  this.authService.getReproductionsBySongIdAndUserId(this.userId, this.songId).subscribe(reproductions => {
    
    this.reproductions = reproductions;
    
    this.repro = this.reproductions.length;
  }, error => {
    console.error('Error al obtener las reproducciones del usuario para la canción específica:', error);
  });
}

const songId:string = this.route.snapshot.paramMap.get("songId")!
console.log(songId)
if (songId !== null) {
  const idNumber = +songId; 
  this.songService.getSongById(idNumber).subscribe(song => {
    this.song = song; 
  });
} else {
  
  console.error('El ID de la canción es null');
}

}

public setPuntuation(puntuation: number){
  if(this.song){
    console.log(this.song)
    this.song.puntuation = puntuation;
    console.log(this.song.puntuation)
    console.log(this.song)
    this.songService.update(this.song!).subscribe({
      
      next: (songUpdated) => {
        console.log(songUpdated)
      },
      error: (err) => {this.handleError(err);}
    });
  }
}

private handleError(err: any): void {
    
}

public playSong(){
  if (this.song) {
    this.song.reproductions += 1;
    this.songService.update(this.song).subscribe({
      next: (songUpdated) => {
        console.log('Reproducciones actualizadas:', songUpdated.reproductions);
        this.song = songUpdated;
      },
      error: (err) => {
        console.error('Error al actualizar las reproducciones:', err);
      }
    });
  }
}

public reproducirCancion(): void {
  const userId: string | null = this.authService.getUsernameFromToken();

  if (userId) {
    console.log(this.song.style);
    this.songService.reproducirCancion(this.songId, userId, this.song.style)
      .subscribe(
        () => {
          console.log('La reproducción se ha creado exitosamente.');
        },
        error => {
          console.error('Error al reproducir la canción:', error);
        }
      );
  } else {
    console.error('No se pudo obtener el nombre de usuario.');
  }
}

}


