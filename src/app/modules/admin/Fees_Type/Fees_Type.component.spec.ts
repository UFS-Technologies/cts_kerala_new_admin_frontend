import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Fees_TypeComponent } from './Fees_Type.component';
describe('Fees_TypeComponent', () => {
let component: Fees_TypeComponent;
let fixture: ComponentFixture<Fees_TypeComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Fees_TypeComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Fees_TypeComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

