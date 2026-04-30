import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Functionl_AreaComponent } from './Functionl_Area.component';
describe('Functionl_AreaComponent', () => {
let component: Functionl_AreaComponent;
let fixture: ComponentFixture<Functionl_AreaComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Functionl_AreaComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Functionl_AreaComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

