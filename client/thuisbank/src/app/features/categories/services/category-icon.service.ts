import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { categoryIcons } from '../models/category-icon.model';

@Injectable({
    providedIn: 'root'
})
export class CategoryIconService {
    private categoryIcons = new BehaviorSubject<string[]>(categoryIcons);

    public get categoryIcons$(): Observable<string[]> {
        return this.categoryIcons.asObservable();
    }

    constructor() { }
}
