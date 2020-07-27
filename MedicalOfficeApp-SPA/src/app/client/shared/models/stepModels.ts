import { Type } from '@angular/core';
import { Route } from '@angular/router';
import { TimeComponent } from 'src/app/client/components/time/time.component';
import { AgreementsComponent } from 'src/app/client/components/agreements/agreements.component';
import { SaveComponent } from 'src/app/client/components/save/save.component';
import { DoneComponent } from 'src/app/client/components/done/done.component';
import { DataComponent } from 'src/app/client/components/data/data.component';

export class Step {
  route: Route;
  displayName: string;
  iconName: string;

  constructor( routeName: string, routeComponent: Type<any>, displayName: string, iconName: string) {
    this.route = new RouteInstance(routeName, routeComponent);
    this.displayName = displayName;
    this.iconName = iconName;
  }
}

export class RouteInstance implements Route {
  path: string;
  component: Type<any>;

  constructor(path: string, component: Type<any>) {
    this.path = path;
    this.component = component;
  }
}

export const steps: Step[] = [
  new Step('time', TimeComponent, 'Time', 'clock-circle'),
  new Step('data', DataComponent, 'Data', 'solution'),
  new Step('agreements', AgreementsComponent, 'Agreements', 'file-text'),
  new Step('save', SaveComponent, 'Save', 'save'),
  new Step('done', DoneComponent, 'Done', 'check'),
];
