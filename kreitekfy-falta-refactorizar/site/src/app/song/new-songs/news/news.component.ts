import { Component } from '@angular/core';
import { Song } from '../../song.model';
import { SongService } from '../../song.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {

  song!: Song;
  userId!: string;
  songIdString:string = this.route.snapshot.paramMap.get("songId")!
  songId: number = Number(this.songIdString);

  topSongs: Song[] = [];
  

  songsByIdDesc: Song[] = [];
  songsByReproductionsAsc: Song[] = [];


  page: number = 0;
  size: number = 100;
  sort: string = "id,desc"

  first: boolean = false;
  last: boolean = false;
  totalPages: number = 0;
totalElements: number = 0;

styleFilter?: string;

constructor(private songService: SongService, private route: ActivatedRoute, private authService: AuthService){}

ngOnInit(){
  this.userId = this.authService.getUsernameFromToken()!;
  console.log("entro en init")
  console.log(this.userId)
  
  this.getSongs();
  
  this.getReproductionsByUserId();

  console.log(this.topSongs)
  
  
}

getReproductionsByUserId(): void {
  this.authService.getReproductionsByUserId(this.userId).subscribe(reproductions => {

    console.log(reproductions)
    const topStyles = this.getTopStyles(reproductions);

    this.getTopSongsByStyles(topStyles);
  });
}


getTopStyles(reproductions: any[]): string[] {
  const styleCounts = new Map<string, number>();

  reproductions.forEach(repro => {
    const style = repro.songStyle; 
    if (styleCounts.has(style)) {
      styleCounts.set(style, styleCounts.get(style)! + 1);
    } else {
      styleCounts.set(style, 1);
    }
  });
 
  const sortedStyles = Array.from(styleCounts.keys()).sort((a, b) => styleCounts.get(b)! - styleCounts.get(a)!);
  console.log(sortedStyles)
  return sortedStyles.slice(0, 2);
}


public getTopSongsByStyles(topStyles: string[]): void {
  const filters: string | undefined = this.buildFilters();
  this.songService.getAllSongs(this.page, this.size, this.sort, filters).subscribe({
    next: (data: any) => {
        const topSongsByStyle: Song[] = [];
        topStyles.forEach(style => {
          const songsByStyle = data.content.filter((song: Song) => song.style === style && song.puntuation > 3)
                                             .sort((a: Song, b: Song) => b.reproductions - a.reproductions);
          topSongsByStyle.push(...songsByStyle);
        });
        
        this.topSongs = topSongsByStyle.slice(0, 5);
  
    },
    error: (err) => {
      console.error("Error al obtener las canciones:", err);
      this.handleError(err);
    }
  });
}

public buildFilters(): string|undefined{
  const filters: string[] = [];

  if(this.styleFilter){
    filters.push("style:MATCH:" + this.styleFilter);
}

  if(filters.length > 0){
    console.log("filtro style = " + filters)
    let globalFilters: string = "";
    for(let filter of filters){
      globalFilters = globalFilters + filter + ","
    }
    globalFilters = globalFilters.substring(0, globalFilters.length-1);
    console.log(globalFilters)
    return globalFilters;
    
      }else return undefined;
}

public searchByFilters(): void{
  this.getFilteredSongs();
}


private handleError(error: any): void {
  console.log(error);
}

private getSongs(): void {
  const filters: string | undefined = this.buildFilters();
  console.log('Filtros:', filters);
  this.songService.getAllSongs(this.page, this.size, this.sort, filters).subscribe({
    next: (data: any) => {
      this.songsByIdDesc = [...data.content];
      this.songsByReproductionsAsc = [...data.content];
      this.songsByIdDesc.sort((a, b) => b.id! - a.id!);
      this.songsByReproductionsAsc.sort((a, b) => b.reproductions - a.reproductions);
      
      this.songsByIdDesc = this.songsByIdDesc.slice(0, 5);
      this.songsByReproductionsAsc = this.songsByReproductionsAsc.slice(0, 5);
      
      this.totalPages = data.totalPages;
      this.totalElements = data.totalElements;
    },
    error: (err) => {
      this.handleError(err);
    }
  });
}

private getFilteredSongs(): void {
  const filters: string | undefined = this.buildFilters();
  console.log("filtros " + filters);
  
  this.songService.getAllSongs(this.page, this.size, this.sort, filters).subscribe({
    next: (data: any) => {
      this.songsByIdDesc = data.content.slice(0, 5);
      
      this.songsByReproductionsAsc = data.content.slice(0, 5).sort((a: Song, b: Song) => b.reproductions - a.reproductions);
      
      this.totalPages = data.totalPages;
      this.totalElements = data.totalElements;
    },
    error: (err) => {
      this.handleError(err);
    }
  });
}


public limpiarCampos() {
  this.styleFilter = '';
  this.searchByFilters();
}

}
