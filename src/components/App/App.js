import './App.css';
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import {Route, Routes, useNavigate, useLocation, Navigate} from "react-router-dom";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import React, {useEffect, useState} from "react";
import CurrentUserContext from '../../contexts/CurrentUserContext';
import * as api from '../../utils/MainApi'
import InfoTooltip from "../InfoTooltip/InfoTooltip";

function App() {
    const navigation = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [savedMovies, setSavedMovies] = useState([]);
    const [isSuccess, setIsSuccess] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [cards, setCards] = useState([]); //TODO setCards
    const path = location.pathname;

    //AUTHORIZE IF TOKEN PRESENT

    useEffect(()=>{
        const jwt = localStorage.getItem('jwt');

        if(jwt){
            api
                .getContent(jwt)
                .then((res) => {
                    if(res){
                        localStorage.removeItem('allMovies'); //TODO del?
                        setIsLoggedIn(true);
                    }
                    navigation(path);
                })
                .catch((err)=>{
                    console.log(err);
                });
        }
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(()=>{
        if(isLoggedIn){
            api.getUserInfo()
                .then((profileInfo) => {
                    setCurrentUser(profileInfo);
                })
                .catch((err)=>{
                    console.log(err);
                });

            api.getCards()
                .then((cardsData)=>{
                    setSavedMovies(cardsData.reverse());
                })
                .catch((err)=>{
                    console.log(err);
                });
        }
    }, [isLoggedIn])

    //AUTHORIZE
    function handleAuthorize({email, password}){
        setIsLoading(true)
        api
            .authorize(email,password)
            .then((res) => {
                if (res){
                    setIsLoggedIn(true);
                    localStorage.setItem('jwt', res.token);
                    navigation('/movies');
                }
            })
            .catch((err) => {
                setIsSuccess(false);
                console.log(err)
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    //REGISTER
    function handleRegister({name,email, password}){
        api
            .register(name,email, password)
            .then(() => {
                handleAuthorize({email, password});
            })
            .catch((err) =>{
                setIsSuccess(false);
                console.log(err);
            })
    }

    function handleUpdateUser(newUserInfo) { //TODO handleUpdateUser
        setIsLoading(true);
        api
            .setUserInfo(newUserInfo)
            .then((data) => {
                setIsUpdate(true);
                setCurrentUser(data);
            })
            .catch((err) => {
                setIsSuccess(false);
                console.log(err);
                handleUnauthorized(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleCardLike(card) {
        api
            .postCard(card)
            .then((newMovie) => {
                setSavedMovies([newMovie, ...savedMovies]);
            })
            .catch((err) => {
                setIsSuccess(false);
                console.log(err);
                handleUnauthorized(err);
            });
    }

    function handleCardDelete(card) {
        api
            .deleteCard(card._id)
            .then(() => {
                setSavedMovies((state) => state.filter((item) => item._id !== card._id));
            })
            .catch((err) => {
                setIsSuccess(false);
                console.log(err);
                handleUnauthorized(err);
            });
    }

    function handleUnauthorized(err) {
        if (err === 'Error: 401') {
            handleSignOut();
        }
    }

    // Выход
    const handleSignOut = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('jwt');
        localStorage.removeItem('movies');
        localStorage.removeItem('movieSearch');
        localStorage.removeItem('shortMovies');
        localStorage.removeItem('allMovies');
        navigation('/');
    };

    function closeUnsuccessPopup() {
        setIsSuccess(true);
        setIsUpdate(false);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className='main-app'>
                <div className='main-app__content'>
                    <Routes>
                        <Route exact path='/' element={(
                            <>
                                <Header isLandingPage={true} isLoggedIn={isLoggedIn}/>
                                <Main/>
                                <Footer/>
                            </>
                        )}/>
                        {!isLoggedIn ? (
                            <Route path='/signin' element={<Login onAuthorize={handleAuthorize} isLoading={isLoading}/>}/>
                        ) : (
                            <Route path='/' element={<Navigate to="/"/>}/>
                        )}
                        {!isLoggedIn ? (
                            <Route path='/signup' element={<Register onRegister={handleRegister} isLoading={isLoading}/>}/>
                        ) : (
                            <Route path='/' element={<Navigate to="/"/>}/>
                        )}
                        <Route path='/profile' element={(
                            <ProtectedRoute
                            element={Profile}
                            signOut={handleSignOut}
                            onUpdateUser={handleUpdateUser}
                            isLoggedIn={isLoggedIn}
                            isLoading={isLoading}
                            >
                               {/* <Header/>*/}
                                <Profile/>
                            </ProtectedRoute>
                        )}/>
                        <Route path='/movies' element={
                            <ProtectedRoute
                                element={Movies}
                                isLoggedIn={isLoggedIn}
                                onCardDelete={handleCardDelete}
                                handleLikeClick={handleCardLike}
                                savedMovies={savedMovies}
                                movies={cards}/>
                        }/>
                        <Route path='/saved-movies' element={
                            <ProtectedRoute
                                savedMovies={savedMovies}
                                isLoggedIn={isLoggedIn}
                                onCardDelete={handleCardDelete}
                                element={SavedMovies}
                            />
                            }/>
                       {/* TODO ProtectedRoutes*/}
                       {/*
                        <ProtectedRoute
                            path="/profile"
                            signOut={handleSignOut}
                            onUpdateUser={handleUpdateUser}
                            isLoggedIn={isLoggedIn}
                            element={Profile}
                            isLoading={isLoading}/>*/}
                        <Route path='/*' element={<NotFound isLoggedIn={isLoggedIn}/>}/>
                    </Routes>
                    <InfoTooltip isSuccess={isSuccess} onClose={closeUnsuccessPopup} />
                    <InfoTooltip isSuccess={!isUpdate} isUpdate={isUpdate} onClose={closeUnsuccessPopup} />
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;

// TODO ProtectedRoute Profile
