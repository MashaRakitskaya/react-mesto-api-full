import { useEffect } from 'react';
const escape = 27;

function PopupWithForm({name, title , isOpen, onClose, onOvarlayClose, onSubmit, children}) {
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

    return (
        <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} onClick={onOvarlayClose}>
                <div className="popup__content">
                    <button className="popup__close" type="button" onClick={onClose}></button>
                    <h3 className="popup__title">{title}</h3>
                    <form className={`popup__form popup__form_type_${name}`} onSubmit={onSubmit} name={name} noValidate>
                        {children}
                    </form>
                </div>
        </div>
    );
}
export default PopupWithForm;