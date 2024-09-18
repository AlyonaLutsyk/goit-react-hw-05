import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../movie-api";
import MovieList from "../../components/MovieList/MovieList";



export default function HomePage() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchTrendingMovie = async () => {
            try {
                const trendingMovies = await getTrendingMovies();
                setMovies(trendingMovies);
            } catch (error) {
                console.error('Error fetching trending movies:', error);
            }
        }

        fetchTrendingMovie();
    }, [ ]);

    return (
        <div>
            <h1>Trending Movies</h1>
            <MovieList movies={movies}/>
        </div>
    )
}