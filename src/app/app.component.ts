import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'fitness-example2';
  currentYear = new Date().getFullYear();

  constructor(private translocoService: TranslocoService, private router: Router) {}

  changeLanguage(lang: string) {
    this.translocoService.setActiveLang(lang);
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  verPerfil(){
    this.router.navigate(['/usuario-perfil']);
  }

}
