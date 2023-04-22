import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';

function App() {
	return (
		<>
			<Header temp='temp' />
			<main>
				<Meals />
			</main>
		</>
	);
}

export default App;
