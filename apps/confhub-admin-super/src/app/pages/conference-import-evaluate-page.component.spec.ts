import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConferenceImportEvaluatePageComponent } from './conference-import-evaluate-page.component';

describe('ConferenceImportEvaluatePageComponent', () => {
  let component: ConferenceImportEvaluatePageComponent;
  let fixture: ComponentFixture<ConferenceImportEvaluatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConferenceImportEvaluatePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConferenceImportEvaluatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
