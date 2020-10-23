import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {select, Store} from '@ngrx/store';
import {setLanguage} from '../../../shared/store/actions/shared.actions';
import {Subject} from 'rxjs';
import {selectCurrentLanguage} from '../../../shared/store/selectors/shared.selectors';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-language-picker',
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.scss']
})
export class LanguagePickerComponent implements OnInit {
  currentLanguage: string;
  unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private translateService: TranslateService,
    private store: Store) {
  }

  ngOnInit(): void {
    this.store.pipe(
      select(selectCurrentLanguage),
      takeUntil(this.unsubscribe$)
    ).subscribe((language) => {
      this.currentLanguage = language;
    });
  }

  onLanguagePick(language: string) {
    this.store.dispatch(setLanguage({language}));
  }
}
