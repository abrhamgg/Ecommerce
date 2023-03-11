import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProudctItemComponent } from './proudct-item.component';

describe('ProudctItemComponent', () => {
  let component: ProudctItemComponent;
  let fixture: ComponentFixture<ProudctItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProudctItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProudctItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
