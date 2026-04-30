import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { User_RoleComponent } from './User_Role.component';
describe('User_RoleComponent', () => {
let component: User_RoleComponent;
let fixture: ComponentFixture<User_RoleComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ User_RoleComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(User_RoleComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

