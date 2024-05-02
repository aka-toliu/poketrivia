import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalResultComponent } from './modal-result.component';

describe('ModalResultComponent', () => {
  let component: ModalResultComponent;
  let fixture: ComponentFixture<ModalResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
