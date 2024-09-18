import { useEffect, useState } from 'react';
import { getMovieCast } from '../../movie-api';
import { useParams } from 'react-router-dom';
import css from './MovieCast.module.css';

export default function MovieCast() {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);

    useEffect(() => {
        async function fetchCast() {
            const data = await getMovieCast(movieId);
            setCast(data);
        }

        fetchCast();
    }, [movieId]);

    return (
        <div className={css.castContainer}>
            <h3>Cast</h3>
            <ul className={css.listCast}>
                {cast.map(({ id, name, character, profile_path }) => (
                    <li className={css.cast } key={id}>
                        <img className={css.imgCast}
                            src={profile_path ? `https://image.tmdb.org/t/p/w200/${profile_path}` : ''}
                            alt={name}
                        />
                        <p>{name} as {character}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}