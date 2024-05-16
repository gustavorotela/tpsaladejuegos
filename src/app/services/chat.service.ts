import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, query, orderBy, addDoc, Timestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface ChatMessage {
  id?: string;
  mensaje: string;
  timestamp: Timestamp | null;
  usuario: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private chatCollection;

  constructor(private firestore: Firestore) {
    this.chatCollection = collection(this.firestore, 'chat');
  }

  getChats(): Observable<ChatMessage[]> {
    const chatsQuery = query(this.chatCollection, orderBy('timestamp'));
    return collectionData(chatsQuery, { idField: 'id' }) as Observable<ChatMessage[]>;
  }

  async addChat(chat: ChatMessage): Promise<void> {
    try {
      await addDoc(this.chatCollection, {
        ...chat, timestamp: Timestamp.fromDate(new Date())
      });
    } catch (e) {
      console.error(e);
    }
  }
}