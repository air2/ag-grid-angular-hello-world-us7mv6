import { AgGridAngular } from '@ag-grid-community/angular';
import { ColDef } from '@ag-grid-community/core';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

interface IAthlete {
  age: number;
  athlete: string;
  country: string;
  year: number;
  date: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(AgGridAngular)
  public agGrid?: AgGridAngular<IAthlete>;

  public columnDefs: ColDef<IAthlete>[] = [
    {
      field: 'athlete',
      headerName: 'Name',
      cellDataType: false,
    },
    { field: 'age', cellDataType: false },
  ];

  public readonly data: BehaviorSubject<IAthlete[]> = new BehaviorSubject<
    IAthlete[]
  >([]);

  constructor(private http: HttpClient) {
    // this.loadData().catch((error) => {
    //   console.error(error);
    // });
    console.log('loading');
  }

  private async loadData() {
    const data = await firstValueFrom(
      this.http.get<IAthlete[]>(
        'https://www.ag-grid.com/example-assets/olympic-winners.json'
      )
    );
    console.log('data loaded');
    this.data.next(data);
    this.agGrid?.api.refreshClientSideRowModel();
    this.agGrid?.api.redrawRows();
  }
}
