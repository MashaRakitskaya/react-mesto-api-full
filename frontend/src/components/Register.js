import { Link } from 'react-router-dom';
import { useState } from 'react';

function Register({onRegister}) {
    const initialData = {
        email: '',
        password: '',
    };
    const [data, setData] = useState(initialData);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(data => ({
          ...data,
          [name]: value,
        }));
    };

    const handleSubmit =  (event) => {
        event.preventDefault();
        onRegister(data.email, data.password);
    };

    return(
        <>
        <section className="sign-up">
            <div className="sign-up__content">
            <h3 className="sign-up__title">Регистрация</h3>
            <form onSubmit={handleSubmit} className="sign-up__form" noValidate>
                <label className="sign-up__input-label" htmlFor="sign-up-email-input">
                    <input
                        value={data.email}
                        id='sign-up-email-input'
                        className="sign-up__input sign-up__input_type_email"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        placeholder="Email"
                    />
                    <span id="sign-up-email-input-error" className="sign-up__input-error"></span>
                </label>
                <label className="sign-up__input-label" htmlFor="sign-up-password-input">
                    <input
                        value={data.password}
                        id='sign-up-password-input'
                        className="sign-up__input sign-up__input_type_password"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        placeholder="Пароль"
                    />
                    <span id="sign-up-password-input-error" className="sign-up__input-error"></span>
                </label>
                <button type="submit" className="sign-up__save" value="Зарегистрироваться">Зарегистрироваться</button>
            </form>
            <p className="sign-up__already-registered">Уже зарегистрированы?<Link className="sign-up__login" to="/signin"> Войти</Link></p>
            </div>
        </section>
        </>
    )
}
export default Register;