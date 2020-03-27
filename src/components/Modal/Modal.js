// import React from "react"
// import ReactDOM from "react-dom"
// import { usePortal } from "../../helpers/usePortal"
// import cx from 'classnames'

// const Modal = ({ children, isActive }) => {
//   const modalPortal = usePortal("modals")
//   return ReactDOM.createPortal(
//     <div className={cx('modal', {'is-active': isActive})}>
//       <div className="modal-background"></div>
//       <div className="modal-card">{children}</div>
//     </div>,
//     modalPortal
//   )
// }

// export const ModalConfirm = ({
//   title,
//   text,
//   confirmHandler,
//   cancelHandler,
//   isActive
// }) => (
//   <Modal isActive={isActive}>
//     <header className="modal-card-head">
//       <p className="modal-card-title">{title}</p>
//       <button className="delete" aria-label="close"></button>
//     </header>
//     <section className="modal-card-body">{text}</section>
//     <footer className="modal-card-foot">
//       <button className="button is-success" onClick={confirmHandler}>
//         Potwierdź
//       </button>
//       <button className="button" onClick={cancelHandler}>
//         Anuluj
//       </button>
//     </footer>
//   </Modal>
// )
