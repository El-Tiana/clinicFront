import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSymptomeComponent } from './details-symptome.component';

describe('DetailsSymptomeComponent', () => {
  let component: DetailsSymptomeComponent;
  let fixture: ComponentFixture<DetailsSymptomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsSymptomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsSymptomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
