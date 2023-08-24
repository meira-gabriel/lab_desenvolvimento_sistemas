/* eslint-disable import-helpers/order-imports */
import React from 'react'
import './ModalMessage.css'
/* eslint-disable */
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { IoIosCloseCircle } from 'react-icons/io'
import { BsFillCheckCircleFill } from 'react-icons/bs'
/* eslint-enable */

interface ModalMessageProps {
  readonly title: string
  readonly text?: string
  readonly className?: string
  readonly textbutton: string
  readonly textbutton2?: string
  readonly show: boolean
  readonly onHide: () => void
}

function ModalMessage({ title, text, show, className, textbutton, textbutton2, onHide, ...rest }: ModalMessageProps) {
  return (
    <div className="modal">
      <Modal {...rest} show={show} dialogClassName={className} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Body>
          <div className="modalHeader">
            <BsFillCheckCircleFill size={35} color="#6a9c5e" className="iconSuccess col-1" />
            <h4 className="titleHeader col-11">{title}</h4>
          </div>

          <div className="modalBody">
            <p>{text}</p>
          </div>

          <div className="buttonCloseModal">
            <Button onClick={onHide}>{textbutton}</Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default ModalMessage
