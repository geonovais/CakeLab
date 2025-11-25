import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcluirAdmin } from './excluir-admin';

describe('ExcluirAdmin', () => {
  let component: ExcluirAdmin;
  let fixture: ComponentFixture<ExcluirAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcluirAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcluirAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
