import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConferenceImportComponent } from './conference-import.component';

describe('ConferenceImportComponent', () => {
  let component: ConferenceImportComponent;
  let fixture: ComponentFixture<ConferenceImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConferenceImportComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConferenceImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
