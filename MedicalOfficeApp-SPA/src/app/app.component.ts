import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {select, Store} from '@ngrx/store';
import {Subject} from 'rxjs';
import {selectCurrentLanguage} from './shared/store/selectors/shared.selectors';
import {takeUntil} from 'rxjs/operators';
import {initialState} from './shared/store/reducers/shared.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MedicalOfficeApp-SPA';
  defaultLanguage = initialState.language;

  unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private translate: TranslateService,
    private store: Store
  ) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang(this.defaultLanguage);
  }

  ngOnInit(): void {
    this.store.pipe(
      select(selectCurrentLanguage),
      takeUntil(this.unsubscribe$)
    ).subscribe((language) => {
      this.translate.use(language);
    });
  }
}
