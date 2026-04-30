import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Study_MaterialsComponent } from './Study_Materials.component';
describe('Study_MaterialsComponent', () => {
let component: Study_MaterialsComponent;
let fixture: ComponentFixture<Study_MaterialsComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Study_MaterialsComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Study_MaterialsComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

