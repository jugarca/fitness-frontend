import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'fitness-example2';
  currentYear = new Date().getFullYear();

  constructor(private translocoService: TranslocoService) {}

  changeLanguage(lang: string) {
    this.translocoService.setActiveLang(lang);
  }

}
