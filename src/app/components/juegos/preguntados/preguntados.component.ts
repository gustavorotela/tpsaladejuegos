import { Component, OnInit } from '@angular/core';
import { PreguntadosService } from '../../../services/preguntados.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from '../../menu/menu.component';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [CommonModule,HttpClientModule,MenuComponent],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css',
  providers: [PreguntadosService]
})
export class PreguntadosComponent implements OnInit {
  question: string;
  answers: string[] = [];
  chargeAnswers: string[] = [];
  correctAnswer: string;
  imageUrl: string;
  message: string;
  usedPokemonsId:number[] = [];
  optionsId:number[] = [];
  selectedAnswer: string | null = null;
  correctAnswers: number = 0;
  totalQuestions: number = 0;

  constructor(private preguntadosService: PreguntadosService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loadQuestion();
    },500);
  }

  async loadQuestion() {
    this.message = "";
    this.imageUrl = "../../assets/loading_icon.gif";
    let pokemonId = this.getRandomPokemonId();
    this.answers = []
    this.chargeAnswers = []
    this.optionsId = [];

    while(this.usedPokemonsId.includes(pokemonId)) {
      pokemonId = this.getRandomPokemonId();
    }
    
    this.usedPokemonsId.push(pokemonId)
    
    const data = await this.preguntadosService.getQuestion(pokemonId)
    this.imageUrl = data.sprites.other.dream_world.front_default;
    this.chargeAnswers = [data.name];
    this.correctAnswer = data.name;
    this.optionsId.push(pokemonId);
    this.getNames();
    await new Promise(f => setTimeout(f, 1000));
  }

  checkAnswer(answer: string) {
    this.selectedAnswer = answer;
    this.totalQuestions += 1;

    if (this.isCorrectAnswer(answer)) {
      this.correctAnswers += 1;
      this.message = '¡Correcto!';
    } else {
      this.message = 'Incorrecto. Intenta de nuevo.';
    }

    setTimeout(() => {
      this.loadQuestion();
    },1000);
  }

  isCorrectAnswer(answer: string): boolean {
    return answer == this.correctAnswer;
  }

  getRandomPokemonId() {
    return Math.floor(Math.random() * 650) + 1;
  }

  async getNames() {
    for (let i = 1; i < 4; i++) {
      let optionId = this.getRandomPokemonId();

      while(!this.optionsId.includes(optionId)){
        this.optionsId.push(optionId);
      }

      const data = await this.preguntadosService.getQuestion(this.optionsId[i]);
      this.chargeAnswers.push(data.name);
    }

    this.shuffleArray(this.chargeAnswers);
    for (let i = 0; i < 4; i++) {
      this.answers.push(this.chargeAnswers[i]);
    }  
  }

  shuffleArray(array:string[]) {
    return array.sort(() => Math.random() - 0.5);
  }
}
