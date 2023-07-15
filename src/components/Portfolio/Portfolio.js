import arrowPic from '../../images/arrow.svg'
import './Portfolio.css'


const Portfolio = () =>{
    return(
        <section className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <div className="portfolio__list">
                <a
                    href="https://github.com/4ertovski/how-to-learn"
                    className="portfolio__link portfolio__link-border-bottom"
                    target="_blank"
                    rel="noreferrer">
                    <p className="portfolio__text">Статичный сайт</p>
                    <img className="portfolio__image" src={arrowPic} alt="Ссылка на проект 'Научиться учиться'" />
                </a>
                <a
                    href="https://github.com/4ertovski/russian-travel"
                    className="portfolio__link portfolio__link-border-bottom"
                    target="_blank"
                    rel="noreferrer">
                    <p className="portfolio__text">Адаптивный сайт</p>
                    <img className="portfolio__image" src={arrowPic} alt="Ссылка на проект 'Путешествия по России'" />
                </a>
                <a
                    href="https://github.com/4ertovski/react-mesto-api-full-gha"
                    className="portfolio__link"
                    target="_blank"
                    rel="noreferrer">
                    <p className="portfolio__text">Одностраничное приложение</p>
                    <img className="portfolio__image" src={arrowPic} alt="Ссылка на проект 'Mesto'" />
                </a>
            </div>
        </section>
    )
}

export default Portfolio