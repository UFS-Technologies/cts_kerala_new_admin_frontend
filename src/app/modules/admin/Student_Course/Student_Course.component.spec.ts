import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Student_CourseComponent } from './Student_Course.component';
describe('Student_CourseComponent', () => {
let component: Student_CourseComponent;
let fixture: ComponentFixture<Student_CourseComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Student_CourseComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Student_CourseComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

