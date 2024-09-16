import React, { ReactNode } from "react";

interface ModalType {
    children?: ReactNode,
    isOpen: boolean,
    toggle: () => void
}

const Modal: React.FC<ModalType> = ({ children, isOpen, toggle }) => {
    return (
        <>
            {isOpen &&
                <div className="modal-overlay" onClick={toggle}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <form action="">
                            {children}
                        </form>
                    </div>
                </div>
            }
        </>
    )
}

export default Modal