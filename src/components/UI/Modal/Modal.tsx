import { useEffect, useRef } from "react";
import './ModalStyle.css';
import { createPortal } from "react-dom";

interface ModalProps {
    open: boolean;
    children: React.ReactNode;
  }

  const Modal: React.FC<ModalProps> = ({ open, children }) => {
    const dialog = useRef<HTMLDialogElement>(null);

    useEffect(()=> {
        const modal = dialog.current;
        if(modal) {
            if(open)
                modal.showModal();
            else
                modal.close();
        }

        return () => {
            if (modal && modal.open) {
              modal.close();
            }
          };
        }, [open]);


    return createPortal(
        <dialog ref={dialog} className="modal">{children}</dialog>
    , document.getElementById("modal") as HTMLElement);
}

export default Modal;