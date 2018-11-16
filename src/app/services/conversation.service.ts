import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private angularFireDataBase: AngularFireDatabase) { }

  createConversation(conversation) {
    return this.angularFireDataBase.object('conversation/' + conversation.uid + '/' + conversation.timestamp).set(conversation)
  }

  getConversation(uid) {
    return this.angularFireDataBase.list('conversation/' + uid)
  }

}
