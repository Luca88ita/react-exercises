import Movie from './Movie';
import classes from './MoviesList.module.css';

interface MovieType {
	id: number;
	title: string;
	releaseDate: string;
	openingText: string;
}

interface Props {
	movies: MovieType[];
}

const MovieList = (props: Props) => {
	return (
		<ul className={classes['movies-list']}>
			{props.movies.map((movie) => (
				<Movie
					key={movie.id}
					title={movie.title}
					releaseDate={movie.releaseDate}
					openingText={movie.openingText}
				/>
			))}
		</ul>
	);
};

export default MovieList;
