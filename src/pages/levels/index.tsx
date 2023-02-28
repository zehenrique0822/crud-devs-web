import { AppLoadingProgress, Box, Button, DataGrid, Dialog, LevelFormModal, Toast, Tooltip, type GridColDef } from '@/components'
import { http } from '@/services'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { IconButton, Typography } from '@mui/material'
import { type IDeveloper } from '../developers'
export interface ILevels {
  id?: number
  level?: string
  developers?: number
}

export interface ILevelsData {
  id: number
  level: string
  developers: IDeveloper[]
};

export const Levels = (): JSX.Element => {
  const [levels, setLevels] = useState<ILevels[]>([])
  const [dialog, setDialog] = useState<any>({ open: false })
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingLevelName, setEditingLevelName] = useState<ILevels>()

  const getLevels = async (): Promise<void> => {
    try {
      setLoading(true)
      const { data: response } = await http.get('/levels')
      const levelsFormated = response.data?.map((level: ILevelsData) => {
        return {
          ...level,
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

  const handleModalClose = (): void => {
    setIsModalOpen(false)
  }

  const handleEditLevel = (id?: number, level?: string): void => {
    setIsModalOpen(true)
    console.log(id, level)
    if (level) setEditingLevelName({ id, level })
  }

  const handleConfirm = async (id: number): Promise<void> => {
    try {
      await http.delete(`/levels/${id}`)
      setLevels(prevLevels => prevLevels.filter((level) => level.id !== id))
      Toast({ message: 'Nível removido!', type: 'success' })
    } catch (error: any) {
      const message = error?.response?.data.error ?? 'Erro, tente novamante!'
      Toast({ message, type: 'error' })
    }
  }

  const handleCancel = async (): Promise<void> => {
    setDialog({
      ...dialog,
      open: false
    })
  }

  const handleOpenDialog = (params: any): void => {
    setDialog({
      ...dialog,
      id: params?.row?.id,
      open: true,
      title: 'O nível será removido!',
      message: 'Tem certeza de que deseja remover?',
      handleConfirm,
      handleCancel
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
              gridTemplateColumns: 'repeat(2, 30px)',
              gap: 0.5,
              justifyContent: 'flex-end'
            }}
          >
            <Tooltip title="Editar" >
              <IconButton sx={{
                width: '20px',
                fontSize: '10px'
              }}
                onClick={() => { handleEditLevel(params?.row?.id, params?.row?.level) }}>
                <EditIcon />
              </IconButton>
            </Tooltip>
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
      width: 100
    }
  ]

  const dataGridColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', maxWidth: 70, flex: 1 },
    { field: 'level', headerName: 'Descrição', minWidth: 70, flex: 1 },
    { field: 'developers', headerName: 'Qtd desenvolvedores', minWidth: 70, flex: 1 },
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
          height: '80%',
          width: '700px',
          '@media (max-width: 768px)': {
            flexDirection: 'column',
            width: '95%'
          },
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          marginBottom: '20px',
          justifyContent: 'space-between'
        }}
      >
        <Box p={3}
          flex={1}
          sx={{
            padding: '35px 24px',
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            borderRadius: '10px'
          }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography variant="h5">Listagem de níveis</Typography>
            <Tooltip title="Adicionar" >
              <IconButton sx={{
                width: '25px',
                fontSize: '15px'
              }}
                onClick={() => {
                  setEditingLevelName(undefined)
                  handleEditLevel()
                }}
              >
                <AddCircleIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <div />
          <DataGrid
            columns={dataGridColumns}
            rows={levels ?? []}
          />
        </Box>
      </Box>
      <Link style={{ textDecoration: 'none' }} to="/">
        <Button
          sx={{
            marginTop: '35px',
            maxWidth: '200px'
          }}
          type="button"
          variant="contained"
        >
          VOLTAR
        </Button>
      </Link>
      <Dialog dialog={dialog} setDialog={setDialog} />
      <LevelFormModal
        open={isModalOpen}
        onClose={handleModalClose}
        onSave={setLevels}
        levelName={editingLevelName?.level}
        levelId={editingLevelName?.id}
      />
    </ Box>
  )
}
