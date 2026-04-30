import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Fees_InstalmentComponent } from './Fees_Instalment.component';
describe('Fees_InstalmentComponent', () => {
let component: Fees_InstalmentComponent;
let fixture: ComponentFixture<Fees_InstalmentComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Fees_InstalmentComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Fees_InstalmentComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

