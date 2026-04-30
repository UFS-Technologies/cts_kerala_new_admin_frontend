import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Agent_Course_TypeComponent } from './Agent_Course_Type.component';
describe('Agent_Course_TypeComponent', () => {
let component: Agent_Course_TypeComponent;
let fixture: ComponentFixture<Agent_Course_TypeComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Agent_Course_TypeComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Agent_Course_TypeComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

