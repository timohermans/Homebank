import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

export abstract class BasePage<T> {
  constructor(private fixture: ComponentFixture<T>) {}

  protected queryNativeElement<ElementType>(css: string): ElementType {
    return this.fixture.nativeElement.querySelector(css);
  }

  protected queryNativeElements<ElementType>(css: string): ElementType[] {
    return this.fixture.nativeElement.querySelectorAll(css);
  }

  protected queryDebugElement(css: string): DebugElement {
    return this.fixture.debugElement.query(By.css(css));
  }
}

export class PageUtils<T> {
  constructor(private fixture: ComponentFixture<T>) {}

  public get class(): T {
    return this.fixture.componentInstance;
  }

  public updateView(): void {
    this.fixture.detectChanges();
  }

  public buttonAt(css: string): HTMLButtonElement {
    return this.elementAt<HTMLButtonElement>(css);
  }

  public elementAt<ElementType>(css: string): ElementType {
    return this.fixture.nativeElement.querySelector(css);
  }

  public elementsAt<ElementType>(css: string): ElementType[] {
    return this.fixture.nativeElement.querySelectorAll(css);
  }

  public componentAt(css: string): DebugElement {
    return this.fixture.debugElement.query(By.css(css));
  }

  public componentsAt(css: string): DebugElement[] {
    return this.fixture.debugElement.queryAll(By.css(css));
  }

  // @ts-ignore
  public serviceOf(type: any): jest.Mocked<any> {
    // @ts-ignore
    return TestBed.get(type) as jest.Mocked<any>;
  }

  // @ts-ignore
  public serviceInstance<ST>(type: any): jest.Mocked<ST> {
    // @ts-ignore
    return TestBed.get(type) as jest.Mocked<ST>;
  }
}
