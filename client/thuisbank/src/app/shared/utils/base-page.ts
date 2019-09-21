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

  public elementAt<ElementType>(css: string): ElementType {
    return this.fixture.nativeElement.querySelector(css);
  }

  public elementsAt<ElementType>(css: string): ElementType[] {
    return this.fixture.nativeElement.querySelectorAll(css);
  }

  public componentAt(css: string): DebugElement {
    return this.fixture.debugElement.query(By.css(css));
  }

  public serviceOf(type: any): any {
    return TestBed.get(type) as any;
  }

  public serviceInstance<ST>(type: any): ST {
    return TestBed.get(type) as ST;
  }
}
