import './Promo.css'
import landing_logo from '../../images/landing-logo.png'

const Promo = () => {
    return(
        <section className='promo'>
            <div className='promo__container'>
                <h1 className='promo__project_title'>Учебный проект студента факультета Веб-разработки.</h1>
                <img className='promo__landing_logo' src={landing_logo} alt="Лого проекта"/>
            </div>
        </section>
    )
}

export default Promo

// NOTHING CHANGES SINCE LEVEL-2