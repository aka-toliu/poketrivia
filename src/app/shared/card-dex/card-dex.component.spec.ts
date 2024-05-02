import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDexComponent } from './card-dex.component';

describe('CardDexComponent', () => {
  let component: CardDexComponent;
  let fixture: ComponentFixture<CardDexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardDexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
