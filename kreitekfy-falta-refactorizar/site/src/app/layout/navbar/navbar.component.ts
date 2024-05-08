import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
userId!: string;

constructor(private authService: AuthService){}

ngOnInit(): void {
  this.userId = this.authService.getUsernameFromToken()!;
}
}
