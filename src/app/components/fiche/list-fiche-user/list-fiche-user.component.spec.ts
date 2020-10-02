import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFicheUserComponent } from './list-fiche-user.component';

describe('ListFicheUserComponent', () => {
  let component: ListFicheUserComponent;
  let fixture: ComponentFixture<ListFicheUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFicheUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFicheUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
