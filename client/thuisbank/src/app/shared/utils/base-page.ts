import {ComponentFixture} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";

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
