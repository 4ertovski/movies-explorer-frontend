import {Link} from "react-router-dom";
import './NotFound.css';

const NotFound = () => {

    return(
        <section className='not-found'>
            <h2 className='not-found__title'>404</h2>
            <p className='not-found__text'>Страница не найдена</p>
            <Link to={'/'} className={'not-found__back-button'}>
                Назад
            </Link>
        </section>
    )
}

export default NotFound

// NOTHING CHANGES SINCE LEVEL-2