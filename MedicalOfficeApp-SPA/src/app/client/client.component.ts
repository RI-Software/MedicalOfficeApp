import { Component, OnInit, HostListener } from '@angular/core';
import { ClientService } from './services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  @HostListener('window:unload', ['$event'])
  unload($event: any) {
    this.clientService.freeRecord();
  }
  constructor(
     private clientService: ClientService
  ) { }

  ngOnInit() {
  }
}
