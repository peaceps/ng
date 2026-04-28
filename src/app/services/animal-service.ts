import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class AnimalService {
    private name = 'animal';

    getName() {
        return this.name;
    }
}