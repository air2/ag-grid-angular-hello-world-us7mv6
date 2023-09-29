import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ModuleRegistry } from '@ag-grid-community/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from '@ag-grid-community/angular';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { AppComponent  } from './app.component';
import { FontAwesomeModule  } from '@fortawesome/angular-fontawesome';
import { AgIconRendererComponent } from './ag-icon-renderer/ag-icon-renderer.component';
import { AgGroupRendererComponent } from './ag-group-renderer/ag-group-renderer.component';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { ListComponent, DataService } from './list-component/list.component';

export function RegisterAgGridModules(): void {
  console.log('hoi');
  ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    MenuModule,
    ClipboardModule,
    RowGroupingModule
  ]);
  console.log('doei');
}

RegisterAgGridModules();
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AgGridModule,
    FontAwesomeModule
  ],
  providers:[DataService],
  declarations: [AppComponent, ListComponent, AgIconRendererComponent, AgGroupRendererComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
