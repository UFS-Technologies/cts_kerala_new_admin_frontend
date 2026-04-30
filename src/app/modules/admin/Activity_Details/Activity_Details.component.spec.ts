import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Activity_DetailsComponent } from './Activity_Details.component';
describe('Activity_DetailsComponent', () => {
let component: Activity_DetailsComponent;
let fixture: ComponentFixture<Activity_DetailsComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Activity_DetailsComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Activity_DetailsComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

