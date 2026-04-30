import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Fees_ReceiptComponent } from './Fees_Receipt.component';
describe('Fees_ReceiptComponent', () => {
let component: Fees_ReceiptComponent;
let fixture: ComponentFixture<Fees_ReceiptComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Fees_ReceiptComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Fees_ReceiptComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

