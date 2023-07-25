import "./Form.css"
import {Link} from "react-router-dom";
import logo from '../../images/logo.svg'

const Form = ({
                  children,
                  title,
                  buttonText,
                  question,
                  linkText,
                  link,
                  onSubmit,
                  isDisabled,
                  isLoading}) => {
    return(
        <div className={'form__container'}>
            <Link to={'/'} className='form__logo'>
                <img src={logo} alt={'Логотип проекта'}/>
            </Link>
            <h3 className='form__title'>{title}</h3>
            <form className='form'  onSubmit={onSubmit} noValidate>
                {children}
                <button type='submit'
                        disabled={!!isDisabled}
                        className={
                    isDisabled || isLoading
                    ? 'form__button-submit form__button-submit_disable'
                    : 'form__button-submit'}>
                    {buttonText}
                </button>
            </form>
            <p className="form__text">
                {question}
                <Link to={link} className='form__link'>
                    {linkText}
                </Link>
            </p>
        </div>
    )
}

export default Form

// DONE