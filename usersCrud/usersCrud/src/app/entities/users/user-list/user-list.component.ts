import { Component } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  users: User[] = [];

  page: number = 0;
  size: number = 5;
  sort: string = "id,asc"

  first: boolean = false;
  last: boolean = false;
  totalPages: number = 0;
  totalElements: number = 0;

  nameFilter?: string;
  surnameFilter?: string;
  roleFilter?: string;

  userIdToDelete?: number;

  constructor(private userService: UserService){}
  
ngOnInit(): void{
  this.getUsers();
}


public prepareUserToDelete(userId: number): void{
  this.userIdToDelete = userId;
}

public deleteUser():void{
  if(this.userIdToDelete){
    this.userService.deleteUser(this.userIdToDelete).subscribe({
      next: (data) => {
        this.getUsers();
      },
      error: (err) => {this.handleError(err);}
  });
  }
 
}

public searchByFilters(): void{
  this.getUsers();
}

public buildFilters(): string|undefined{
  const filters: string[] = [];

  if(this.nameFilter){
    filters.push("name:MATCH:" + this.nameFilter);
  }

  if(this.surnameFilter){
    filters.push("surname:MATCH:" + this.surnameFilter);
  }

  if(this.roleFilter){
    filters.push("role:MATCH:" + this.roleFilter);
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


private getUsers(): void {

  const filters:string | undefined = this.buildFilters();

  this.userService.getAllUsers(this.page, this.size, this.sort, filters).subscribe({
    next: (data: any) => {
      this.users = data.content;
      this.totalPages = data.totalPages;
      this.totalElements = data.totalElements;
    },
    error: (err) => {
      this.handleError(err);
    }
  });
}

public nextPage(): void {
  if (!this.isLastPage()) {
    this.page++;
    this.getUsers();
  }
}

public previousPage(): void {
  if (!this.isFirstPage()) {
    this.page--;
    this.getUsers();
  }
}

isFirstPage(): boolean {
  return this.page === 0;
}

isLastPage(): boolean {
  return this.page === this.totalPages - 1;
}

private handleError(error: any): void {
  console.log(error);
}
}

