import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isScrollInvisible = true;
  isCollapsed: boolean;

  @HostListener('window:scroll')
  onScroll() {
    let verticalOffset = window.pageYOffset
      || document.documentElement.scrollTop
      || document.body.scrollTop || 0;

    const screenHeight = window.innerHeight;

    if (verticalOffset > 71) {
      verticalOffset = 71;
    }

    document.documentElement.style.setProperty('--vertical-offset', `-${verticalOffset}px`);
    document.documentElement.style.setProperty('--height', `${screenHeight - 71 + verticalOffset}px`);
  }

  constructor() {
  }

  ngOnInit(): void {
    this.onScroll();
  }
}
