import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountsComponent } from './Accounts.component';
describe('AccountsComponent', () => {
let component: AccountsComponent;
let fixture: ComponentFixture<AccountsComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ AccountsComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(AccountsComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

