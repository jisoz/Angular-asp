import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegsterComponent } from './user-regster.component';

describe('UserRegsterComponent', () => {
  let component: UserRegsterComponent;
  let fixture: ComponentFixture<UserRegsterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserRegsterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserRegsterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
