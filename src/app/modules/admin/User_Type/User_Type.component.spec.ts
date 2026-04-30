import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { User_TypeComponent } from './User_Type.component';
describe('User_TypeComponent', () => {
let component: User_TypeComponent;
let fixture: ComponentFixture<User_TypeComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ User_TypeComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(User_TypeComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

