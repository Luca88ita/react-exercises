import MoviesList from './components/MoviesList';
import './App.css';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import AddMovie from './components/AddMovie';

export interface MovieType {
	id: number;
	title: string;
	releaseDate: string;
	openingText: string;
}

function App() {
	const [movies, setMovies] = useState<MovieType[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isUploading, setIsUploading] = useState<boolean>(false);
	const [loadingError, setLoadingError] = useState<string | null>(null);
	const [uploadingError, setUploadingError] = useState<string | null>(null);

	const fetchMoviesHandler = useCallback(async () => {
		setIsLoading(true);
		setLoadingError(null);
		try {
			const response = await fetch(
				'https://react-exercises-b6291-default-rtdb.europe-west1.firebasedatabase.app/movies.json'
			);

			if (!response.ok) {
				throw new Error('Something went wrong while fetching the movies');
			}

			const data = await response.json();

			const loadedMovies: MovieType[] = [];

			for (const key in data) {
				loadedMovies.push({
					id: data[key].id,
					title: data[key].title,
					openingText: data[key].openingText,
					releaseDate: data[key].releaseDate,
				});
			}

			setMovies(loadedMovies);
		} catch (error: unknown) {
			if (error instanceof Error) {
				setLoadingError(error.message);
			}
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		fetchMoviesHandler();
	}, [fetchMoviesHandler]);

	const addMovieHandler = useCallback(
		async (movie: MovieType) => {
			setIsUploading(true);
			setUploadingError(null);
			try {
				const response = await fetch(
					'https://react-exercises-b6291-default-rtdb.europe-west1.firebasedatabase.app/movies.json',
					{
						method: 'POST',
						body: JSON.stringify(movie),
						headers: { 'Content-Type': 'application/json' },
					}
				);

				if (!response.ok) {
					throw new Error(
						'Something went wrong while uploading the movie info!'
					);
				}

				fetchMoviesHandler();
			} catch (error: unknown) {
				if (error instanceof Error) {
					setUploadingError(error.message);
				}
			}
			setIsUploading(false);
		},
		[fetchMoviesHandler]
	);

	let uploadingContent: ReactElement = <></>;
	if (uploadingError) {
		uploadingContent = <>{uploadingError}</>;
	}
	if (isUploading) {
		uploadingContent = <>Uploading...</>;
	}

	let loadingContent: ReactElement = <p>Found no movies.</p>;
	if (movies.length > 0) {
		loadingContent = <MoviesList movies={movies} />;
	}
	if (loadingError) {
		loadingContent = <p>{loadingError}</p>;
	}
	if (isLoading) {
		loadingContent = <p>Loading...</p>;
	}

	return (
		<>
			<section>
				<AddMovie onAddMovie={addMovieHandler} />
				<p>{uploadingContent}</p>
			</section>
			<section>
				<button onClick={fetchMoviesHandler}>Fetch Movies</button>
			</section>
			<section>{loadingContent}</section>
		</>
	);
}

export default App;
