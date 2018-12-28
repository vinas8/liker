import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  RouterTestingModule
} from '@angular/router/testing';


import { PasswordlessAuthComponent } from './passwordless-auth.component';
import { AppComponent } from '../app.component';

describe('PasswordlessAuthComponent', () => {
  let component: PasswordlessAuthComponent;
  let fixture: ComponentFixture<PasswordlessAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordlessAuthComponent, AppComponent ],
      imports: [
        RouterTestingModule,
        RouterTestingModule.withRoutes([
            {
                path: 'login',
                component: PasswordlessAuthComponent
            }
        ]),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordlessAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
