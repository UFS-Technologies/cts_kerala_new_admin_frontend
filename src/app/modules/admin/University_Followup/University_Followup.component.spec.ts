import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { University_FollowupComponent } from './University_Followup.component';
describe('University_FollowupComponent', () => {
let component: University_FollowupComponent;
let fixture: ComponentFixture<University_FollowupComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ University_FollowupComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(University_FollowupComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

