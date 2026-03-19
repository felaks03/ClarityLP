import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CtaComponent } from './cta';

describe('CtaComponent', () => {
  let fixture: ComponentFixture<CtaComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CtaComponent);
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render CTA title', () => {
    expect(el.querySelector('.cta-title')?.textContent).toContain('disciplina real');
  });

  it('should render CTA buttons', () => {
    expect(el.querySelector('.btn-primary')).toBeTruthy();
    expect(el.querySelector('.btn-ghost')).toBeTruthy();
  });

  it('should have download button', () => {
    expect(el.querySelector('.btn-primary')?.textContent).toContain('Descargar');
  });
});
