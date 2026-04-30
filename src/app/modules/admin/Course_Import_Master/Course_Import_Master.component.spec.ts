import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Course_Import_MasterComponent } from './Course_Import_Master.component';
describe('Course_Import_MasterComponent', () => {
let component: Course_Import_MasterComponent;
let fixture: ComponentFixture<Course_Import_MasterComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Course_Import_MasterComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Course_Import_MasterComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

