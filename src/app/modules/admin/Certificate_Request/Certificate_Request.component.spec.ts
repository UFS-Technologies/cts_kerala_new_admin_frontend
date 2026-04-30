import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Certificate_RequestComponent } from './Certificate_Request.component';
describe('Certificate_RequestComponent', () => {
let component: Certificate_RequestComponent;
let fixture: ComponentFixture<Certificate_RequestComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Certificate_RequestComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Certificate_RequestComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

