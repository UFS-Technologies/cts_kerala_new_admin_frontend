import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Candidate_Job_ApplyComponent } from './Candidate_Job_Apply.component';
describe('Candidate_Job_ApplyComponent', () => {
let component: Candidate_Job_ApplyComponent;
let fixture: ComponentFixture<Candidate_Job_ApplyComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Candidate_Job_ApplyComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Candidate_Job_ApplyComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

