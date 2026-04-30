import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Course_SubjectComponent } from './Course_Subject.component';
describe('Course_SubjectComponent', () => {
let component: Course_SubjectComponent;
let fixture: ComponentFixture<Course_SubjectComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Course_SubjectComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Course_SubjectComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

