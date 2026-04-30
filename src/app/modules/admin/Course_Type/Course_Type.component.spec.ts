import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Course_TypeComponent } from './Course_Type.component';
describe('Course_TypeComponent', () => {
let component: Course_TypeComponent;
let fixture: ComponentFixture<Course_TypeComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Course_TypeComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Course_TypeComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

