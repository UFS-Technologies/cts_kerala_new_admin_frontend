import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Agent_CommisionComponent } from './Agent_Commision.component';
describe('Agent_CommisionComponent', () => {
let component: Agent_CommisionComponent;
let fixture: ComponentFixture<Agent_CommisionComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Agent_CommisionComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Agent_CommisionComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

