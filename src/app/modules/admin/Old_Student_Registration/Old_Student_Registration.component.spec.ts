import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Old_Student_RegistrationComponent } from './Old_Student_Registration.component';
describe('Old_Student_RegistrationComponent', () => {
let component: Old_Student_RegistrationComponent;
let fixture: ComponentFixture<Old_Student_RegistrationComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Old_Student_RegistrationComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Old_Student_RegistrationComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

