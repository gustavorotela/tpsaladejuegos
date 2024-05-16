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
  imports: [FormsModule],
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

  constructor(public Auth: Auth, private router:Router, private firestore:Firestore) {

  }

  registro() {
    if(this.password == this.passwordConfirmar) {
    createUserWithEmailAndPassword(this.Auth,this.email,this.password).then((res) => {
      if (res.user.email !== null) this.loggedUser = res.user.email;
      
      this.loguearCuentaRegistrada();

      this.flagError = false;

    }).catch((e) => {
      this.flagError = true;

      switch (e.code) {
        case "auth/invalid-email":
          this.msjError = "Email invalido";
          break;
        case "auth/email-already-in-use":
          this.msjError = "Email ya en uso";
          break;
        default:
          this.msjError = e.code
          break;
      }
    })
  } else {
    console.log('las contraseña ingresa es incorrecta');
  }
  }

  async loguearCuentaRegistrada() {
    await new Promise(f => setTimeout(f, 500));

    signInWithEmailAndPassword(this.Auth,this.email,this.password).then((res) => {
      if(res.user.email != null) {
        localStorage.setItem('userLogin',res.user.email);
        
        let col = collection(this.firestore,'logins');
        addDoc(col, {fecha: new Date(), "email":this.email});

        this.router.navigateByUrl('/home');
      }
    }).catch((e) => console.log(e))
  }
}
