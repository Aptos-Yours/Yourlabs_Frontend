import { useEffect, useRef } from "react";
import './Modal.scss';

type modalProps = {
    closeModal: Function,
    children: JSX.Element
}

function Modal({ closeModal, children } : modalProps) {
    const modalRef = useRef<any>(null);

    const clickModalOutside = (e : any) => {
        if(e.target == modalRef.current) closeModal();
    }

    useEffect(()=>{
        document.addEventListener("click", clickModalOutside);
        document.addEventListener("touchend", clickModalOutside);

        return () => {
            document.removeEventListener("click", clickModalOutside); 
            document.removeEventListener("touchend", clickModalOutside);
        }
    }, [modalRef.current])

    return (
        <div className="modal" ref={modalRef}>
            <div style={{display: "contents"}}>
                { children }
            </div>
        </div>
    )
}
export default Modal;