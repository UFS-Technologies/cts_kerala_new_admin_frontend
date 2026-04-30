import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Candidate_FollowupComponent } from './Candidate_Followup.component';
describe('Candidate_FollowupComponent', () => {
let component: Candidate_FollowupComponent;
let fixture: ComponentFixture<Candidate_FollowupComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Candidate_FollowupComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Candidate_FollowupComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

