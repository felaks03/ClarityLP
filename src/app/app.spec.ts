import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { App } from './app';

describe('App (root)', () => {
  let fixture: ComponentFixture<App>;
  let component: App;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render all main sections', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('app-navbar')).toBeTruthy();
    expect(el.querySelector('app-hero')).toBeTruthy();
    expect(el.querySelector('app-features')).toBeTruthy();
    expect(el.querySelector('app-roadmap')).toBeTruthy();
    expect(el.querySelector('app-cta')).toBeTruthy();
    expect(el.querySelector('app-footer')).toBeTruthy();
  });
});
