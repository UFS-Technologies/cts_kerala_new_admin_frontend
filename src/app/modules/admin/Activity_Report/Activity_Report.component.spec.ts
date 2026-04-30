import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Lead_ReportComponent } from './Lead_Report.component';
describe('Lead_ReportComponent', () => {
let component: Lead_ReportComponent;
let fixture: ComponentFixture<Lead_ReportComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Lead_ReportComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Lead_ReportComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

