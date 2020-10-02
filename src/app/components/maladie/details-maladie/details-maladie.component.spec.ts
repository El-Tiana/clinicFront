import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMaladieComponent } from './details-maladie.component';

describe('DetailsMaladieComponent', () => {
  let component: DetailsMaladieComponent;
  let fixture: ComponentFixture<DetailsMaladieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsMaladieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsMaladieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
