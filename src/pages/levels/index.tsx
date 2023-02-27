import { AppLoadingProgress, Box, Button, DataGrid, Dialog, Toast, Tooltip, type GridColDef } from '@/components'
import { http } from '@/services'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton } from '@mui/material'
interface ILevels {
  id: number
  level: string
  developers: number
}

interface ILevelsResponse {
  id: number
  level: string
  developers: any[]
};

export const Levels = (): JSX.Element => {
  const [levels, setLevels] = useState<ILevels[]>([])
  const [dialog, setDialog] = useState<any>({ open: false })
  const [loading, setLoading] = useState(false)

  const getLevels = async (): Promise<void> => {
    try {
      setLoading(true)
      const { data: logs } = await http.get('/levels')
      const levelsFormated = logs?.[0]?.map((level: ILevelsResponse) => {
        return {
          id: level.id,
          name: level.level,
          developers: level?.developers?.length
        }
      })
      setLevels(levelsFormated)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenDialog = (params: any): void => {
    setDialog({
      ...dialog,
      id: params?.row?.id,
      open: true,
      title: 'O nível sera removido!',
      message: 'Tem certeza de que deseja remover o nivel?',
      handleConfirm,
      handleCancel
    })
  }

  const handleConfirm = async (id: number): Promise<void> => {
    try {
      await http.delete(`/levels/${id}`)
      setLevels(prevLevels => prevLevels.filter((level) => level.id !== id))
      Toast({ message: 'Nível removido!', type: 'success' })
    } catch (error: any) {
      const message = error?.response?.data.error
      Toast({ message, type: 'error' })
    }
  }

  const handleCancel = async (): Promise<void> => {
    setDialog({
      ...dialog,
      open: false
    })
  }

  const dataGridActions: GridColDef[] = [
    {
      field: 'manager-leves',
      type: 'actions',
      sortable: false,
      headerName: '',
      renderCell: (params: any) => {
        return (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 0.5
            }}
          >
            <Tooltip title="Remover" >
              <IconButton sx={{
                width: '20px',
                fontSize: '10px'
              }}
                onClick={() => { handleOpenDialog(params) }}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )
      },
      align: 'right',
      width: 80
    }
  ]

  const dataGridColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', maxWidth: 100, flex: 1 },
    { field: 'name', headerName: 'Descrição', minWidth: 100, flex: 1 },
    { field: 'developers', headerName: 'Qtd desenvolvedores', minWidth: 100, flex: 1 },
    ...dataGridActions
  ]

  useEffect(() => {
    getLevels()
  }, [])

  if (loading) return <AppLoadingProgress />

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90vh',
        overflowY: 'hidden'
      }} >
      <Box
        sx={{
          height: '669px',
          width: '700px',
          '@media (max-width: 768px)': {
            flexDirection: 'column',
            width: '95%'
          },
          display: 'flex',
          flexDirection: 'column',
          padding: 0
        }}
      >
        <Box p={3}
          flex={1}
          sx={{
            padding: '0 24px',
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            borderRadius: '10px'
          }}>
          <DataGrid
            columns={dataGridColumns}
            rows={levels ?? []}
          />
        </Box>
      </Box>
      <Link style={{ textDecoration: 'none' }} to="/">
        <Button
          sx={{
            marginTop: '10px',
            maxWidth: '200px'
          }}
          type="button"
          variant="contained"
        >
          VOLTAR
        </Button>
      </Link>
      <Dialog dialog={dialog} setDialog={setDialog} />
    </ Box>
  )
}
