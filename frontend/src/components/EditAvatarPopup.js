import React from 'react';
import { useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({isOpen, onClose, onOvarlayClose, onSubmit}) {
    const avatarRef = useRef(null);
 
    function handleSubmit(e) {
        e.preventDefault();
        onSubmit({
            avatar: avatarRef.current.value
        });
        avatarRef.current.value = '';
    };

    return(
        <PopupWithForm
            name="update-avatar"
            title="Обновить аватар"
            isOpen={isOpen}
            onClose={onClose}
            onOvarlayClose={onOvarlayClose}
            onSubmit={handleSubmit}
        >
            <label className="popup__input-label" htmlFor="avatar-input">
                <input ref={avatarRef} id='avatar-input' className="popup__input popup__input_type_avatar-photo" type="url" name="avatar" placeholder="Ссылка на аватарку" required  />
                <span id="avatar-input-error" className="popup__input-error"></span>
            </label>
            <button type="submit" className="popup__save popup__save_type_avatar" value="Сохранить">Сохранить</button>
        </PopupWithForm>
    )
}
export default EditAvatarPopup;