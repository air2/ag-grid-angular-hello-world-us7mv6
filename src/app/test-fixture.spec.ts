// cSpell: words rowindex

import { AgGridAngular, AgGridModule } from '@ag-grid-community/angular'
import { CommonModule } from '@angular/common'
import { CUSTOM_ELEMENTS_SCHEMA,  DebugElement, ModuleWithProviders, Provider, Type } from '@angular/core'
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { FaIconComponent, FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { RegisterAgGridModules } from './app.module'

export interface IDeclaration {
  declarationType: unknown
}

export interface IImport {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  importType: Type<any> | ModuleWithProviders<{}> | any[];
}

function isProvider (object: IDeclaration | IImport | Provider): object is Provider {
  return (object as IDeclaration).declarationType === undefined &&
   (object as IImport).importType === undefined
}

function isDeclaration (object: IDeclaration | IImport | Provider): object is IDeclaration {
  return (object as IDeclaration).declarationType !== undefined
}
function isImport (object: IDeclaration | IImport | Provider): object is IImport {
  return (object as IImport).importType !== undefined
}

export class AccountServiceFormFixture<T extends { agGrid?: AgGridAngular} | object> {
  public component!: T
  public fixture!: ComponentFixture<T>
  private constructor (private componentInstance: Type<T>, public testbed: TestBed) {
    try {
      jasmine.clock().uninstall()
    } catch (_e) {}

    jasmine.clock().install()
  }

  destroy (): void {
    this.fixture.destroy()
    this.testbed.resetTestingModule()
  }

  static create<T extends { agGrid?: AgGridAngular} | object> (componentInstance: Type<T>, ...extraProviders: (Provider | IImport | IDeclaration)[]): AccountServiceFormFixture<T> {
    return AccountServiceFormFixture.createService(componentInstance, {
      declarationType: componentInstance
    }, {
      importType: RouterTestingModule.withRoutes([
        { path: 'ding/ding', component: componentInstance },
        { path: 'ding/ding/create', component: componentInstance }
      ])
    }, ...extraProviders)
  }

  static createService<T extends { agGrid?: AgGridAngular} | object> (serviceInstance: Type<T>, ...extraProviders: (Provider | IImport | IDeclaration)[]): AccountServiceFormFixture<T> {

    const imports: unknown[] = [CommonModule, FormsModule, ReactiveFormsModule, FontAwesomeModule, AgGridModule, BrowserAnimationsModule]
    extraProviders.filter(isImport).map(item => (item as unknown as IImport).importType).forEach(item => imports.push(item))

    const declarations: unknown[] = [FaIconComponent]
    extraProviders.filter(isDeclaration).map(item => (item as unknown as IDeclaration).declarationType).forEach(item => declarations.push(item))

    const providers: Provider[] = [
      { provide: ComponentFixtureAutoDetect, useValue: true },
      { provide: FaIconLibrary, useClass: FaIconLibrary, multi: false }
]
    extraProviders.filter(isProvider).forEach(item => providers.push(item))

    RegisterAgGridModules()

    const testbed = TestBed.configureTestingModule({
      imports,
      declarations,
      providers,
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      errorOnUnknownElements: true,
      errorOnUnknownProperties: true
    })
    return new AccountServiceFormFixture<T>(serviceInstance, testbed)
  }

  async initService (): Promise<void> {
    await this.testbed.compileComponents()
    this.component = TestBed.inject(this.componentInstance)
  }

  async initComponent (): Promise<void> {
    await this.testbed.compileComponents()
    this.fixture = TestBed.createComponent(this.componentInstance)
    this.component = this.fixture.componentInstance
  }

  async init ():Promise<DebugElement> {
    if (!this.component) { await this.initComponent() }
    await this.detectChanges()
    expect(this.component).toBeDefined()
    return this.fixture.debugElement
  }



  async tick (timeout: number) {
    jasmine.clock().tick(timeout)
    await this.detectChanges()
  }

  public async waitStableRendering (): Promise<void> {
    await Promise.all([
      this.fixture.whenStable(),
      this.fixture.whenRenderingDone()
    ])
  }

  public async detectChanges (): Promise<void> {
    this.fixture.detectChanges()
    await this.waitStableRendering()
  }
}
