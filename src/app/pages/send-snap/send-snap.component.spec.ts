import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendSnapComponent } from './send-snap.component';

describe('SendSnapComponent', () => {
  let component: SendSnapComponent;
  let fixture: ComponentFixture<SendSnapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendSnapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendSnapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
