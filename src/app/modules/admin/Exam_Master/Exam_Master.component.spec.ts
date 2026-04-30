import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Exam_MasterComponent } from './Exam_Master.component';
describe('Exam_MasterComponent', () => {
let component: Exam_MasterComponent;
let fixture: ComponentFixture<Exam_MasterComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Exam_MasterComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Exam_MasterComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

