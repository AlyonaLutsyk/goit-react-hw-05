import { useEffect, useState } from "react";
import { searchMovies } from "../../movie-api";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";
import css from "./MoviesPage.module.css"

export default function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("");
    const [params, setParams] = useSearchParams();

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const searchQuery = event.target.elements.query.value;

        params.set("query", searchQuery);
        setParams(params);

        setQuery("");
    };

    useEffect(() => {
        async function fetchData() {
            const searchQuery = params.get("query");

            if (searchQuery) {
                const data = await searchMovies(searchQuery);
                setMovies(data);
            }
        }

        fetchData();
    }, [params]);

    return (
        <div>
            <form onSubmit={handleSubmit} className={css.form}>
                <input
                    type="text"
                    name="query"
                    value={query}
                    onChange={handleInputChange}
                    className={css.input}
                />
                <button type="submit" className={css.button}>Search</button>
            </form>

            {movies.length > 0 && <MovieList movies={movies} />}
        </div>
    );
}
