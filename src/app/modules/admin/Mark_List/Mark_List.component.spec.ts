import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Mark_ListComponent } from './Mark_List.component';
describe('Mark_ListComponent', () => {
let component: Mark_ListComponent;
let fixture: ComponentFixture<Mark_ListComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Mark_ListComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Mark_ListComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

