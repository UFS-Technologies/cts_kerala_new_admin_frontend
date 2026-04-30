import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Applied_CandidateComponent } from './Applied_Candidate.component';
describe('Applied_CandidateComponent', () => {
let component: Applied_CandidateComponent;
let fixture: ComponentFixture<Applied_CandidateComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Applied_CandidateComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Applied_CandidateComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

