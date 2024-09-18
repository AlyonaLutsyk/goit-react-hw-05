import { Suspense, useEffect, useRef, useState } from "react";
import { NavLink, useParams, Outlet, Link, useLocation } from "react-router-dom";
import { getMovieDetails } from "../../movie-api";
import css from './MovieDetailsPage.module.css';
import clsx from "clsx";


const getNavLink = (props) => {
  return clsx(css.link, props.isActive && css.active);
}; 
export default function MovieDetailsPage() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const location = useLocation();
    
    const backLinkRef = useRef(location.state?.from || "/");

   useEffect(() => {
        async function fetchMovieDetails() {
            try {
                const movieData = await getMovieDetails(movieId);
                setMovie(movieData);
            } catch {
                setError('Failed to fetch movie details.');
            }
        }

        fetchMovieDetails();
    }, [movieId]);

    if (error) {
        return <p className={css.error}>{error}</p>;
    }

    if (!movie) {
        return <p>Loading...</p>;
    }

    const { title, poster_path, overview, vote_average, release_date, genres } = movie;
    const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

    return (
        <div className={css.container}>
            <Link to={backLinkRef.current} className={css.goBack}>
                Go back
            </Link>
            <div className={css.movieDetails}>
                {poster_path && (
                    <img className={css.poster} src={imageUrl} alt={title} />
                )}
                <div className={css.details}>
                    <h2>{title} ({release_date?.slice(0, 4)})</h2>
                    <p>User Score: {Math.round(vote_average * 10)}%</p>
                    <h3>Overview</h3>
                    <p>{overview}</p>
                    <h3>Genres</h3>
                    <p>{genres.map(genre => genre.name).join(', ')}</p>
                </div>
            </div>
            <div className={css.additionalInfo}>
                <h2>Additional Information</h2>
                <ul className={css.list}>
                    <li>
                        <NavLink to="cast" className={getNavLink}>Cast</NavLink>
                    </li>
                    <li>
                        <NavLink to="reviews" className={getNavLink}>Reviews</NavLink>
                    </li>
                </ul>
            </div>
            <Suspense fallback={<div>LOADING SUBPAGE!!!</div>}>
                <Outlet />
            </Suspense>
        </div>
    );
}
