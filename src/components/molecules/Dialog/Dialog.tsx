import Button from '@mui/material/Button'
import { Dialog as DialogMui } from '@mui/material'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import React from 'react'

export interface DialogStateProps {
  id?: number
  open: boolean
  title: string
  message: string
  handleConfirm?: (id?: number) => Promise<void> | void
  handleCancel?: () => Promise<void> | void
}

interface DialogProps {
  dialog: DialogStateProps
  setDialog: React.Dispatch<React.SetStateAction<DialogStateProps>>
}

export const Dialog = ({ dialog, setDialog }: DialogProps): JSX.Element => {
  const dismissDialog = (): void => {
    setDialog({
      ...dialog,
      open: false
    })
  }

  const handleConfirm = async (): Promise<void> => {
    try {
      dismissDialog()
      if (dialog.handleConfirm) await dialog.handleConfirm(dialog.id)
    } catch (err) {
      console.log(err)
    }
  }

  const handleCancel = async (): Promise<void> => {
    dismissDialog()
    if (dialog.handleCancel) await dialog.handleCancel()
  }

  return (
    <DialogMui
      open={dialog.open}
      onClose={() => { handleCancel() }}
    >
      <DialogTitle>
        {dialog.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {dialog.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={() => { handleCancel() }}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={() => { handleConfirm() }}>
          Confirmar
        </Button>
      </DialogActions>
    </DialogMui>
  )
}
