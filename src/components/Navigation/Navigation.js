import React from 'react';
import './Navigation.css'
import {Link, NavLink} from "react-router-dom";
import account from '../../images/profile.svg'

const Navigation = ({ handleMenuClose }) => {
    return(
        <div className='navigation'>
            <div className='navigation__container-empty' onClick={handleMenuClose}></div>
            <div className='navigation__container'>
                <button className='navigation__close-button' onClick={handleMenuClose}></button>
            <nav className='navigation__navbar'>
                <NavLink
                    exact to={'/'}
                    onClick={handleMenuClose}
                    className='navigation__link'
                    activeClassName='navigation__link_active'>
                    Главная
                </NavLink>
                <NavLink
                    to={'/movies'}
                    onClick={handleMenuClose}
                    className='navigation__link'
                    activeClassName='navigation__link_active'>
                    Фильмы
                </NavLink>
                <NavLink
                    to={'/saved-movies'}
                    onClick={handleMenuClose}
                    className='navigation__link'
                    activeClassName='navigation__link_active'>
                    Сохраненные фильмы
                </NavLink>
            </nav>
            <Link to={'/profile'} onClick={handleMenuClose} className='navigation__account-button'>
                <img src={account} alt='Аккаунт'/> {/* TODO change alt */}
            </Link>
            </div>
        </div>
    )
}

export default Navigation