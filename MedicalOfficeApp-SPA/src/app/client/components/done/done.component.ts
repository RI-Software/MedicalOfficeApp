import { Component, OnInit } from '@angular/core';
import { PreventMoveBackService } from 'src/app/core/services/prevent-move-back.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss'],
})
export class DoneComponent implements OnInit {

  constructor(private preventMoveBackService: PreventMoveBackService) {
  }

  ngOnInit() {
    this.preventMoveBackService.preventBackButton();
  }

  sendToMain() {
    document.location.href = environment.mainPageUrl;
  }
}
