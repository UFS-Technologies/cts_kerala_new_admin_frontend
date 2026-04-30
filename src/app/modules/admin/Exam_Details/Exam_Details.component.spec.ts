import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Exam_DetailsComponent } from './Exam_Details.component';
describe('Exam_DetailsComponent', () => {
let component: Exam_DetailsComponent;
let fixture: ComponentFixture<Exam_DetailsComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Exam_DetailsComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Exam_DetailsComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

