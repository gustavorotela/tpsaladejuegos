import { Component } from '@angular/core';
import { MenuComponent } from '../../menu/menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blackjack',
  standalone: true,
  imports: [MenuComponent,CommonModule],
  templateUrl: './blackjack.component.html',
  styleUrl: './blackjack.component.css'
})
export class BlackjackComponent {
  suits = ['H', 'D', 'C', 'S'];
  values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  deck: any[] = [];
  playerHand: any[] = [];
  dealerHand: any[] = [];
  playerScore = 0;
  dealerScore = 0;
  gameOver = false;
  revealDealerCards = false;
  message = '';

  constructor() {}

  ngOnInit(): void {
    this.startGame();
  }

  startGame() {
    this.deck = this.initializeDeck();
    this.playerHand = [this.drawCard(), this.drawCard()];
    this.dealerHand = [this.drawCard(), this.drawCard()];
    this.updateScores();
    this.gameOver = false;
    this.revealDealerCards = false;
    this.message = '';
  }

  initializeDeck() {
    let deck = [];
    for (let suit of this.suits) {
      for (let value of this.values) {
        deck.push({ suit, value });
      }
    }
    return deck;
  }

  drawCard() {
    const randomIndex = Math.floor(Math.random() * this.deck.length);
    return this.deck.splice(randomIndex, 1)[0];
  }

  getCardValue(card: any): number {
    if (card.value === 'A') {
      return 11;
    } else if (['K', 'Q', 'J'].includes(card.value)) {
      return 10;
    } else {
      return parseInt(card.value, 10);
    }
  }

  calculateScore(hand: any[]): number {
    let score = hand.reduce((acc, card) => acc + this.getCardValue(card), 0);
    let aceCount = hand.filter(card => card.value === 'A').length;

    while (score > 21 && aceCount > 0) {
      score -= 10;
      aceCount--;
    }

    return score;
  }

  updateScores() {
    this.playerScore = this.calculateScore(this.playerHand);
    this.dealerScore = this.calculateScore(this.dealerHand);
  }

  hit() {
    if (this.gameOver) return;
    this.playerHand.push(this.drawCard());
    this.updateScores();
    if (this.playerScore > 21) {
      this.message = '¡Te pasaste! La casa gana.';
      this.gameOver = true;
      this.revealDealerCards = true;
    }
  }

  stand() {
    if (this.gameOver) return;
    this.revealDealerCards = true;
    while (this.dealerScore < 19) {
      this.dealerHand.push(this.drawCard());
      this.updateScores();
    }

    if (this.dealerScore > 21 || this.playerScore > this.dealerScore) {
      this.message = '¡Ganaste!';
    } else if (this.playerScore === this.dealerScore) {
      this.message = '¡Empate!';
    } else {
      this.message = 'La casa gana.';
    }
    this.gameOver = true;
  }

  isCorrectAnswer(dealerScore: number, playerScore: number): boolean {
    if(dealerScore > 21 || playerScore > dealerScore && playerScore <= 21){
      return true;
    } else {
      return false;
    }
  }

  getCardImage(card: any, isDealer: boolean): string {
    if (isDealer && !this.revealDealerCards) {
      return 'assets/cartas/grey_back.png';
    }
    return `assets/cartas/${card.value}${card.suit}.png`;
  }
}
