import { AppLoadingProgress, Box, Button, DataGrid, Dialog, Toast, Tooltip, type GridColDef, DeveloperFormModal } from '@/components'
import { http } from '@/services'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { IconButton, Typography } from '@mui/material'
import moment from 'moment'
import { type ILevelsData } from '../levels'

export interface IDeveloper {
  id?: number
  id_level: number
  name: string
  gender: string
  date_birth: Date
  age: number
  hobby: string
}

export const Developers = (): JSX.Element => {
  const [levels, setLevels] = useState<ILevelsData[]>([])
  const [developers, setDevelopers] = useState<IDeveloper[]>([])
  const [dialog, setDialog] = useState<any>({ open: false })
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingDeveloper, setEditingDeveloper] = useState<IDeveloper>()

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

  const getDevelopers = async (): Promise<void> => {
    try {
      setLoading(true)
      const { data: response } = await http.get('/developers')
      setDevelopers(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleModalClose = (): void => {
    setIsModalOpen(false)
  }

  const handleEditDeveloper = (developer?: IDeveloper): void => {
    setIsModalOpen(true)
    setEditingDeveloper(developer)
  }

  const handleConfirm = async (id: number): Promise<void> => {
    try {
      await http.delete(`/developers/${id}`)
      setDevelopers(prevDevelopers => prevDevelopers.filter((developer) => developer.id !== id))
      Toast({ message: 'Desenvolvedor removido!', type: 'success' })
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
      title: 'O desenvolvedor será removido!',
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
                onClick={() => { handleEditDeveloper(params?.row) }}>
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
    { field: 'id', headerName: 'ID', type: 'number', minWidth: 40, flex: 1, align: 'left', headerAlign: 'left' },
    { field: 'name', headerName: 'Nome', minWidth: 70, flex: 3, align: 'left', headerAlign: 'left' },
    { field: 'id_level', headerName: 'Nível', type: 'number', minWidth: 40, flex: 1, align: 'left', headerAlign: 'left', valueFormatter: ({ value }) => levels?.find((level) => level.id === value)?.level },
    { field: 'gender', headerName: 'Sexo', minWidth: 70, flex: 1, align: 'left', headerAlign: 'left', valueFormatter: ({ value }) => value === 'm' ? 'Masculino' : 'Feminino' },
    { field: 'date_birth', headerName: 'Data de nascimento', type: 'date', minWidth: 70, flex: 2, align: 'left', headerAlign: 'left', valueFormatter: ({ value }) => moment.utc(value).format('DD/MM/YYYY') },
    { field: 'age', headerName: 'Idade', type: 'number', minWidth: 70, flex: 1, align: 'left', headerAlign: 'left' },
    { field: 'hobby', headerName: 'Hobby', minWidth: 70, flex: 3, align: 'left', headerAlign: 'left' },
    ...dataGridActions
  ]

  useEffect(() => {
    getDevelopers()
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
          width: '1200px',
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
            <Typography variant="h5">Listagem de desenvolvedores</Typography>
            <Tooltip title="Adicionar" >
              <IconButton sx={{
                width: '25px',
                fontSize: '15px'
              }}
                onClick={() => {
                  setEditingDeveloper(undefined)
                  handleEditDeveloper()
                }}
              >
                <AddCircleIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <div />
          <DataGrid
            columns={dataGridColumns}
            rows={developers ?? []}
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
      <DeveloperFormModal
        open={isModalOpen}
        onClose={handleModalClose}
        onSave={setDevelopers}
        levels={levels}
        developer={editingDeveloper}
      />
    </ Box>
  )
}
