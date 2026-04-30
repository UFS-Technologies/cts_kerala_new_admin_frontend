import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Student_FollowupComponent } from './Student_Followup.component';
describe('Student_FollowupComponent', () => {
let component: Student_FollowupComponent;
let fixture: ComponentFixture<Student_FollowupComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Student_FollowupComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Student_FollowupComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

