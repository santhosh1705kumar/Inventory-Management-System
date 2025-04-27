// // import { Component } from '@angular/core';
// // import { HttpClient } from '@angular/common/http';
// // import { MatButtonModule } from '@angular/material/button';
// // import { MatInputModule } from '@angular/material/input';
// // import { MatCardModule } from '@angular/material/card';
// // import { MatFormFieldModule } from '@angular/material/form-field';
// // import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';  // For spinner
// // import { CommonModule } from '@angular/common';  // CommonModule is required for ngIf and ngFor
// // import { FormsModule } from '@angular/forms';  // For ngModel

// // @Component({
// //   selector: 'app-chat',
// //   standalone: true,
// //   imports: [
// //     CommonModule,
// //     MatButtonModule,
// //     MatInputModule,
// //     MatCardModule,
// //     MatFormFieldModule,
// //     FormsModule,
// //     MatProgressSpinnerModule,  // Import the spinner module
// //   ],
// //   template: `
// //     <mat-card class="chat-container">
// //       <div class="chat-history">
// //         <div *ngFor="let message of chatHistory" [ngClass]="message.sender" class="chat-message">
// //           <strong>{{ message.sender }}:</strong> {{ message.message }}
// //         </div>
// //         <!-- Show a loading spinner if the bot is typing -->
// //         <div *ngIf="isLoading" class="spinner-container">
// //           <mat-spinner diameter="30"></mat-spinner>
// //         </div>
// //       </div>

// //       <div class="chat-input">
// //         <mat-form-field appearance="fill">
// //           <mat-label>Type your message</mat-label>
// //           <input matInput [(ngModel)]="userMessage" placeholder="Type here" [disabled]="isLoading" />
// //         </mat-form-field>

// //         <button mat-raised-button color="primary" (click)="sendMessage()" [disabled]="isLoading">Send</button>
// //       </div>
// //     </mat-card>
// //   `,
// //   styles: [`
// //     .chat-container {
// //       width: 400px;
// //       margin: 50px auto;
// //       padding: 20px;
// //       background-color: #fff;
// //       box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
// //       border-radius: 8px;
// //     }

// //     .chat-history {
// //       max-height: 300px;
// //       overflow-y: auto;
// //       margin-bottom: 10px;
// //       padding-right: 10px;
// //     }

// //     .chat-message {
// //       margin-bottom: 10px;
// //     }

// //     .chat-message.user {
// //       text-align: right;
// //     }

// //     .chat-message.bot {
// //       text-align: left;
// //     }

// //     .chat-input {
// //       display: flex;
// //       justify-content: space-between;
// //       align-items: center;
// //     }

// //     mat-form-field {
// //       width: 70%;
// //     }

// //     button {
// //       width: 25%;
// //       background-color: #000;
// //       color: #fff;
// //     }

// //     button:hover {
// //       background-color: #333;
// //     }

// //     .spinner-container {
// //       display: flex;
// //       justify-content: center;
// //       align-items: center;
// //     }
// //   `]
// // })
// // export class ChatComponent {
// //   userMessage: string = ''; // Store the user's message
// //   chatHistory: { sender: string; message: string }[] = []; // Store the chat history
// //   isLoading: boolean = false; // Track the loading state

// //   constructor(private http: HttpClient) {}

// //   // Send message to the backend
// //   sendMessage(): void {
// //     if (this.userMessage.trim()) {
// //       this.chatHistory.push({ sender: 'user', message: this.userMessage });
// //       this.isLoading = true; // Set loading to true while waiting for the response

// //       // Send message to backend
// //       this.http
// //         .post<string>('http://localhost:3000/search', { query: this.userMessage })
// //         .subscribe(
// //           (response) => {
// //             this.chatHistory.push({ sender: 'bot', message: response });
// //             this.userMessage = ''; // Clear input field
// //             this.isLoading = false; // Reset loading state
// //           },
// //           (error) => {
// //             console.error('Error:', error);
// //             this.chatHistory.push({
// //               sender: 'bot',
// //               message: 'Sorry, something went wrong.',
// //             });
// //             this.isLoading = false; // Reset loading state even on error
// //           }
// //         );
// //     }
// //   }
// // }


// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { MatButtonModule } from '@angular/material/button';
// import { MatInputModule } from '@angular/material/input';
// import { MatCardModule } from '@angular/material/card';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';  // For spinner
// import { CommonModule } from '@angular/common';  // CommonModule is required for ngIf and ngFor
// import { FormsModule } from '@angular/forms';  // For ngModel

// @Component({
//   selector: 'app-chat',
//   standalone: true,
//   imports: [
//     CommonModule,
//     MatButtonModule,
//     MatInputModule,
//     MatCardModule,
//     MatFormFieldModule,
//     FormsModule,
//     MatProgressSpinnerModule,  // Import the spinner module
//   ],
//   template: `
//     <mat-card class="chat-container">
//       <div class="chat-history">
//         <div *ngFor="let message of chatHistory" [ngClass]="message.sender" class="chat-message">
//           <strong>{{ message.sender }}:</strong> {{ message.message }}
//         </div>
//         <!-- Show a loading spinner if the bot is typing -->
//         <div *ngIf="isLoading" class="spinner-container">
//           <mat-spinner diameter="30"></mat-spinner>
//         </div>
//       </div>

//       <div class="chat-input">
//         <mat-form-field appearance="fill">
//           <mat-label>Type your message</mat-label>
//           <input matInput [(ngModel)]="userMessage" placeholder="Type here" [disabled]="isLoading" />
//         </mat-form-field>

