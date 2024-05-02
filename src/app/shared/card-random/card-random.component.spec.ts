import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRandomComponent } from './card-random.component';

describe('CardRandomComponent', () => {
  let component: CardRandomComponent;
  let fixture: ComponentFixture<CardRandomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardRandomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardRandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
