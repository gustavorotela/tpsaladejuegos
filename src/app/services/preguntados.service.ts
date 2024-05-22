import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntadosService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon/';  // Reemplaza con tu API real

  constructor(private http: HttpClient) {}

  async getQuestion(pokemonId:number) {
    const response = await fetch(this.apiUrl+pokemonId);
    const data = await response.json();
    return data;
  }
}
