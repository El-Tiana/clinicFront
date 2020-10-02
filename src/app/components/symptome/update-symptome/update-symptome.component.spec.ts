import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSymptomeComponent } from './update-symptome.component';

describe('UpdateSymptomeComponent', () => {
  let component: UpdateSymptomeComponent;
  let fixture: ComponentFixture<UpdateSymptomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSymptomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSymptomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
