import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Course_FeesComponent } from './Course_Fees.component';
describe('Course_FeesComponent', () => {
let component: Course_FeesComponent;
let fixture: ComponentFixture<Course_FeesComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Course_FeesComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Course_FeesComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

