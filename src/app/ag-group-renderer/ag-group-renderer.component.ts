import { IRowNode } from '@ag-grid-community/core'
import { Component } from '@angular/core'
import { RotateProp } from '@fortawesome/fontawesome-svg-core'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { AgIconRendererComponent, IAgIconRendererParams } from '../ag-icon-renderer/ag-icon-renderer.component'

export interface IAgGroupRendererParams<TData> extends IAgIconRendererParams<TData> {
  valueFormatter(node: IRowNode<TData>, data: TData | undefined): string
}

@Component({
  selector: 'app-ag-group-renderer',
  templateUrl: './ag-group-renderer.component.html',
  styleUrls: ['./ag-group-renderer.component.scss']
})
export class AgGroupRendererComponent<TData> extends AgIconRendererComponent<TData> {
  public params?: IAgGroupRendererParams<TData>
  public paddingLeft!: number
  public isGroup!: boolean
  public rotation?: RotateProp

  public rowIcon = faChevronRight

  agInit (params: IAgGroupRendererParams<TData>): void {
    super.agInit(params)
    this.params = params
    this.rowData = params.data
    this.paddingLeft = params.node.level * 15
    this.isGroup = !!params.node.group
    this.setExpand(params.node.expanded)

    this.params.node.addEventListener('expandedChanged', this.onExpand)
    this.formattedValue = params.valueFormatter(params.node, params.data)
  }

  private setExpand (value: boolean) {
    this.rotation = value ? 90 : undefined
  }

  refresh (params: IAgGroupRendererParams<TData>) {
    return super.refresh(params)
  }

  destroy () {
    this.params?.node.removeEventListener('expandedChanged', this.onExpand)
  }

  onClick () {
    this.params?.node.setExpanded(!this.params.node.expanded)
  }

  private onExpand = () => {
    this.setExpand(!!this.params?.node.expanded)
  }
}
