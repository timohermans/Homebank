import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng-mocks';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
jest.mock('@ngx-translate/core');

class Page {
  public get routerOutlet(): RouterOutlet {
    return this.fixture.debugElement.query(By.css('router-outlet')).componentInstance;
  }

  constructor(private fixture: ComponentFixture<AppComponent>) {}
}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let page: Page;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, MockComponent(RouterOutlet)],
      providers: [{ provide: TranslateService, useClass: TranslateService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    page = new Page(fixture);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });

  it('should render pages', () => {
    expect(page.routerOutlet).toBeTruthy();
  });
});
