import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../../angular-material.module';
import { HomeComponent } from '../../home/home.component';
import { MenuComponent } from '../../menu/menu.component';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [CommonModule,FormsModule,AngularMaterialModule,HomeComponent,MenuComponent],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})

export class AhorcadoComponent {
  words: string[] = ['hotel','casa','pelota','amarillo','ropero','teclado','mouse','impresora','shampoo','caliente','profesor','alumno','notebook','departamento','pizarron','camioneta','ventana','resguardar','reventar','hermano'];
  word: string = '';
  displayedWord: string[] = [];
  guessedLetters: Set<string> = new Set();
  correctLetters: Set<string> = new Set();
  wrongLetters: Set<string> = new Set();
  currentGuess: string = '';
  lives: number = 6;
  gameOver: boolean = false;
  message: string = '';

  qwertyTopRow: string[] = 'qwertyuiop'.split('');
  qwertyMiddleRow: string[] = 'asdfghjkl'.split('');
  qwertyBottomRow: string[] = 'zxcvbnm'.split('');

  constructor() {
    this.initializeDisplayedWord();
  }

  initializeDisplayedWord() {
    this.word = this.words[Math.floor(Math.random() * this.words.length)];
    this.displayedWord = Array(this.word.length).fill('_');
  }

  guessLetter(letter: string) {
    if (letter.length === 1 && !this.guessedLetters.has(letter)) {
      this.guessedLetters.add(letter);
      if (this.word.includes(letter)) {
        this.correctLetters.add(letter);
        for (let i = 0; i < this.word.length; i++) {
          if (this.word[i] === letter) {
            this.displayedWord[i] = letter;
          }
        }
      } else {
        this.wrongLetters.add(letter);
        this.lives--;
      }
      this.checkGameOver();
    }
  }

  checkGameOver() {
    if (!this.displayedWord.includes('_')) {
      this.gameOver = true;
      this.message = '¡Ganaste!';
    } else if (this.lives <= 0) {
      this.gameOver = true;
      this.message = '¡Perdiste! La palabra era: ' + this.word;
    }
  }

  resetGame() {
    this.displayedWord = [];
    this.guessedLetters.clear();
    this.correctLetters.clear();
    this.wrongLetters.clear();
    this.currentGuess = '';
    this.lives = 6;
    this.gameOver = false;
    this.message = '';
    this.initializeDisplayedWord();
  }
}
