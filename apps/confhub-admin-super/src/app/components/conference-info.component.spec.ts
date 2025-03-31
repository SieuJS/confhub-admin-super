import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConferenceInfoComponent } from './conference-info.component';

describe('ConferenceInfoComponent', () => {
  let component: ConferenceInfoComponent;
  let fixture: ComponentFixture<ConferenceInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConferenceInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConferenceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
