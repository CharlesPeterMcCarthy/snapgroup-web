import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSnapsComponent } from './view-snaps.component';

describe('ViewSnapsComponent', () => {
  let component: ViewSnapsComponent;
  let fixture: ComponentFixture<ViewSnapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSnapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSnapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
