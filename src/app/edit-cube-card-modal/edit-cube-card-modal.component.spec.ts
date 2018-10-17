import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCubeCardDialog } from './edit-cube-card-modal.component';

describe('EditCubeCardModalComponent', () => {
  let component: EditCubeCardDialog;
  let fixture: ComponentFixture<EditCubeCardDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCubeCardDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCubeCardDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
