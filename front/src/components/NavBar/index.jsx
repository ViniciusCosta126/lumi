import React from 'react';
import './main.scss'
import { Link } from 'react-router-dom';
const NavBar = () => {
    window.addEventListener('resize', () => {
        const header = document.querySelector('.header');
        if(header){
            if(screen.width > 768 && header.classList.contains('header--active')){
                header.classList.remove('header--active')
            }
        }

    })
    const toggleHeader = (e) => {
        const header = document.querySelector('.header');
        header.classList.toggle('header--active');
        document.body.classList.toggle('lock');
    }


    return (
        <header className="header">
            <div className="container">
                <div className="header__body">
                    <Link to={'/'} className="header__logo">
                        <img src="https://i.postimg.cc/WbdvF6h2/logo2.png" alt="Logo" />
                    </Link>
                    <nav className="header__menu">
                        <ul className="header__list">
                            <li className="header__item">
                                <Link to={'/'} className="header__link">Dash</Link>
                            </li>
                            <li className="header__item">
                               <Link to={'biblioteca'} className='header__link'>Biblioteca</Link>
                            </li>
                        </ul>
                    </nav>

                    <button onClick={(e) => toggleHeader(e)} type="button" aria-label="Menu open/close" className="header__burger-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default NavBar