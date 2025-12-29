import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  localSearchTerm: string = '';

  constructor(private router: Router) { }

  onSearch() {
    if (this.localSearchTerm.trim()) {
      this.router.navigate(['/'], { queryParams: { q: this.localSearchTerm } });
    } else {
      this.router.navigate(['/']);
    }
  }
}
