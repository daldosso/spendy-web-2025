import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ChatComponent {
  userMessage = '';
  chatHistory: { role: string; content: string }[] = [];

  constructor(private chatService: ChatService) {}

  sendMessage(): void {
    if (!this.userMessage.trim()) return;

    this.chatHistory.push({ role: 'user', content: this.userMessage });

    this.chatService.sendMessage(this.userMessage).subscribe(response => {
      this.chatHistory.push({ role: 'bot', content: response.reply });
    });

    this.userMessage = '';
  }
}
