import { Component } from '@angular/core';
import { MenuComponent } from '../../menu/menu.component';

@Component({
  selector: 'app-mayoromenor',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './mayoromenor.component.html',
  styleUrl: './mayoromenor.component.css'
})
export class MayoromenorComponent {
  suits = ['H', 'D', 'C', 'S'];
  values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  deck: any[] = [];
  currentCard: any;
  nextCard: any;
  lives = 3;
  message = '';
  gameOver = false;

  currentCardImage = 'assets/cartas/grey_back.png';
  nextCardImage = 'assets/cartas/grey_back.png';

  constructor() {}

  ngOnInit(): void {
    this.startGame();
  }

  startGame() {
    this.lives = 3;
    this.message = '';
    this.gameOver = false;
    this.initializeDeck();
    this.currentCard = this.drawCard();
    this.currentCardImage = this.getCardImage(this.currentCard);
    this.nextCard = this.drawCard();
    this.nextCardImage = 'assets/cartas/grey_back.png';
  }

  initializeDeck() {
    this.deck = [];
    for (let suit of this.suits) {
      for (let value of this.values) {
        this.deck.push({ suit, value });
      }
    }
  }

  drawCard() {
    const randomIndex = Math.floor(Math.random() * this.deck.length);
    const card = this.deck.splice(randomIndex, 1)[0];
    return card;
  }

  getCardImage(card: any): string {
    return `assets/cartas/${card.value}${card.suit}.png`;
  }

  getCardValue(card: any): number {
    return this.values.indexOf(card.value);
  }

  guess(higher: boolean) {
    if (this.gameOver) {
      return;
    }

    const currentValue = this.getCardValue(this.currentCard);
    const nextValue = this.getCardValue(this.nextCard);

    this.nextCardImage = this.getCardImage(this.nextCard);

    if (higher && nextValue > currentValue) {
      this.message = '¡Correcto! La carta es mayor.';
    } else if (!higher && nextValue < currentValue) {
      this.message = '¡Correcto! La carta es menor.';
    } else if (nextValue === currentValue) {
      this.message = 'Las cartas son iguales, no pierdes una vida.';
    } else {
      this.lives -= 1;
      this.message = '¡Incorrecto! Pierdes una vida.';
    }

    if (this.lives <= 0) {
      this.message = '¡Perdiste! Se te acabaron las vidas.';
      this.gameOver = true;
    } else {
      this.currentCard = this.nextCard;
      this.currentCardImage = this.getCardImage(this.currentCard);
      this.nextCard = this.drawCard();
      console.table(this.deck);
      
      this.nextCardImage = 'assets/cartas/grey_back.png';
    }
  }
}
