/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container } from './styles'
import { BsCheck2Circle } from 'react-icons/bs'
import { AiOutlineWarning } from 'react-icons/ai'

interface LoadingProps {
  loading: boolean
  message: string
  error: boolean
  onClose: any
}

function Loading({ loading, message, error, onClose }: LoadingProps) {
  return (
    <>
      {loading ? (
        <Container>
          <div className='loading'></div>
          <span className='textLoading'>Aguarde...</span>
        </Container>
      ) : (
        <Container>
          {error ? (
            <div className='errorMessage'>
              <AiOutlineWarning />
              <span>{message}</span>
              <button onClick={onClose}>Fechar</button>
            </div>
          ) : (
            <div className='successMessage'>
              <BsCheck2Circle />
              <span>{message}</span>
              <button onClick={onClose}>Fechar</button>
            </div>
          )}
        </Container>
      )}
    </>
  )
}

export default Loading
