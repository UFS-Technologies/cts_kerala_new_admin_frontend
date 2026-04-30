import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Student_Course_SubjectComponent } from './Student_Course_Subject.component';
describe('Student_Course_SubjectComponent', () => {
let component: Student_Course_SubjectComponent;
let fixture: ComponentFixture<Student_Course_SubjectComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Student_Course_SubjectComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Student_Course_SubjectComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

