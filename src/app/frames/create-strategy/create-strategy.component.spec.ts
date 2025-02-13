import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStrategyComponent } from './create-strategy.component';

describe('CreateStrategyComponent', () => {
  let component: CreateStrategyComponent;
  let fixture: ComponentFixture<CreateStrategyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateStrategyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
