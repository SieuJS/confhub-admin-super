import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConferenceTableComponent } from './conference-table.component';

describe('ConferenceTableComponent', () => {
  let component: ConferenceTableComponent;
  let fixture: ComponentFixture<ConferenceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConferenceTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConferenceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
