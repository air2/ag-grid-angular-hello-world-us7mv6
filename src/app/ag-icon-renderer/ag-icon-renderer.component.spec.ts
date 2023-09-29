import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AgIconRendererComponent } from './ag-icon-renderer.component'

describe('AgIconRendererComponent', () => {
  let component: AgIconRendererComponent<unknown>
  let fixture: ComponentFixture<AgIconRendererComponent<unknown>>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgIconRendererComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AgIconRendererComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
