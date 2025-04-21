import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule
  ],
  template: `
    <div class="app-container">
      <mat-toolbar color="primary" class="app-toolbar">
        <button mat-icon-button (click)="sidenav.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        <span>Inventory Management System</span>
        <span class="flex-spacer"></span>
      </mat-toolbar>

      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav #sidenav mode="over" class="sidenav">
          <mat-nav-list>
            <a mat-list-item routerLink="/inventory" routerLinkActive="active-link" (click)="sidenav.close()">
              <mat-icon matListItemIcon>inventory_2</mat-icon>
              <span matListItemTitle>Inventory</span>
            </a>
            <a mat-list-item routerLink="/suppliers" routerLinkActive="active-link" (click)="sidenav.close()">
              <mat-icon matListItemIcon>business</mat-icon>
              <span matListItemTitle>Suppliers</span>
            </a>
          </mat-nav-list>
        </mat-sidenav>

        <mat-sidenav-content class="main-content">
          <div class="container">
            <router-outlet></router-outlet>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 10px;
      bottom: 0;
      left: 0;
      right: 0;
    }

    .app-toolbar {
      position: fixed;
      z-index: 2;
    }

    .sidenav-container {
      flex: 1;
      margin-top: 64px;
    }

    .sidenav {
      width: 250px;
    }

    .main-content {
      padding: 16px;
    }

    .active-link {
      background-color: rgba(0, 0, 0, 0.04);
    }

    @media (max-width: 599px) {
      .sidenav-container {
        margin-top: 56px;
      }
    }
  `]
})
export class AppComponent {
  title = 'Inventory Management System';
}