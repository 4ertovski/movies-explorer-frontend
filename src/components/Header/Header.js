import './Header.css'
import logo from '../../images/logo.svg'
import account from '../../images/profile.svg'
import menu from '../../images/menu.svg'
import React, {Fragment, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import Navigation from "../Navigation/Navigation";

// const isLoggedIn = true;
const Header = ({isLandingPage = false, isLoggedIn}) => {
    const [isMenuClicked, setIsMenuClicked] = useState(false);

    function handleMenuOpen() {
        setIsMenuClicked(true);
    }

    function handleMenuClose(){
        setIsMenuClicked(false);
    }


    return(
        <Fragment>
            {!isLoggedIn ? (
                <header className={`header ${isLandingPage ? 'header__landing' : ''}`}>
                    <Link to={'/'} className='header__logo'>
                        <img src={logo} alt='Логотип проекта'/>
                    </Link>
                    <div className='header__button-container'>
                        <Link to={'/signup'} className={'header__button'}>
                            Регистрация
                        </Link>
                        <Link to={'/signin'} className={'header__button header__button-dark'}> {/* TODO тут другой класс*/}
                            Войти
                        </Link>
                    </div>
                </header>
            ) : (
                <header className={`header ${isLandingPage ? 'header__landing' : ''}`}>
                    <Link to={'/'} className='header__logo'>
                        <img src={logo} alt='Логотип проекта'/>
                    </Link>
                    <div className={'header__button-container header__button-container_films'}>
                        <NavLink to={'/movies'} className='header__button'>
                            Фильмы
                        </NavLink>
                        <NavLink to={'/saved-movies'} className='header__button'>
                            Сохраненные фильмы
                        </NavLink>
                    </div>
                    <div className={'header__button-container'}>
                        <Link to={'/profile'} className='header__account-button'>
                            <img src={account} alt="Аккаунт"/> {/*TODO change alt*/}
                        </Link>
                        <button className={'header__menu-button'} onClick={handleMenuOpen}>
                            <img src={menu} alt='Меню' /> {/* TODO change alt */}
                        </button>
                    </div>
                    {isMenuClicked ? <Navigation handleMenuClose={handleMenuClose}/> : ''}
                </header>
            )


            }

        </Fragment>
    )

}

export default Header