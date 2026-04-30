import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Question_ImportComponent } from './Question_Import.component'
describe('Question_ImportComponent', () => {
let component:Question_ImportComponent;
let fixture: ComponentFixture<Question_ImportComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Question_ImportComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Question_ImportComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

