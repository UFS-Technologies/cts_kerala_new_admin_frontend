import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Home_PageComponent } from './Home_Page.component';
describe('Home_PageComponent', () => {
let component: Home_PageComponent;
let fixture: ComponentFixture<Home_PageComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Home_PageComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Home_PageComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

