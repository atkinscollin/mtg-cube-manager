import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadPathComponent } from './bad-path.component';

describe('BadPathComponent', () => {
  let component: BadPathComponent;
  let fixture: ComponentFixture<BadPathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadPathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
