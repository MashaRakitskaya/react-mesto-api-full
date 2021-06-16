import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm.js";
import React from 'react';
import { CurrentUserContext }  from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onOvarlayClose, onSubmit}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = React.useContext(CurrentUserContext);

    useEffect(() => {
        setName(String(currentUser.name));
        setDescription(String(currentUser.about));
    }, [currentUser]); 

    function handleChangeName(e) {
        setName(e.target.value);
    };
    function handleChangeDescription(e) {
        setDescription(e.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit({
            name: name,
            about: description,
        });
    };

    return(
        <PopupWithForm
            name="edit-profile"
            title="Редактировать профиль"
            isOpen={isOpen}
            onClose={onClose}
            onOvarlayClose={onOvarlayClose}
            onSubmit={handleSubmit}
        >
            <label className="popup__input-label" htmlFor="name-input">
                <input id='name-input' className="popup__input popup__input_type_name" type="text" name="profileName" minLength="2"  maxLength="40" required value={name} onChange={handleChangeName} />
                <span id="name-input-error" className="popup__input-error"></span>
            </label>
            <label className="popup__input-label" htmlFor="occupation-input">
                <input id='occupation-input' className="popup__input popup__input_type_title" type="text" name="occupation" minLength="2"  maxLength="200" required value={description} onChange={handleChangeDescription} />
                <span id="occupation-input-error" className="popup__input-error"></span>
            </label>
            <button type="submit" className="popup__save popup__save_type_edit" value="Сохранить">Сохранить</button>
        </PopupWithForm>
    )

}
export default EditProfilePopup;