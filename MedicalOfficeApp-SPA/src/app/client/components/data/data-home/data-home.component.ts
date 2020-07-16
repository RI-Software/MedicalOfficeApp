import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-home',
  templateUrl: './data-home.component.html',
  styleUrls: ['./data-home.component.scss'],
})
export class DataHomeComponent implements OnInit {
  currentMode = 'None';

  constructor() {}

  ngOnInit() { }

  cancelRegister(): void {
    this.currentMode = 'None';
  }

  modeToggle(mode: string): void {
    this.currentMode = mode;
  }
}
