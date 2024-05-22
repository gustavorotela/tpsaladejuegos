import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email:string = "";
  password:string = "";
  passwordConfirmar:string = "";
  loggedUser: string = "";
  flagError: boolean = false;
  msjError: string = "";
  errorMessage: string = '';
  successMessage:string = '';

  constructor(public Auth: Auth, private router:Router, private firestore:Firestore) {

  }

  registro() {
    if(this.password == this.passwordConfirmar) {
    createUserWithEmailAndPassword(this.Auth,this.email,this.password).then((res) => {
      if (res.user.email !== null) this.loggedUser = res.user.email;
      this.successMessage = 'Registro exitoso. ¡Bienvenido!';
      this.loguearCuentaRegistrada();

      this.flagError = false;

    }).catch((e) => {
      this.handleError(e);
    })
  } else {
    this.errorMessage = 'las contraseña ingresadas no coinciden';
  }
  }

  async loguearCuentaRegistrada() {
    await new Promise(f => setTimeout(f, 1000));

    signInWithEmailAndPassword(this.Auth,this.email,this.password).then((res) => {
      if(res.user.email != null) {
        localStorage.setItem('userLogin',res.user.email);
        
        let col = collection(this.firestore,'logins');
        addDoc(col, {fecha: new Date(), "email":this.email});

        this.router.navigateByUrl('/home');
      }
    }).catch((e) => console.log(e))
  }

  private handleError(error: any) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        this.errorMessage = 'Este email ya está registrado.';
        break;
      case 'auth/invalid-email':
        this.errorMessage = 'El email no es válido.';
        break;
      case 'auth/weak-password':
        this.errorMessage = 'La contraseña es demasiado débil.';
        break;
      default:
        this.errorMessage = 'Ocurrió un error inesperado.';
    }
  }

  login() {
    this.router.navigateByUrl('/login');
  }
}
