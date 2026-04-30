import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Course_Import_DetailsComponent } from './Course_Import_Details.component';
describe('Course_Import_DetailsComponent', () => {
let component: Course_Import_DetailsComponent;
let fixture: ComponentFixture<Course_Import_DetailsComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Course_Import_DetailsComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Course_Import_DetailsComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

