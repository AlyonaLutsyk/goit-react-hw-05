import Navigation from '../Navigation/Navigation'
import css from './App.module.css'
import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react';



const MovieCast = lazy(() => import('../../components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../../components/MovieReviews/MovieReviews'));
const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('../../pages/MovieDetailsPage/MovieDetailsPage'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage'));


export default function App() {
    return (
        <div className={css.container}>
            <Navigation />
            
            <Suspense fallback={<div>LOADING PAGE...</div>}>
            <Routes>
                <Route path='/' element={<HomePage/>} />
                <Route path='/movies' element={<MoviesPage />} />
                <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
                    <Route path="cast" element={<MovieCast />} />
                    <Route path="reviews" element={<MovieReviews />} />
                </Route>
                <Route path='*' element={ <NotFoundPage/>} />
            </Routes>
            </Suspense>
        </div>
    )
}