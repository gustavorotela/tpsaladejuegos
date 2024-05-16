import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../../angular-material.module';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [CommonModule,FormsModule,AngularMaterialModule],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})

export class AhorcadoComponent {
  arrayPalabras:string[] = ['hotel','casa','pelota','amarillo','ropero','teclado','mouse','impresora','shampoo','caliente','profesor','alumno','notebook','departamento','pizarron','camioneta','ventana','resguardar','reventar','hermano'];
  palabraEntera:string = '';
  palabra:string[] = [''];
  palabraAMostrar:string[] = [''];
  numeroError:number = 0;
  palabraHTML:string = "";

  constructor(){
    this.iniciarJuego();
  }

  iniciarJuego(){
    this.palabraEntera = this.arrayPalabras[Math.floor(Math.random() * this.arrayPalabras.length)];
    for (let i = 0; i < this.palabraEntera.length; i++) {
      this.palabra[i] = this.palabraEntera[i];
      this.palabraAMostrar[i] = ' ';
      this.establecerEspacios();
    }
    console.log(this.palabra);
  }

  letraClick(letra:string){
    console.log(letra);
    let numero = this.palabra.indexOf(letra);
    let boton = document.getElementById(letra);
    boton?.setAttribute('disabled','');
    console.log(numero);
    
    if(this.palabra.indexOf(letra) >= 0){
      console.log('se dibuja la letra');
      this.dibujarLetra(letra);
    } else {
      console.log('se dibuja una parte del cuerpo');
      this.error();
    }
  }

  dibujarLetra(letra:string) {
    for (let i = 0; i < this.palabraEntera.length; i++) {
      if(this.palabraEntera[i] == letra){
        this.palabraAMostrar[i] = letra;
      }
    }

    console.log(this.palabraAMostrar);
  }

  error(){
    this.numeroError += 1;
  }

  establecerEspacios() {
    let html = '';

    for (let i = 0; i < this.palabraEntera.length; i++) {
        if (this.palabraEntera.charAt(i) == ' ') {
            html += '<span class="espacio"></span>';
        } else {
            html += '<span class="letra">o</span>';
        }
    }
    this.palabraHTML = html;
  }
}
