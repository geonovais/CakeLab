import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarAdmin } from './alterar-admin';

describe('AlterarAdmin', () => {
  let component: AlterarAdmin;
  let fixture: ComponentFixture<AlterarAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlterarAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlterarAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
