import { Box } from '@/components'
import { DataGrid as DataGridMui, type GridColDef as GridColDefMui, GridLinkOperator, type GridRowsProp as GridRowsPropMui, GridToolbarQuickFilter, ptBR } from '@mui/x-data-grid'

export type GridRowsProp = GridRowsPropMui
export type GridColDef = GridColDefMui

export interface DataGridProps {
  rows: GridRowsProp
  columns: GridColDef[]
  hideFooter?: boolean
  autoHeight?: boolean
}

const QuickSearchToolbar = (): JSX.Element => {
  return (
    <Box sx={{ p: 0.5, pb: 0, border: 'gray' }}>
      <GridToolbarQuickFilter fullWidth placeholder={'Pesquisar'} />
    </Box>
  )
}

export const DataGrid = ({ rows, columns, hideFooter = false, autoHeight = false }: DataGridProps): JSX.Element => {
  return (
    <DataGridMui

      sx={{
        '& .MuiDataGrid-columnSeparator': {
          visibility: 'hidden'
        }
      }}

      disableColumnMenu
      rows={rows}
      columns={columns}
      autoHeight={autoHeight}
      style={{ border: 0 }}
      hideFooter={hideFooter}
      localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
      isRowSelectable={() => false}
      initialState={{
        filter: {
          filterModel: {
            items: [
              { columnField: 'name' }
            ],
            quickFilterLogicOperator: GridLinkOperator.And,
            linkOperator: GridLinkOperator.And
          }
        }
      }}
      components={{ Toolbar: QuickSearchToolbar }}
    />
  )
}
