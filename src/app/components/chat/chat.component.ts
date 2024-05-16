import { CommonModule, formatDate } from '@angular/common';
import { Component, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ChatService, ChatMessage } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})

export class ChatComponent {
  chats$: Observable<ChatMessage[]>;
  nuevoMensaje: ChatMessage = { mensaje: '', usuario: '', timestamp: null };
  usuario:string = "";

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chats$ = this.chatService.getChats();
    let usuarioLogeado = localStorage.getItem('userLogin');
    this.usuario = usuarioLogeado ?? 'usuario fantasma';
    this.nuevoMensaje.usuario = usuarioLogeado?.valueOf() ?? 'usuario fantasma';
  }

  async grabarMensaje() {
    if (this.nuevoMensaje.mensaje && this.nuevoMensaje.usuario) {
      try {
        await this.chatService.addChat(this.nuevoMensaje);
        this.nuevoMensaje.mensaje = '';
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    }
  }
}
