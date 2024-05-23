import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPublicationComponent } from './add-publication.component';

describe('IncludeTemplateComponent', () => {
  let component: AddPublicationComponent;
  let fixture: ComponentFixture<AddPublicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPublicationComponent]
    });
    fixture = TestBed.createComponent(AddPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
