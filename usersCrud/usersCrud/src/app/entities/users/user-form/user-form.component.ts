import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from '../model/user.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {

  modo: "NEW" | "UPDATE" = "NEW";
  userId?: number;
  user?: User;


  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router){}

  ngOnInit():void{
    
    const entryParam:string = this.route.snapshot.paramMap.get("userId") ?? "new";
    if (entryParam !== "new"){
      this.userId = +this.route.snapshot.paramMap.get("userId")!;
      this.modo = "UPDATE";
      this.getUserById(this.userId!);
    }else{
      this.modo = "NEW";
      this.initializeUser();
    }
  }

  public saveUser():void{
    if (this.modo === "NEW"){
      this.insertUser();
    }

    if (this.modo === "UPDATE"){
      this.updateUser();
    }

    this.router.navigate(['/users']);
  }

  public volver():void{
    this.router.navigate(['/users']);
  }

  private insertUser(){
    console.log(this.user);
    this.userService.insert(this.user!).subscribe({
      
  next: (userInserted) => {
    console.log("Insertado");
    console.log(userInserted);
  },
  error: (err) => {this.handleError(err);}
});
  }

  private updateUser(){
    this.userService.update(this.user!).subscribe({
      next: (userUpdated) => {
        console.log("Modificado");
        console.log(userUpdated);
      },
      error: (err) => {this.handleError(err);}
    });
  }


  
  private initializeUser(): void {
    this.user = new User(undefined, "", "", "", "");
  }

  private getUserById(userId:number){
this.userService.getUserById(userId).subscribe({
  next: (userRequest) => {this.user = userRequest},
  error: (err) => {this.handleError(err);}
});
  }
  private handleError(err: any): void {
    
  }

}
