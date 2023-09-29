import { ICellRendererAngularComp } from '@ag-grid-community/angular'
import { ICellRendererParams } from '@ag-grid-community/core'
import { Component, Input } from '@angular/core'
import { FaIconLibrary } from '@fortawesome/angular-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

export interface IIconItem {
  iconDef: IconDefinition
  iconClass?: string,
  spin?: boolean
}

export type IsDisabledFunction<RowDataType> = (rowData: RowDataType, formattedValue?: unknown) => boolean;
export type IsShowFunction<RowDataType> = (rowData?: RowDataType, formattedValue?: unknown) => boolean;
export type ChooseIconsFunction<RowDataType> = (rowData?: RowDataType, formattedValue?: unknown) => IIconItem[];

export interface IAgIconRendererParams<RowDataType> extends ICellRendererParams<RowDataType, string> {
  icons: IIconItem[]
  isDisabled?: IsDisabledFunction<RowDataType>
  showIcon?: IsShowFunction<RowDataType>
  showValue?: IsShowFunction<RowDataType>
  chooseIcons?: ChooseIconsFunction<RowDataType>
}

function returnTrue (_rowData: unknown): boolean { return true }
function returnFalse (_rowData: unknown): boolean { return false }
@Component({
  selector: 'app-ag-icon-renderer',
  templateUrl: './ag-icon-renderer.component.html',
  styleUrls: ['./ag-icon-renderer.component.scss']
})
export class AgIconRendererComponent<RowDataType> implements ICellRendererAngularComp {
  iconItems?: IIconItem[]

  @Input()
  formattedValue = ''

  @Input()
  rowData?: RowDataType

  isDisabled: IsDisabledFunction<RowDataType> = returnFalse
  showIcon: IsShowFunction<RowDataType> = returnTrue
  showValueFunc: IsShowFunction<RowDataType> = returnTrue
  chooseIcons!: ChooseIconsFunction<RowDataType>

  constructor (private library: FaIconLibrary) {}

  refresh (_params: IAgIconRendererParams<RowDataType>): boolean {
    return false
  }

  agInit (params: IAgIconRendererParams<RowDataType>): void {
    const icons = params.icons
    this.library.addIcons(...icons.map(iconItem => iconItem.iconDef))
    this.formattedValue = params.formatValue ? params.formatValue(params.value) : params.value ?? ''
    this.rowData = params.data
    const returnIcons = (_rowData?: RowDataType, _formattedValue?: unknown) => { return icons }
    this.chooseIcons = params.chooseIcons || returnIcons
    this.isDisabled = params.isDisabled || returnFalse
    this.showIcon = params.showIcon || returnTrue
    this.showValueFunc = params.showValue || returnTrue
  }
}
