import { Component } from '@angular/core';
import { Song } from '../song.model';
import { SongService } from '../song.service';

@Component({
  selector: 'app-all-songs',
  templateUrl: './all-songs.component.html',
  styleUrls: ['./all-songs.component.scss']
})
export class AllSongsComponent {
  songsByIdDesc: Song[] = [];
  
  page: number = 0;
  size: number = 6;
  sort: string = "id,desc"
  first: boolean = false;
  last: boolean = false;
  totalPages: number = 0;
  totalElements: number = 0;
  styleFilter?: string;
  titleFilter?: string;
  artistFilter?: string;
  albumFilter?: string;

  constructor(private songService: SongService){}


  ngOnInit(){
    this.getSongs();
    
  }

  private getSongs(): void{
    const filters:string | undefined = this.buildFilters();
    
    this.songService.getAllSongs(this.page, this.size, this.sort, filters).subscribe({
      next: (data: any) => {
        this.songsByIdDesc = data.content;
        this.totalPages = data.totalPages;
        this.totalElements = data.totalElements;
      },
      error: (err) => {
        this.handleError(err);
      }
    })

  }

  private handleError(error: any): void {
    console.log(error);
  }

  public searchByFilters(): void{
    this.getSongs();
  }
  
  public buildFilters(): string|undefined{
    const filters: string[] = [];
  
    if(this.styleFilter){
      filters.push("style:MATCH:" + this.styleFilter);
    }
  
    if(this.titleFilter){
      filters.push("title:MATCH:" + this.titleFilter);
    }
  
    if(this.artistFilter){
      filters.push("artist:MATCH:" + this.artistFilter);
    }
    
    if(this.albumFilter){
      filters.push("album:MATCH:" + this.albumFilter);
    }
  
    if(filters.length > 0){
  let globalFilters: string = "";
  for(let filter of filters){
    globalFilters = globalFilters + filter + ","
  }
  globalFilters = globalFilters.substring(0, globalFilters.length-1);
  return globalFilters;
    }else return undefined;
  }

  public limpiarCampos() {
    this.styleFilter = '';
    this.titleFilter = '';
    this.artistFilter = '';
    this.albumFilter = '';
    this.searchByFilters();
  }

  isFirstPage(): boolean {
    return this.page === 0;
  }
  
  isLastPage(): boolean {
    return this.page === this.totalPages - 1;
  }


  public nextPage(): void {
    if (!this.isLastPage()) {
      this.page++;
      this.getSongs();
    }
  }
  
  public previousPage(): void {
    if (!this.isFirstPage()) {
      this.page--;
      this.getSongs();
    }
  }
}
