import allowUnion from "../images/allowUnion.svg";
import denyUnion from "../images/denyUnion.svg";
import { useEffect } from 'react';
const escape = 27;

function InfoTooltip({ title , icon,  isOpen, onClose, onOvarlayClose }) {

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
        <div className={`popup popup_type_info-tool-tip ${isOpen && 'popup_opened'}`} onClick={onOvarlayClose}>
                <div className="popup__content popup__content_type_info-tool-tip">
                    <button className="popup__close popup__close_type_info-tool-tip" type="button" onClick={onClose}></button>
                    {icon ? (
                        <img  className="popup__union" src={allowUnion} alt="ок" />
                    ) : (
                        <img  className="popup__union" src={denyUnion} alt="ошибка" />  
                    )
                    }
                    <h3 className="popup__title popup__title_type_info-tool-tip">{title}</h3>
                </div>
        </div>
    );
}
export default InfoTooltip;