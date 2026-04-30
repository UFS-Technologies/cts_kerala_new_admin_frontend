import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Job_PostingComponent } from './Job_Posting.component';
describe('Job_PostingComponent', () => {
let component: Job_PostingComponent;
let fixture: ComponentFixture<Job_PostingComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Job_PostingComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Job_PostingComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

