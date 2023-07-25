import React, { useEffect, useContext, useState } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './Profile.css'
import Header from '../Header/Header';
import useForm from '../hooks/useForm';
import { EMAIL_REGEX, USERNAME_REGEX } from '../../utils/constants';
const Profile = ({ signOut, onUpdateUser, isLoggedIn, isLoading }) =>{
    const currentUser = useContext(CurrentUserContext);

    const { enteredValues, errors, handleChange, isFormValid, resetForm } = useForm();
    const [isLastValues, setIsLastValues] = useState(false);

    useEffect(() => {
        if (currentUser) {
            resetForm(currentUser);
        }
    }, [currentUser, resetForm]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: enteredValues.name,
            email: enteredValues.email,
        });
    }

    useEffect(() => {
        if (currentUser.name === enteredValues.name && currentUser.email === enteredValues.email) {
            setIsLastValues(true);
        } else {
            setIsLastValues(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enteredValues]);
    return(
        <>
            <Header isLoggedIn={isLoggedIn} />
        <section className='profile'>
            <h3 className='profile__title'>Привет, {currentUser.name}!</h3>
            <form className='profile__form' onSubmit={handleSubmit} noValidate>
                <label className='profile__field'>
                    Имя
                    <input
                        name='name'
                        className='profile__input'
                        id='name-input'
                        type='text'
                        minLength='2'
                        maxLength='40'
                        required={true}
                        onChange={handleChange}
                        value={enteredValues.name || ''}
                        pattern={USERNAME_REGEX}
                    />
                </label>
                <span className="profile__input-error">{errors.name}</span>
                <div className='profile__border'></div>
                <label className='profile__field'>
                    E-mail
                    <input name='email'
                           className='profile__input'
                           id='email-input'
                           type='email'
                           required={true}
                           onChange={handleChange}
                           pattern={EMAIL_REGEX}
                           value={enteredValues.email || ''}
                    />
                </label>
                <span className="profile__input-error">{errors.email}</span>
                <button type='submit'
                        disabled={!isFormValid || isLoading || isLastValues}
                        className={!isFormValid || isLoading || isLastValues
                            ?'profile__button-submit profile__button-submit_inactive'
                            :'profile__button-submit' }
                >
                    Редактировать
                </button>
                <button type="button" className='profile__logout' onClick={signOut}>Выйти из аккаунта</button>
            </form>
        </section>
        </>
    )
}

export default Profile

// CHECK CSS