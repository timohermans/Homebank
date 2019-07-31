import {ComponentFixture} from '@angular/core/testing';
import {ImportFileModalComponent} from './import-file-modal.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

export class Page {
  public get closeCross(): HTMLButtonElement {
    return this.fixture.nativeElement.querySelector(
      '[data-test-id="closeCross"]'
    ) as HTMLButtonElement;
  }

  public get importButton(): HTMLButtonElement {
    return this.fixture.nativeElement.querySelector('[data-test-id="import"]') as HTMLButtonElement;
  }

  public get dropArea(): HTMLDivElement {
    return this.fixture.nativeElement.querySelector('[data-test-id="dropArea"]') as HTMLDivElement;
  }

  public get dropAreaLabel(): HTMLDivElement {
    return this.fixture.nativeElement.querySelector(
      '[data-test-id="dropArea"] label'
    ) as HTMLDivElement;
  }

  public get dropAreaWithFileHoveringOver(): HTMLDivElement {
    return this.fixture.nativeElement.querySelector('.is-dragover') as HTMLDivElement;
  }

  public get fileList(): DebugElement[] {
    return this.fixture.debugElement.queryAll(By.css('app-file-item'));
  }

  constructor(private fixture: ComponentFixture<ImportFileModalComponent>) {}
}
