import { CheckboxSelectionCallback, ColDef } from '@ag-grid-community/core'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons'
import { faRedo, faX, faXmark } from '@fortawesome/free-solid-svg-icons'
import { ChooseIconsFunction, IIconItem, IsDisabledFunction } from './ag-icon-renderer/ag-icon-renderer.component'

export function getIdColumn<RowDataType> (icon: IconDefinition | IIconItem | ChooseIconsFunction<RowDataType>, isDisabled?: IsDisabledFunction<RowDataType>, checkboxSelection?: boolean | CheckboxSelectionCallback<RowDataType>): ColDef<RowDataType> {
  let icons: IIconItem[] = []
  let chooseIcons: ChooseIconsFunction<RowDataType> | undefined
  if ('icon' in icon) {
    icons = [{ iconDef: icon, iconClass: 'text-primary' }]
  } else if ('iconDef' in icon) {
    icons = [icon]
  } else {
    chooseIcons = icon
  }
  const result:ColDef<RowDataType> = {
    cellRenderer: 'iconRenderer',
    checkboxSelection,
    cellRendererParams: {
      icons,
      chooseIcons,
      isDisabled
    }
  }
  return result
}

export const numberColumn = {
  width: 100,
  filter: 'agNumberColumnFilter'
}

export const groupColumn = {
  width: 100,
  showRowGroup: true,
  cellRenderer: 'AgGroupRendererComponent'
}

// sv-SE (sweden) uses ISO-8601 date format

const dateTimeFormatter = new Intl.DateTimeFormat('sv-SE', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
})


function getYearMonthWithZero (value: string): string {
  if (value.length < 7) {
    if (value.length < 6) {
      return value
    }
    return value.substring(0, 5) + '0' + value[5]
  }
  return value
}


export const booleanColumn: ColDef = {
  cellRenderer: 'iconRenderer',
  cellDataType: 'boolean',
  cellRendererParams: {
    icons: [{ iconDef: faCheckSquare, iconClass: 'text-primary' }],
    showValue: () => { return false },
    showIcon: (_rowData: unknown, formattedValue?: string | boolean) => {
      return formattedValue === 'true' || formattedValue === true
    }
  },
  width: 50
}

export const asyncBooleanColumn: ColDef = {
  cellRenderer: 'iconRenderer',
  cellRendererParams: {
    icons: [{ iconDef: faCheckSquare, iconClass: 'text-danger' }, { iconDef: faRedo, iconClass: 'text-info' }, { iconDef: faX, iconClass: 'text-success' }],
    chooseIcons: (_rowData: unknown, formattedValue?: string | boolean) => {
      switch (formattedValue) {
        case true:
        case 'true':
          return [{ iconDef: faCheckSquare, iconClass: 'text-success' }]

        case false:
        case 'false':
          return [{ iconDef: faX, iconClass: 'text-danger' }]

        case undefined:
        case 'loading':
          return [{ iconDef: faRedo, iconClass: 'text-info', spin: true }]

        default:
          console.error(`Unsupported value ${formattedValue}`)
      }
    },
    showValue: () => { return false }
  },
  width: 50
}

export const urlColumn: ColDef = {
  cellRenderer: 'urlRenderer'
}

export const versionColumn: ColDef = {
  cellRenderer: 'iconRenderer',
  cellRendererParams: {
    icons: [{ iconDef: faCheckSquare, iconClass: 'text-primary' }, { iconDef: faXmark, iconClass: 'text-danger' }],
    chooseIcons: (_rowData: unknown, formattedValue: boolean) => {
      return formattedValue !== true && formattedValue !== false
        ? [{ iconDef: faXmark, iconClass: 'text-danger' }]
        : [{ iconDef: faCheckSquare, iconClass: 'text-primary' }]
    },
    showValue: (_rowData: unknown, _formattedValue: boolean) => {
      return false
    },
    showIcon: (_rowData: unknown, formattedValue: boolean) => {
      return !!formattedValue
    }
  },
  width: 120
}

export const asyncTextColumn: ColDef = {
  cellRenderer: 'iconRenderer',
  cellRendererParams: {
    icons: [{ iconDef: faRedo, iconClass: 'text-info' }],
    chooseIcons: (_rowData: unknown, formattedValue: string | boolean) => {
      return typeof formattedValue === 'string'
        ? []
        : [{ iconDef: faRedo, iconClass: 'text-info', spin: true }]
    },
    showValue: (_rowData: unknown, formattedValue: string | boolean) => {
      return typeof formattedValue === 'string'
    },
    showIcon: (_rowData: unknown, formattedValue: string | boolean) => {
      return typeof formattedValue !== 'string'
    }
  },
  width: 50
}

export const copyTextColumn: ColDef = {
  cellRenderer: 'copyRenderer'
}

export const columnTypesObject = {
  urlColumn,
  numberColumn,
  booleanColumn,
  asyncBooleanColumn,
  asyncTextColumn,
  versionColumn,
  copyTextColumn
}

export type ColumnTypesBase = keyof typeof columnTypesObject
