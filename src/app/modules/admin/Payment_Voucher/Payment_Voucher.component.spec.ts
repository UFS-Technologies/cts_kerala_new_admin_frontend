import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Payment_VoucherComponent } from './Payment_Voucher.component';
describe('Payment_VoucherComponent', () => {
let component: Payment_VoucherComponent;
let fixture: ComponentFixture<Payment_VoucherComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Payment_VoucherComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Payment_VoucherComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

