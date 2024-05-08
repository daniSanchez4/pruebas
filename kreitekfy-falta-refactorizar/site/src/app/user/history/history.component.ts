import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { SongService } from 'src/app/song/song.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {

reprosPaged : any[] = [];
userId!: string;

page: number = 0;
size: number = 5;
sort: string = "id,desc"

first: boolean = false;
last: boolean = false;
totalPages: number = 0;
totalElements: number = 0;

constructor(private songService: SongService, private authService: AuthService){}

ngOnInit(){
this.userId = this.authService.getUsernameFromToken()!;
this.getHistory();

}

private getHistory(): void{
  this.songService.getReproductionsByUserId(this.userId, this.page, this.size, this.sort).subscribe({
    next: (data: any) =>{
      this.reprosPaged = data.content;
      this.totalPages = data.totalPages;
      this.totalElements = data.totalElements;
    },
    error: (err) =>{
      this.handleError(err);
    }
  })
}

private handleError(error: any): void {
  console.log(error);
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
    this.getHistory();
  }
}

public previousPage(): void {
  if (!this.isFirstPage()) {
    this.page--;
    this.getHistory();
  }
}

}