//         <button mat-raised-button color="primary" (click)="sendMessage()" [disabled]="isLoading">Send</button>
//       </div>
//     </mat-card>
//   `,
//   styles: [`
//     .chat-container {
//       width: 400px;
//       margin: 50px auto;
//       padding: 20px;
//       background-color: #fff;
//       box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//       border-radius: 8px;
//     }

//     .chat-history {
//       max-height: 300px;
//       overflow-y: auto;
//       margin-bottom: 10px;
//       padding-right: 10px;
//     }

//     .chat-message {
//       margin-bottom: 10px;
//     }

//     .chat-message.user {
//       text-align: right;
//     }

//     .chat-message.bot {
//       text-align: left;
//     }

//     .chat-input {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//     }

//     mat-form-field {
//       width: 70%;
//     }

//     button {
//       width: 25%;
//       background-color: #000;
//       color: #fff;
//     }

//     button:hover {
//       background-color: #333;
//     }

//     .spinner-container {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//     }
//   `]
// })
// export class ChatComponent {
//   userMessage: string = ''; // Store the user's message
//   chatHistory: { sender: string; message: string }[] = []; // Store the chat history
//   isLoading: boolean = false; // Track the loading state

//   constructor(private http: HttpClient) {}

//   // Send message to the backend
//   sendMessage(): void {
//     if (this.userMessage.trim()) {
//       this.chatHistory.push({ sender: 'user', message: this.userMessage });
//       this.isLoading = true; // Set loading to true while waiting for the response

//       // Send message to backend and expect plain text response
//       this.http
//         .post<string>('http://localhost:3000/search', { query: this.userMessage }, { responseType: 'text' as 'json' })
//         .subscribe(
//           (response) => {
//             this.chatHistory.push({ sender: 'bot', message: response });
//             this.userMessage = ''; // Clear input field
//             this.isLoading = false; // Reset loading state
//           },
//           (error) => {
//             console.error('Error:', error);
//             this.chatHistory.push({
//               sender: 'bot',
//               message: 'Sorry, something went wrong.',
//             });
//             this.isLoading = false; // Reset loading state even on error
//           }
//         );
//     }
//   }
// }


import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <mat-card class="chat-container">
      <div class="chat-history">
        <div *ngFor="let message of chatHistory" [ngClass]="message.sender" class="chat-message">
          <div *ngIf="message.sender === 'user'" class="message-user">
            <span>{{ message.message }}</span>
          </div>
          <div *ngIf="message.sender === 'bot'" class="message-bot">
            <span>{{ message.message }}</span>
          </div>
        </div>
        <div *ngIf="isLoading" class="spinner-container">
          <mat-spinner diameter="30"></mat-spinner>
        </div>
      </div>

      <div class="chat-input">
        <mat-form-field appearance="fill">
          <mat-label>Type your message</mat-label>
          <input matInput [(ngModel)]="userMessage" placeholder="Type here..." [disabled]="isLoading" />
        </mat-form-field>

        <button mat-raised-button color="primary" (click)="sendMessage()" [disabled]="isLoading">Send</button>
      </div>
    </mat-card>
  `,
  styles: [`
    .chat-container {
      width: 100%;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      background-color: #f9f9f9;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
      border-radius: 12px;
      display: flex;
      flex-direction: column;
    }

    .chat-history {
      flex-grow: 1;
      overflow-y: auto;
      max-height: 400px;
      margin-bottom: 20px;
      padding: 10px;
    }

    .chat-message {
      margin-bottom: 15px;
      padding: 10px;
      border-radius: 10px;
      max-width: 75%;
    }

    .message-user {
      background-color: #0084ff;
      color: #fff;
      text-align: right;
      margin-left: auto;
      border-radius: 15px 15px 0 15px;
    }

    .message-bot {
      background-color: #e5e5e5;
      color: #333;
      text-align: left;
      border-radius: 15px 15px 15px 0;
    }

    .chat-input {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    mat-form-field {
      flex-grow: 1;
    }

    button {
      padding: 12px 20px;
      background-color: #0078d4;
      color: white;
      font-weight: bold;
      border-radius: 8px;
      transition: background-color 0.3s ease;
    }

    button:hover {
      background-color: #005fa3;
    }

    .spinner-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    @media (max-width: 600px) {
      .chat-container {
        width: 95%;
      }

      button {
        width: 100%;
      }
    }
  `]
})
export class ChatComponent {
  userMessage: string = ''; // Store the user's message
  chatHistory: { sender: string; message: string }[] = []; // Store the chat history
  isLoading: boolean = false; // Track the loading state

  constructor(private http: HttpClient) {}

  // Send message to the backend
  sendMessage(): void {
    if (this.userMessage.trim()) {
      this.chatHistory.push({ sender: 'user', message: this.userMessage });
      this.isLoading = true; // Set loading to true while waiting for the response

      // Send message to backend and expect plain text response
      this.http
        .post<string>('http://localhost:3000/search', { query: this.userMessage }, { responseType: 'text' as 'json' })
        .subscribe(
          (response) => {
            this.chatHistory.push({ sender: 'bot', message: response });
            this.userMessage = ''; // Clear input field
            this.isLoading = false; // Reset loading state
          },
          (error) => {
            console.error('Error:', error);
            this.chatHistory.push({
              sender: 'bot',
              message: 'Sorry, something went wrong.',
            });
            this.isLoading = false; // Reset loading state even on error
          }
        );
    }
  }
}
