import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-language-picker',
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.scss']
})
export class LanguagePickerComponent implements OnInit {

  currentLanguage = 'en';

  constructor(private translateService: TranslateService) {
  }

  ngOnInit(): void {
  }

  onLanguagePick(language: string) {
  }
}
