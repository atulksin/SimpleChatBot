import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

@Component({
  selector: 'app-chatbot',
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.css',
})
export class Chatbot {
  protected messages = signal<Message[]>([
    {
      text: 'Hello! I\'m a simple chatbot. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  protected userInput = signal('');

  sendMessage(): void {
    const input = this.userInput().trim();
    if (!input) return;

    // Add user message
    this.messages.update(msgs => [...msgs, {
      text: input,
      sender: 'user',
      timestamp: new Date()
    }]);

    // Clear input
    this.userInput.set('');

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse = this.generateBotResponse(input);
      this.messages.update(msgs => [...msgs, {
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }]);
    }, 500);
  }

  private generateBotResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return 'Hello! Nice to meet you!';
    } else if (lowerMessage.includes('how are you')) {
      return 'I\'m doing well, thank you for asking! How can I assist you?';
    } else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
      return 'Goodbye! Have a great day!';
    } else if (lowerMessage.includes('help')) {
      return 'I\'m a simple chatbot. You can say hello, ask how I am, or just chat with me!';
    } else if (lowerMessage.includes('name')) {
      return 'I\'m SimpleChatBot, a basic chatbot ready to chat!';
    } else {
      return 'I understand you said: "' + userMessage + '". I\'m a simple chatbot and currently don\'t connect to any AI source, but I\'m here to chat!';
    }
  }

  handleKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}
