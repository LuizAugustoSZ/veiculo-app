import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriarveiculoPage } from './criarveiculo.page';

describe('CriarveiculoPage', () => {
  let component: CriarveiculoPage;
  let fixture: ComponentFixture<CriarveiculoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarveiculoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
