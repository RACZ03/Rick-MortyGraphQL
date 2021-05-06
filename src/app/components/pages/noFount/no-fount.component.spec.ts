import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoFountComponent } from './no-fount.component';

describe('NoFountComponent', () => {
  let component: NoFountComponent;
  let fixture: ComponentFixture<NoFountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoFountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoFountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
