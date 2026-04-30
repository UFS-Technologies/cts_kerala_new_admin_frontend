import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Question_Import_MasterComponent } from './Question_Import_Master.component';
describe('Question_Import_MasterComponent', () => {
let component: Question_Import_MasterComponent;
let fixture: ComponentFixture<Question_Import_MasterComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Question_Import_MasterComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Question_Import_MasterComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

