import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, Subscription } from 'rxjs';

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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.rotaAtual = this.router.url;

    this.inscricaoRota = this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event) => {
        this.rotaAtual = event.urlAfterRedirects;
      });
  }

  ngOnDestroy(): void {
    this.inscricaoRota?.unsubscribe();
  }

  isRegisterPage(): boolean {
    return this.rotaAtual.includes('/register');
  }
}
