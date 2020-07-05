import { Component } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import $ from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private serverUrl = 'http://localhost:8081/socket';
  private title = 'WebSockets chat';
  private stompClient;

  constructor() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {

    const ws = new SockJS(this.serverUrl);

    this.stompClient = Stomp.over(ws);

    const that = this;

    this.stompClient.connect({}, (frame) => {
      that.stompClient.subscribe('/chat', (message) => {
        if (message.body) {
            $('.chat').append('<div class=\'message\'>' + message.body + '</div>');
        }
      });
    });
  }

  sendMessage(message) {

    this.stompClient.send('/app/send/message' , {}, message);
    $('#input').val('');
  }
}
