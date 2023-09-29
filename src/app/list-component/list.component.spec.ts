import { ActivatedRoute } from '@angular/router'
import { AccountServiceFormFixture } from '../test-fixture.spec'
import { ListComponent,  DataService, IAthlete } from './list.component'
import { AgGroupRendererComponent } from '../ag-group-renderer/ag-group-renderer.component'
import { AgIconRendererComponent } from '../ag-icon-renderer/ag-icon-renderer.component'



describe('BackupListComponent', () => {
    let fixture: AccountServiceFormFixture<ListComponent>

    const backup1: IAthlete = {
        id: 1,
        athlete: 'Auke Bruinsma',
        age: 42
    }

    const backup2: IAthlete = {
        id: 2,
        athlete: 'Auke Bruinsma',
        age: 42
    }

    let dataService: jasmine.SpyObj<DataService>
    beforeEach(async () => {
        dataService = jasmine.createSpyObj<DataService>(['loadData'])
        dataService.loadData.and.callFake(() => Promise.resolve([backup1, backup2]))

    fixture = AccountServiceFormFixture.create(ListComponent,
        { provide: DataService, useValue: dataService },

            { declarationType: AgGroupRendererComponent },
            { declarationType: AgIconRendererComponent },
            { declarationType: AgIconRendererComponent },
            { declarationType: AgIconRendererComponent },
            { declarationType: AgGroupRendererComponent }
        )
    await fixture.initComponent()
    fixture.component.customerId = 'c-two'
    await fixture.init()
    await fixture.detectChanges()
  })

    afterEach(() => {
        fixture?.destroy()

        //this is causing the test to fail!!
        jasmine.clock().tick(300)
    })

    it('expect the correct backup data in the grid', async () => {
        expect(dataService.loadData).toHaveBeenCalledTimes(1)
    })
})
