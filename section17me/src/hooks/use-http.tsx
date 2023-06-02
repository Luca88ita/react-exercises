import { useCallback, useState } from 'react';
import { Item } from '../components/Meals/MealItem/MealItem';

export interface RequestConfig {
	url: string;
	other?: {
		method: 'POST' | 'GET';
		body: object | { order: string };
		headers: {
			'Content-Type': 'application/json';
		};
	};
}

const useHttp = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const sendRequest = useCallback(
		async (requestConfig: RequestConfig, applyData: (data: Item[]) => void) => {
			setIsLoading(true);
			setError(null);
			try {
				const response = await fetch(requestConfig.url, {
					method: requestConfig.other?.method
						? requestConfig.other.method
						: 'GET',
					headers: requestConfig.other?.headers
						? requestConfig.other.headers
						: {},
					body: requestConfig.other?.body
						? JSON.stringify(requestConfig.other.body)
						: null,
				});

				if (!response.ok) {
					throw new Error('Request failed!');
				}

				const data = await response.json();
				//console.log(data);

				applyData(data);
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err.message || 'Something went wrong!');
				}
			}
			setIsLoading(false);
		},
		[]
	);

	return {
		isLoading,
		error,
		sendRequest,
	};
};

export default useHttp;
