import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MahabharathaContentComponent } from './mahabharatha-content.component';

describe('MahabharathaContentComponent', () => {
  let component: MahabharathaContentComponent;
  let fixture: ComponentFixture<MahabharathaContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MahabharathaContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MahabharathaContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
