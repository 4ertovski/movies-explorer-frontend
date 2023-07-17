import React, { useEffect } from 'react';
import Form from "../Form/Form";
import '../Form/Form.css';
import useForm from '../hooks/useForm';
import { EMAIL_REGEX } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
const Login =  ({ onAuthorize, isLoading, isLoggedIn }) => {
    const { enteredValues, errors, handleChange, isFormValid } = useForm();
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        onAuthorize({
            email: enteredValues.email,
            password: enteredValues.password,
        });
    }

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/movies');
        }
    }, [isLoggedIn]);

    return(
        <Form
            title={"Рады видеть!"}
            buttonText={"Войти"}
            question={"Еще не зарегестрированы?"}
            linkText={" Регистрация"}
            link={"/signup"}
            onSubmit={handleSubmit}
            isDisabled={!isFormValid}
            isLoading={isLoading}
        >
        <label className='form__field'>
            E-mail
            <input
                name='email'
                className='form__input'
                id='email-input'
                type='email'
                placeholder="Введите почту"
                minLength="2"
                maxLength="40"
                required={true}
                onChange={handleChange}
                pattern={EMAIL_REGEX}
                value={enteredValues.email || ''}
            />
            <span className='form__input-error'>{errors.email}</span>
        </label>
        <label className='form__field'>
            Пароль
            <input
                name='password'
                className='form__input'
                id='password-input'
                type='password'
                placeholder="Введите пароль"
                minLength="1"
                required
                onChange={handleChange}
                value={enteredValues.password || ''}
            />
            <span className='form__input-error'>{errors.password}</span>
        </label>
        </Form>
    )
}

export default Login

// DONE