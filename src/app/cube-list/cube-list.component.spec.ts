import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CubeListComponent } from './cube-list.component';

describe('CubeListComponent', () => {
  let component: CubeListComponent;
  let fixture: ComponentFixture<CubeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CubeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CubeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
