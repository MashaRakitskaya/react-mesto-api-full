import logo from '../images/Vector.svg';
import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

function Header({  userEmail, onSignOut }) {

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип" />
            <Switch>
                <Route path="/main">
                    <div className="header__container-email-exit">
                        <p className="header__email">{userEmail}</p>
                        <Link onClick={onSignOut} to="/signin" className="header__exit">
                            Выйти
                        </Link>
                    </div>
                </Route>
                <Route path="/signup">
                    <Link to="/signin" className="header__registration">
                        Войти
                    </Link>
                </Route>

                <Route path="/signin">
                    <Link to="/signup" className="header__login">
                        Регистрация
                    </Link>
                </Route>

            </Switch>
        </header>
    );
}
export default Header;