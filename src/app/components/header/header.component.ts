import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          (document.querySelector('header') as HTMLHeadElement).classList.add(
            'border-b'
          );
        } else {
          (
            document.querySelector('header') as HTMLHeadElement
          ).classList.remove('border-b');
        }
      });
    }
  }
}
