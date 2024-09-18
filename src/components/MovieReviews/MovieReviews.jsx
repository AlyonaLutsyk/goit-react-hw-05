import { useEffect, useState } from 'react';
import { getMovieReviews } from '../../movie-api';
import { useParams } from 'react-router-dom';
import css from './MovieReviews.module.css';

export default function MovieReviews() {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        async function fetchReviews() {
            const data = await getMovieReviews(movieId);
            setReviews(data);
        }

        fetchReviews();
    }, [movieId]);

    return (
        <div className={css.reviewsContainer}>
            <h3>Reviews</h3>
            {reviews.length > 0 ? (
                <ul className={css.reviewsList}>
                    {reviews.map(({ id, author, content }) => (
                        <li key={id}>
                            <h4>By: {author}</h4>
                            <p>{content}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>We don`t have any reviews for this movie</p>
            )}
        </div>
    );
}