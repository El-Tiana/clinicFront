import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMaladieComponent } from './list-maladie.component';

describe('ListMaladieComponent', () => {
  let component: ListMaladieComponent;
  let fixture: ComponentFixture<ListMaladieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMaladieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMaladieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
