import { Component, signal, inject, InjectionToken } from '@angular/core';
import { AnimalService } from './services/animal-service';

const ANIMAL_TOKEN = new InjectionToken<string>('ANIMAL_TOKEN');
const CAT_TOKEN = new InjectionToken<string>('CAT_TOKEN');


@Component({
  selector: 'cat',
  template: `<div>{{ a }}</div>|<div>{{ cat }}</div>`,
  providers: [
    { provide: CAT_TOKEN, useValue: 'cat' },
  ],
  viewProviders: [
    { provide: CAT_TOKEN, useValue: 'viewCat' },
  ]
})
class Cat {
    a = '';
    cat = '';
    constructor() {
        this.a = inject(ANIMAL_TOKEN, {skipSelf: true, host: true, optional: true}) || 'no animal';
        this.cat = inject(CAT_TOKEN, {skipSelf: true, host: true, optional: true}) || 'no cat';
    }
}
@Component({
  selector: 'animal',
  imports: [Cat],
  template: `<cat/> <br/> <ng-content></ng-content>`,
  providers: [
    // { provide: ANIMAL_TOKEN, useValue: 'animal' }
  ],
  viewProviders: [
    // { provide: ANIMAL_TOKEN, useValue: 'viewAnimal' }
  ]
})
class Animal {
    name = '';
    constructor() {
        this.name = inject(ANIMAL_TOKEN, {optional: true}) || 'no animal';
    }
}

@Component({
  selector: 'app-root',
  imports: [Animal, Cat],
  template: '<animal><cat/></animal>',
  styleUrl: './app.css',
  providers: [{ provide: ANIMAL_TOKEN, useValue: 'Ranimal' }],
  viewProviders: [{ provide: ANIMAL_TOKEN, useValue: 'RVanimal' }],
})
export class App {
  protected readonly title = signal('ng');
}