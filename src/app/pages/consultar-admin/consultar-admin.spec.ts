import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarAdmin } from './consultar-admin';

describe('ConsultarAdmin', () => {
  let component: ConsultarAdmin;
  let fixture: ComponentFixture<ConsultarAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
