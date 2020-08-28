import { Component, OnInit } from '@angular/core';
import { PreventMoveBackService } from 'src/app/shared/services/prevent-move-back.service';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss']
})
export class DoneComponent implements OnInit {

  constructor(private preventMoveBackService: PreventMoveBackService) { }

  ngOnInit() {
    this.preventMoveBackService.preventBackButton();
  }

}
