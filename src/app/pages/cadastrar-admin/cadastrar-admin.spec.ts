import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarAdmin } from './cadastrar-admin';

describe('CadastrarAdmin', () => {
  let component: CadastrarAdmin;
  let fixture: ComponentFixture<CadastrarAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
