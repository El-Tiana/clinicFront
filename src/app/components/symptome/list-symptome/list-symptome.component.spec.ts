import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSymptomeComponent } from './list-symptome.component';

describe('ListSymptomeComponent', () => {
  let component: ListSymptomeComponent;
  let fixture: ComponentFixture<ListSymptomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSymptomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSymptomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
