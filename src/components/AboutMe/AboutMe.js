import React from 'react';
import profilePic from '../../images/myphoto.jpg'
import './AboutMe.css'

const AboutMe = () => {
    return(
        <section className="about-me">
            <h2 className="about-me__title">Студент</h2>
            <div className="about-me__container">
                <div className="about-me__content">
                    <h3 className="about-me__main-title">Олеся</h3>
                    <p className="about-me__info">Фронтенд-разработчик, 35 лет</p>
                    <p className="about-me__description">
                        Я не хочу писать ничего о себе, потому что эти блоки, еще со времен дневничков из школы, выглядят нарочито и наивно.
                        И всегда вызывают у меня зубовный скрежет.
                    </p>
                    <a
                        href="https://github.com/4ertovski/"
                        className="about-me__link"
                        target="_blank"
                        rel="noreferrer">
                        Github
                    </a>
                </div>
                <img src={profilePic} alt="Моя фотогафия" className="about-me__photo" />
            </div>
        </section>
    )
}

export default AboutMe;

// NOTHING CHANGES SINCE LEVEL-2