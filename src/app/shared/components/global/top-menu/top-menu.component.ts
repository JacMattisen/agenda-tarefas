import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { RouterStateService } from '../../../../core/router/router-state.service';

@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatToolbarModule, RouterLink],
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
})
export class TopMenuComponent implements OnInit, OnDestroy {
  appLogo = 'assets/logo.jpg';

  rotaAtual: string = '';
  inscricaoRota!: Subscription;

  constructor(private routerService: RouterStateService) {}

  ngOnInit(): void {
    this.inscricaoRota = this.routerService.rotaAtual$.subscribe(
      (url: string) => {
        this.rotaAtual = url;
      }
    );
  }

  ngOnDestroy(): void {
    this.inscricaoRota?.unsubscribe();
  }

  isRegisterPage(): boolean {
    return this.rotaAtual.includes('/register');
  }

  isLoginPage(): boolean {
    return this.rotaAtual.includes('/login');
  }
}
