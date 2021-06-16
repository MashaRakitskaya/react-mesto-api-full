import { useEffect } from 'react';
const escape = 27;

function ImagePopup({card, onClose, isOpen, onOvarlayClose}) {
    useEffect(
        () => {
            if(!isOpen) return;
            const handleEscClose =(event) => {
                if((event.keyCode === escape)) {
                    onClose() 
                }
            }
            document.addEventListener('keyup', handleEscClose);
            return () => {
                document.removeEventListener('keyup', handleEscClose);  
            }
        } 
    )
    return(
        <div className={`popup popup_type_big-photo ${isOpen && 'popup_opened'}`} onClick={onOvarlayClose}>
            <div className="popup__content-photo">
                <button className="popup__close popup__close_type_close-big-foto" type="button" onClick={onClose}></button>
                <img  className="popup__photo" src={card.link} alt={card.name} />
            <h3 className="popup__caption">{card.name}</h3>
            </div>
        </div> 
    );
}
export default ImagePopup;