import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConferenceImportPageComponent } from './conference-import-page.component';

describe('ConferenceImportPageComponent', () => {
  let component: ConferenceImportPageComponent;
  let fixture: ComponentFixture<ConferenceImportPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConferenceImportPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConferenceImportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
