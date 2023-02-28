import React, { type Dispatch, type SetStateAction } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Button, Dialog, DialogTitle, DialogContent, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { Box, TextField, Toast } from '@/components'
import { type ILevelsData, type IDeveloper } from '@/pages'
import { http } from '@/services'
import moment from 'moment'

interface DeveloperFormModalProps {
  open: boolean
  onClose: () => void
  onSave: Dispatch<SetStateAction<IDeveloper[]>>
  levels: ILevelsData[]
  developer?: IDeveloper
}

export const DeveloperFormModal = ({
  open,
  onClose,
  onSave,
  levels,
  developer
}: DeveloperFormModalProps): JSX.Element => {
  const isUpdate = !!(developer?.id)

  const levelsOptions = levels?.map((level: ILevelsData) => {
    return {
      value: level.id,
      label: level.level
    }
  })

  const genderOptions = [
    { value: 'm', label: 'Masculino' },
    { value: 'f', label: 'Feminino' }
  ]

  const initialValues = {
    id: developer?.id ?? '',
    id_level: developer?.id_level ?? '',
    name: developer?.name ?? '',
    gender: developer?.gender ?? '',
    date_birth: developer?.date_birth ?? '',
    age: developer?.age ?? '',
    hobby: developer?.hobby ?? ''
  }

  const handleCreateDeveloper = async (values: typeof initialValues): Promise<void> => {
    try {
      const response = await http.post('/developers', {
        id_level: values.id_level,
        name: values.name,
        gender: values.gender,
        date_birth: values.date_birth,
        age: values.age,
        hobby: values.hobby
      })
      const updatedDeveloper: IDeveloper = response.data
      onSave(prevDevelopers => [...prevDevelopers, updatedDeveloper])
      Toast({ message: 'Desenvolvedor criado!', type: 'success' })
      onClose()
    } catch (error: any) {
      const message = error?.response?.data.error ?? 'Erro, tente novamante!'
      Toast({ message, type: 'error' })
    }
  }

  const handleUpdateDeveloper = async (values: typeof initialValues): Promise<void> => {
    try {
      const response = await http.put(`/developers/${values.id}`, {
        id_level: values.id_level,
        name: values.name,
        gender: values.gender,
        date_birth: values.date_birth,
        age: values.age,
        hobby: values.hobby
      })
      const updatedDeveloper: IDeveloper = response.data
      const updateDeveloper = (prevDevelopers: IDeveloper[], updatedDeveloper: IDeveloper): IDeveloper[] => {
        return prevDevelopers.map((developer) =>
          developer.id === updatedDeveloper.id ? { ...updatedDeveloper } : developer
        )
      }
      onSave(prevDevelopers => updateDeveloper(prevDevelopers, updatedDeveloper))
      Toast({ message: 'Desenvolvedor atualizado!', type: 'success' })
      onClose()
    } catch (error: any) {
      const message = error?.response?.data.error ?? 'Erro, tente novamante!'
      Toast({ message, type: 'error' })
    }
  }

  const handleSubmit = (values: typeof initialValues): void => {
    if (isUpdate) {
      handleUpdateDeveloper(values)
    } else {
      handleCreateDeveloper(values)
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('O nome é obrigatório')
      .min(3, 'O nome deve ter pelo menos 3 caracteres')
      .max(255, 'O nome deve ter no máximo 255 caracteres'),
    gender: Yup.string().required('O sexo é obrigatório'),
    date_birth: Yup.date().required('A data de nascimento é obrigatória'),
    age: Yup.number().positive('A idade deve ser um número positivo')
      .integer('A idade deve ser um número inteiro')
      .required('A idade é obrigatória'),
    hobby: Yup.string().max(255, 'O hobby deve ter no máximo 255 caracteres')
      .required('O hobby é obrigatório')
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
        <DialogTitle>{isUpdate ? 'Editar Desenvolvedor' : 'Adicionar Desenvolvedor'}</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ errors, touched, values, setFieldValue }) => (
              <Form>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <Field
                    margin="dense"
                    label="Nome"
                    type="text"
                    fullWidth
                    name="name"
                    as={TextField}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    sx={{
                      width: '400px',
                      '@media (max-width: 768px)': {
                        width: '300px'
                      }
                    }}
                  />
                  <FormControl
                    sx={{ marginTop: '5px' }}>
                    <InputLabel id="level-label">Níveis</InputLabel>
                    <Select
                      labelId="level-label"
                      id="level-select"
                      label="Níveis"
                      name="level"
                      value={values.id_level}
                      onChange={(e) => { setFieldValue('id_level', e.target.value) }}
                      error={touched.gender && Boolean(errors.gender)}
                      sx={{
                        width: '400px',
                        color: '#000000',
                        '@media (max-width: 768px)': {
                          width: '300px'
                        }
                      }}
                    >
                      {levelsOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>))}
                    </Select>
                  </FormControl>
                  <FormControl
                    sx={{ marginTop: '5px' }}>
                    <InputLabel id="gender-label">Sexo</InputLabel>
                    <Select
                      labelId="gender-label"
                      id="gender-select"
                      label="Sexo"
                      name="gender"
                      value={values.gender}
                      onChange={(e) => { setFieldValue('gender', e.target.value) }}
                      error={touched.gender && Boolean(errors.gender)}
                      sx={{
                        width: '400px',
                        color: '#000000',
                        '@media (max-width: 768px)': {
                          width: '300px'
                        }
                      }}
                    >
                      {genderOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>))}
                    </Select>
                  </FormControl>
                  <Field
                    margin="dense"
                    label="Data de Nascimento"
                    type="date"
                    fullWidth
                    name="date_birth"
                    as={TextField}
                    value={moment.utc(values.date_birth).format('YYYY-MM-DD')}
                    InputLabelProps={{ shrink: true }}
                    error={touched.date_birth && Boolean(errors.date_birth)}
                    helperText={touched.date_birth && errors.date_birth}
                    sx={{
                      width: '400px',
                      '@media (max-width: 768px)': {
                        width: '300px'
                      }
                    }}
                  />
                  <Field
                    margin="dense"
                    label="Idade"
                    type="number"
                    fullWidth
                    name="age"
                    as={TextField}
                    error={touched.age && Boolean(errors.age)}
                    helperText={touched.age && errors.age}
                    sx={{
                      width: '400px',
                      '@media (max-width: 768px)': {
                        width: '300px'
                      }
                    }}
                  />
                  <Field
                    margin="dense"
                    label="Hobby"
                    type="text"
                    fullWidth
                    name="hobby"
                    as={TextField}
                    error={touched.hobby && Boolean(errors.hobby)}
                    helperText={touched.hobby && errors.hobby}
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
                      onClick={onClose}
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
                </Box>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Box>
    </Dialog>
  )
}
