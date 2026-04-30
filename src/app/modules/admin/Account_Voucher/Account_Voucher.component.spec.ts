import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Account_VoucherComponent } from './Account_Voucher.component';
describe('Account_VoucherComponent', () => {
let component: Account_VoucherComponent;
let fixture: ComponentFixture<Account_VoucherComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Account_VoucherComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Account_VoucherComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

