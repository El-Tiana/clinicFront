import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOrdonnanceComponent } from './update-ordonnance.component';

describe('UpdateOrdonnanceComponent', () => {
  let component: UpdateOrdonnanceComponent;
  let fixture: ComponentFixture<UpdateOrdonnanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateOrdonnanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOrdonnanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
