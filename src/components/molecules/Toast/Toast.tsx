import toast from 'react-hot-toast'

type ToastType = 'success' | 'error' | 'loading'

interface Props {
  message: string
  type: ToastType
}

export const Toast = ({ message, type }: Props): any => {
  return (
    toast[type](message)
  )
}
