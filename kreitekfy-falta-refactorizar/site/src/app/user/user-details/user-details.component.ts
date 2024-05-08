import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
 
  user: any;
  currentPassword!: string;

  constructor(private authService: AuthService){}

  ngOnInit(): void{
    this.getUser();
  }


  public getUser(): void{
    const username = this.authService.getUsernameFromToken();
    this.authService.getUserByUsername(username!).subscribe(user => {
      if (user) {
        this.user = user;
        this.currentPassword = user.password;
        console.log(this.currentPassword) // Almacenar la contraseña actual al obtener el usuario
      } else {
        console.error('No se encontró ningún usuario.');
      }
    }, error => {
      console.error('Error al obtener el usuario:', error);
    });
  }

  updateUser(): void {
    this.authService.updateUser(this.user).subscribe(updatedUser => {
      // Manejar la respuesta del backend, por ejemplo, mostrar un mensaje de éxito o actualización en la interfaz de usuario
      console.log('Usuario actualizado:', updatedUser);
    }, error => {
      // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
      console.error('Error al actualizar el usuario:', error);
    });
  }
}
