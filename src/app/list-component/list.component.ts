import { AgGridAngular } from '@ag-grid-community/angular';
import { ColDef, GetRowIdParams } from '@ag-grid-community/core';
import { HttpClient } from '@angular/common/http';
import { Component, Injectable, Input, ViewChild } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { AgGroupRendererComponent, IAgGroupRendererParams } from '../ag-group-renderer/ag-group-renderer.component';
import { AgIconRendererComponent, IIconItem } from '../ag-icon-renderer/ag-icon-renderer.component';
import { faServer } from '@fortawesome/free-solid-svg-icons';
import { columnTypesObject } from '../grid-column-types';

export interface IAthlete {
    id: number,
    age: number;
    athlete: string;
    country?: string;
    year?: number;
    date?: string;
    sport?: string;
    gold?: number;
    silver?: number;
    bronze?: number;
    total?: number;
}

const idIcon = (rowData?: IAthlete, formattedValue?: unknown): IIconItem[] => {
    return [{
        iconDef: faServer,
        iconClass: 'text-success'
    }]
}
const icons: IIconItem[] = []


@Injectable({
    providedIn: 'root'
  })
export class DataService {
    constructor(private http: HttpClient) { }
    async loadData() {
        return await firstValueFrom(
            this.http.get<IAthlete[]>(
                'https://www.ag-grid.com/example-assets/olympic-winners.json'
            )
        );
    }
}
@Component({
    selector: 'my-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent {
    @ViewChild(AgGridAngular)
    public agGrid?: AgGridAngular<IAthlete>;
    columnTypes = {
        ...columnTypesObject,
    }

    public frameworkComponents = {
        iconRenderer: AgIconRendererComponent<IAthlete>,
        groupRenderer: AgGroupRendererComponent<IAthlete>
    }

    public columnDefs: ColDef<IAthlete>[] = [
        {
            cellRenderer: 'groupRenderer',
            headerName: 'Athlete',
            minWidth: 220,
            colId: 'Athlete',
            cellRendererParams: {
                icons,
                chooseIcons: idIcon,
                valueFormatter: (node, data) => {
                    return data?.id.toString()
                }
            } as IAgGroupRendererParams<IAthlete>
        },
        {
            colId: 'SubscriptionId',
            headerName: 'Subscription',
            rowGroup: true,
            hide: true,
            aggFunc: 'first',
            valueGetter: (columnDefinition) => {
                return columnDefinition.data ? columnDefinition.data.athlete : undefined
            }
        },
        {
            field: 'athlete',
            headerName: 'Name',
            aggFunc: 'first'
        },
        { field: 'age', aggFunc: 'first' },
    ];

    public readonly data: BehaviorSubject<IAthlete[]> = new BehaviorSubject<
        IAthlete[]
    >([]);

    constructor(private http: DataService) {
    }

    getRowId(value: GetRowIdParams<IAthlete>): string {
        return value.data.id.toString()
    }

    private _customerId?: string

    @Input()
    public get customerId(): string | undefined { return this._customerId }

    public set customerId(value: string | undefined) {
        this._customerId = value
        void this.refresh()
    }

    private async getData() {
        const data = await this.http.loadData();
        console.log('data loaded');
        for (let index = 0; index < data.length; index++) {
            data[index].id = index

        }
        return data
    }

    private removeLoadingOverlay() {
        const data = this.data.getValue()
        if (!data || data.length === 0) {
            this.agGrid?.api.showNoRowsOverlay()
        } else {
            this.agGrid?.api.hideOverlay()
        }
    }

    public ngAfterViewInit (): void {
       this.agGrid?.api.showLoadingOverlay()
    }

    private async loadGridData(): Promise<void> {
        try {
            this.data.next(await this.getData())
            this.agGrid?.api.refreshClientSideRowModel()
            this.agGrid?.api.redrawRows()
        } catch (error) {
            console.error(error)
        } finally {
            this.removeLoadingOverlay()
        }
    }

    public async refresh(): Promise<void> {
        await this.loadGridData()
    }
}
