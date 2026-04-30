import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Question_Import_DetailsComponent } from './Question_Import_Details.component';
describe('Question_Import_DetailsComponent', () => {
let component: Question_Import_DetailsComponent;
let fixture: ComponentFixture<Question_Import_DetailsComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Question_Import_DetailsComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Question_Import_DetailsComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

