import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Followup_TypeComponent } from './Followup_Type.component';
describe('Followup_TypeComponent', () => {
let component: Followup_TypeComponent;
let fixture: ComponentFixture<Followup_TypeComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Followup_TypeComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Followup_TypeComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

