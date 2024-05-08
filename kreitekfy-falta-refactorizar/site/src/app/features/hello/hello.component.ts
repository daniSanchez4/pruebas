import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/service/auth.service';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.scss']
})
export class HelloComponent implements OnInit {
  message = '';

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    const token = this.authService.getToken();
    this.http.get<any>('http://localhost:8080/api/v1/hello', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (response) => {
        this.message = response.message;
      },
      error: (error) => {
        console.error('Error fetching hello message', error);
      }
    });
  }
}
