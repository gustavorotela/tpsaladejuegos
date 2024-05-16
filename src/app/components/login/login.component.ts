import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { FormControl,FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { AngularMaterialModule } from '../../angular-material.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,AngularMaterialModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email:string = "";
  password:string = "";
  emailLogeado:string = "";

  constructor(private firestore:Firestore, public Auth:Auth, private router : Router) {

  }

  LoginRapido() {
    console.log(this.email);
    signInWithEmailAndPassword(this.Auth,'prueba@prueba.com','prueba').then((res) => {
      if(res.user.email != null) {
        localStorage.setItem('userLogin',res.user.email);

        let col = collection(this.firestore,'logins');
        addDoc(col, {fecha: new Date(), "email":this.email});

        this.router.navigateByUrl('/home');
      }
    }).catch((e) => console.log(e))
  }

  Login() {
    console.log(this.email);
    signInWithEmailAndPassword(this.Auth,String(this.email),String(this.password)).then((res) => {
      if(res.user.email != null) {
        localStorage.setItem('userLogin',res.user.email);

        let col = collection(this.firestore,'logins');
        addDoc(col, {fecha: new Date(), "email":this.email});

        this.router.navigateByUrl('/home');
      }
    }).catch((e) => console.log(e))
  }

  Registrarse() {
    this.router.navigateByUrl('registro');
  }
}
