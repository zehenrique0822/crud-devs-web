import React, { type Dispatch, type SetStateAction } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Button, Dialog, DialogTitle, DialogContent } from '@mui/material'
import { Box, TextField, Toast } from '@/components'
import { type ILevels } from '@/pages'
import { http } from '@/services'

interface LevelFormModalProps {
  open: boolean
  onClose: () => void
  onSave: Dispatch<SetStateAction<ILevels[]>>
  levelId?: number
  levelName?: string
}

export const LevelFormModal = ({
  open,
  onClose,
  onSave,
  levelId,
  levelName = ''
}: LevelFormModalProps): JSX.Element => {
  const isUpdate = !!(levelId)
  const initialValues = {
    id: levelId ?? '',
    level: levelName ?? ''
  }

  const handleCreateLevel = async (values: typeof initialValues): Promise<void> => {
    try {
      const response = await http.post('/levels', {
        level: values.level
      })
      const updatedLevel: ILevels = response.data
      onSave(prevLevels => [...prevLevels, { ...updatedLevel, developers: 0 }])
      Toast({ message: 'Nível criado!', type: 'success' })
      onClose()
    } catch (error: any) {
      const message = error?.response?.data.error ?? 'Erro, tente novamante!'
      Toast({ message, type: 'error' })
    }
  }

  const handleUpdateLevel = async (values: typeof initialValues): Promise<void> => {
    try {
      const response = await http.put(`/levels/${values.id}`, {
        level: values.level
      })
      const updatedLevel: ILevels = response.data
      const updateLevel = (prevLevels: ILevels[], updatedLevel: ILevels): ILevels[] => {
        return prevLevels.map((level) =>
          level.id === updatedLevel.id ? { ...level, level: updatedLevel.level } : level
        )
      }
      onSave(prevLevels => updateLevel(prevLevels, updatedLevel))
      Toast({ message: 'Nível atualizado!', type: 'success' })
      onClose()
    } catch (error: any) {
      const message = error?.response?.data.error ?? 'Erro, tente novamante!'
      Toast({ message, type: 'error' })
    }
  }

  const handleSubmit = (values: typeof initialValues): void => {
    if (isUpdate) {
      handleUpdateLevel(values)
    } else {
      handleCreateLevel(values)
    }
  }

  const validationSchema = Yup.object({
    level: Yup.string().required('O nome do nível é obrigatório')
      .min(3, 'O nível precisa ter no mínimo 3 caracteres.')
      .max(255, 'O nível precisa ter no máximo 255 caracteres.')
  })

  return (
    <Dialog open={open} onClose={onClose}>
      <Box
        sx={{
          maxWidth: '450px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%'
        }}
      >
        <DialogTitle>{levelName ? 'Editar nível' : 'Criar novo nível'}</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  margin="dense"
                  label="Nome"
                  type="text"
                  fullWidth
                  name="level"
                  as={TextField}
                  error={touched.level && Boolean(errors.level)}
                  helperText={touched.level && errors.level}
                  sx={{
                    width: '400px',
                    '@media (max-width: 768px)': {
                      width: '300px'
                    }
                  }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    marginTop: '20px',
                    width: '100%'
                  }}
                >
                <Button
                  sx={{
                    width: '120px'
                  }}
                  onClick={() => { onClose() }}
                  type="button"
                  color="error"
                  variant="contained"
                >
                  Cancelar
                </Button>
                <Button
                  sx={{
                    width: '120px'
                  }}
                  size="medium"
                  variant="contained"
                  type="submit"
                >
                  Salvar
                </Button>
              </Box>
              </Form>
            )}
        </Formik>
      </DialogContent>
    </Box>
    </Dialog >
  )
}
